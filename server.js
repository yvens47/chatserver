const app = require("express")();

const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5000/"
  }
});

app.get("/", function (req, res) {
  res.json({ data: "chat app serve" });
});

io.on("connection", function (socket) {
  console.log("a user is connected");
  socket.on("join", function (data) {
    console.log(data);
    socket.emit("messages", "Hello rom server");
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});
http.listen(5000, () => {
  console.log("server started");
});
