const express = require("express");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Run when client connects
io.on("connection", (socket) => {
	socket.on("newuser", function (username) {
		socket.broadcast.emit("update", username + " joined the chat");
	});

	socket.on("exituser", function (username) {
		socket.broadcast.emit("update", username + " left the chat");
	});

	socket.on("chat", function (message) {
		socket.broadcast.emit("chat", message);
	});
});

app.use(express.static(path.join(`${__dirname}/public`)));

server.listen(process.env.PORT || 4000, () => {
	console.log("app running");
});
