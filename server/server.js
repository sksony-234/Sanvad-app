const express = require('express');
const dotenv = require('dotenv');
// const { chats } = require('./data/data');
const chatRoutes = require('./router/chatRoutes');
const userRoutes = require('./router/userRoutes');
const messageRoutes = require('./router/messageRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();
dotenv.config({ path: "./config/.env" });

const hostname = '127.0.0.1';
const port = process.env.PORT || 4000;
require('./db/dbConnection');

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);



// --------------------------deployment------------------------------

// const __dirname1 = path.resolve();

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname1, "../client/build")));

//     app.get("*", (req, res) =>
//         res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
//     );
// } else {
//     app.get("/", (req, res) => {
//         res.send("API is running..");
//     });
//}

// --------------------------deployment------------------------------



app.use(notFound)
app.use(errorHandler);
app.use(fileUpload({
    useTempFiles: true
}))



app.get('/', (req, res) => {
    res.status(200).send("hello world hello world form backend");
})
app.get('/api', (req, res) => {
    res.status(200).send("hello world");
})



const server = app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
        // credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        // console.log(userData._id);
        socket.emit("connected");
    });

    socket.on('join chat', (room) => {
        socket.join(room._id);
        console.log("User join Room", room);
    });

    socket.on('typing', (room) => socket.in(room).emit("typing..."));
    socket.on('stop typing', (room) => socket.in(room).emit("stop typing..."));

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});