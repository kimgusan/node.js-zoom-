import http from "http";
// import SocketIO from "socket.io";
import { Server } from "socket.io";
import WebSoket from "ws";
import express from "express";

// 앱 실행
const app = express();

// 템플릿 엔진 설정
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

// express 앱 생성 및 app 객체 생성(서버 설정 및 라우팅 정의)
app.get("/", (req, res) => res.render("home"));
const handleListen = () => console.log("Listening on ws://localhost:3001");
// 어디든 접속하든 home 으로 돌아오게 하는것
app.get("/*", (req, res) => res.redirect("/"));

// 포트 정의
// app.listen(3000, handleListen);

// 같은 서버에서 http, websoket 서버 돌리기
// const server = http.createServer(app);
// const wss = new WebSoket.Server({ server });

// 1. websocket 사용
// const sockets = [];

// wss.on("connection", (socket) => {
//     sockets.push(socket);
//     socket["nickname"] = "Anon";
//     console.log("Connected to Browser ");
//     socket.on("close", () => console.log("Disconnected from the Browser"));
//     socket.on("message", (msg) => {
//         const message = JSON.parse(msg);
//         switch (message.type) {
//             case "new_message":
//                 sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${message.payload}`));
//                 break;
//             case "nickname":
//                 socket["nickname"] = message.payload;
//                 break;
//         }
//     });
// });

// SocketIO 를 사용한 서버
const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => {
    socket.onAny((event) => {
        console.log(`Socket Event:${event}`);
    });
    socket.on("enter_room", (roomName, done) => {
        socket.join(roomName);
        done();
        socket.to(roomName).emit("welcome");
    });
    socket.on("disconnecting", () => {
        socket.rooms.forEach((room) => socket.to(room).emit("bye"));
    });
    socket.on("new_message", (msg, room, done) => {
        socket.to(room).emit("new_message", msg);
        done();
    });
});

httpServer.listen(3001, handleListen);
