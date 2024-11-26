# Node.js

-   ExpressJS, app.get(), Pug, (req, res => ) ...

## 00. Zoom project (Noom)

-   Zoom Clone using NodeJS, WebRTC and Websockets.

## web socket

-   server.js 에서 socket은 연결된 브라우저를 뜻하고,  
    app.js 에서 socket은 서버로의 연결을 뜻한다.
-   sokect 을 활용해서 server 와 연결이 되었을 때 request/response 한 형태가 아닌  
     요청만 보낼수도 있고 전송만 보낼 수도 있는 형태 확인

> server.js

    const server = http.createServer(app);
    const wss = new WebSoket.Server({ server });

    wss.on("connection", (socket) => {
        console.log("Connected to Browser ");
        socket.on("close", () => console.log("Disconnected from the Browser"));
        socket.on("message", (message) => {
            console.log(`${message}`);
        });
        socket.send("hello!!!");
    });

    server.listen(3000, handleListen);

> app.js

    const socket = new WebSocket(`ws://${window.location.host}`);

    socket.addEventListener("open", () => {
        console.log("Connected to Server ");
    });
    socket.addEventListener("message", (message) => {
        console.log("New message: ", message.data);
    });

    socket.addEventListener("close", () => {
        console.log("Disconnected to Server None");
    });

    setTimeout(() => {
        socket.send("hello from the Broewser!");
    }, 10000);

## SocketIO (websocket의 제약적인 부분이 해결된 라이브러리)

-   함수호출을 백엔드에서 했는데 프론트엔드 함수가 실행되게 해야하는게 좋다. (로딩의 내용을 표기할때 사용)
-   함수가 전달될 때는 맨 백엔드로 보내는 emit의 argument 마지막이 function 이여야한다

    >

         server.js
         // SocketIO 를 사용한 서버
         const httpServer = http.createServer(app);
         const wsServer = new Server(httpServer);

         wsServer.on("connection", (socket) => {
             socket.on("enter_room", (roomName, done) => {
                 console.log(roomName);
                 setTimeout(() => {
                     done("hello from the backend");
                 }, 15000);
             });
         });

>

    app.js
    const socket = io();

    const welcome = document.getElementById("welcome");
    const form = welcome.querySelector("form");

    function backendDone(msg) {
        console.log(`The backend says: `, msg);
    }

    // 함수가 전달될 때는 맨 백엔드로 보내는 emit의 argument 마지막이 function 이여야한다
    function handleRoomSubmit(e) {
        e.preventDefault();
        const input = form.querySelector("input");
        socket.emit("enter_room", input.value, backendDone);
        input.value = "";
    }

    socket.addEventListener("message", (message) => {
        const li = document.createElement("li");
        li.innerText = message.data;
        messageList.append(li);
    });

    form.addEventListener("submit", handleRoomSubmit);

---

## Adapter

-   다른 서버에 있는 내역과 연동하고 싶을때 사용 ex) Mongo Adapter

---

## WebRTC (web Real-Time Communication)

-   peer to peer 통신이 가능 (영상, 오디오, 텍스트)
-   서버를 통하는게 아니라 브라우저 끼리 직접 전송
-   서버를 통하긴 하지만 실제로 넘어가는 것은 사용자 인터넷 ip, 방화벽 정보, 브라우져 같은 정보만 넘기는 것.

### video / audio part

-   WebRTC 기술을 활용하여 사용자의 **마이크(오디오)**와 **카메라(비디오)**에 접근하는 기능을 구현 가능
-   MediaDevices.getUserMedia() API를 사용하여 track 기능을 활용해 on/off 를 사용
