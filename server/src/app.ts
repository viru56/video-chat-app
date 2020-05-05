import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { createServer, Server } from "http";
import * as socketIo from "socket.io";
import * as path from "path";
import { config } from "./config";
import { logger } from "./services";

class App {
  public app: express.Application;
  public mongoUrl: string = config.mongoUrl;
  private port: string | number;
  private server: Server;
  private io: SocketIO.Server;
  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
    this.createServer();
    this.sockets();
    this.listen();
  }
  private config(): void {
    this.port = process.env.port || config.httpPort;
    //support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false, limit: "50gb" }));

    // support for html
    const options = {
      dotfiles: "ignore",
      etag: false,
      extensions: ["htm", "html", "css", "png", "jpg"],
      index: false,
      maxAge: "1d",
      redirect: false,
      setHeaders: function(res) {
        res.set("x-timestamp", Date.now());
      }
    };
    // for css files
    this.app.use(express.static(path.join(__dirname, "../client"), options));
    // for images
    this.app.use(
      "/uploads",
      express.static(path.join(__dirname, "../uploads"))
    );
  }
  private async mongoSetup(): Promise<void> {
    try {
      // mongoose.Promise = global.Promise;
      await mongoose.connect(this.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      logger.log("connected to mongodb...:)");
    } catch (error) {
      logger.error("mongo connection error, reason:- ", error.toString());
    }
  }
  private createServer(): void {
    this.server = createServer(this.app);
  }
  private listen(): void {
    this.server.listen(this.port, () => {
      logger.log(
        "The HTTP server is running on port " +
          this.port +
          " - " +
          config.envName
      );
    });
  }
  private sockets(): void {
    require("./services/socket.service")(this.server);
  }
  public getApp(): express.Application {
    return this.app;
  }
}

export default App;
