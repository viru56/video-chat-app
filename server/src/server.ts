// import app from "./app";
// import * as http from "http";
// import * as os from "os";
// import * as cluster from "cluster";
// import { config } from "./config";
// import { logger } from "./services";

// const init = () => {
//   const port = process.env.port || config.httpPort;
//   http.createServer(app).listen(port, () => {
//     logger.log(
//       "The HTTP server is running on port " + port + " - " + config.envName
//     );
//   });
// };

// if (cluster.isMaster && process.env.START_WITH_CLUSTER) {
//   // Fork workers.
//   for (let i = 0; i < os.cpus().length; i++) {
//     cluster.fork();
//   }

//   cluster.on("exit", (worker, code, signal) => {
//     logger.log(
//       "Worker " +
//         worker.process.pid +
//         " died with code: " +
//         code +
//         ", and signal: " +
//         signal
//     );
//     logger.log("starting a new cluster");
//     cluster.fork();
//   });
// } else {
//   //start the sever
//   init();
// }

import App from './app';
import { Routes } from "./routes";

let app = new App().getApp();
Routes.routes(this.app);

export { app };