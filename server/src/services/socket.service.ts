import * as socketIo from "socket.io";
import { SocketUserControoker } from "../controllers";
import { logger } from "./logger.service";
// import { validateSocketToken } from "../services/authorization.service";
module.exports = server => {
  this.io = socketIo(server);
  this.io.on("connection", async socket => {
    logger.log("user-connect", socket.id);
    try {
      socket.on("join", async (userId: string) => {
        logger.log("join", userId);
        await SocketUserControoker.updateUser(
          { _id: userId },
          { socketId: socket.id }
        );
        const user = await SocketUserControoker.findUser(userId);
        socket.broadcast.emit("join", user);
      });
      socket.on("allUsers", async (userId: string) => {
        const users = await SocketUserControoker.findUsers({
          _id: { $ne: userId }
        });
        socket.emit("allUsers", users);
      });
      socket.on("disconnect", async () => {
        logger.log("user-disconnect", socket.id);
        const socketId = socket.id;
        await SocketUserControoker.updateUser(
          { socketId },
          {
            isLoggedIn: false,
            lastLoggedIn: new Date()
          }
        );
        socket.broadcast.emit("left", socketId);
      });
    } catch (error) {
      logger.log("socket error", error);
    }
  });
};
