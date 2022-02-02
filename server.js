const express = require('express');

const port = 8000;

const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

const rooms = new Map();

app.get('/rooms', (req, res) => {
    res.json(rooms);
});

io.on('connection', (socket) => {
    console.log('user connected', socket.id);
});

server.listen(port, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log(`Server is on ${port}`);
});