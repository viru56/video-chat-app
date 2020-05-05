import * as socketIo from "socket.io";
module.exports = server => {
  this.io = socketIo(server);
  this.io.on("connection", socket => {
    console.log("connect");

    socket.on("test", data => {
      console.log(data);
      socket.emit("test", data);
    });

    socket.on("disconnect", () => {
      console.log("disconnect");
    });
  });
};
