// ES6 nicht möglich, da NodeJs nicht unterstützt
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();

app.get('/', (req, res) => res.send('Ocha-Server is online!'));

const server = http.Server(app);
server.listen(3000);

const io = socketIo(server);

let words = []

io.on('connection', (socket) => {
    socket.on('ocha', (data) => {
        if(data === 'getData') {
            console.log('getData', words);
            
            socket.emit('dictexport', words)
        }
        else {
            console.log('words');
            
            words = data
        }
    })
})