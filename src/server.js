import express from "express";

// 앱 실행
const app = express();

// 템플릿 엔진 설정
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

// express 앱 생성 및 app 객체 생성(서버 설정 및 라우팅 정의)
app.get("/", (req, res) => res.render("home"));
const handleListen = () => console.log("Listening on localhost");
// 어디든 접속하든 home 으로 돌아오게 하는것
app.get("/*", (req, res) => res.redirect("/"));

// 포트 정의
app.listen(3000, handleListen);
