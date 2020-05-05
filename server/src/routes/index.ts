import { Request, Response, NextFunction } from "express";
import * as cors from "cors";
import * as path from "path";
import { UserRoutes } from "./user.route";
export class Routes {
  public static routes(app): void {
    app.use(cors()); // allow request from all origions
    app.route("/").get((req: Request, res: Response, next: NextFunction) => {
      res.sendFile(path.join(__dirname, "../../", "client", "index.html"));
    });
    app.route("/user", UserRoutes.routes(app));
  }
}
