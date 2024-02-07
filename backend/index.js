// express server
// const { Socket } = require('dgram');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);


const port = 3001;
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// render the index.html file 
app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html');
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});
//send the message to everyone
io.on('connection', (socket) => {
    socket.on('inputedMessage', (msg) => {
        io.emit('inputedMessage', msg);
    });
});

server.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}/`);
})




