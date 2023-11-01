/////////////////////   Server

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(server, {cors: {origin: "*"}});

app.get('/', (req, res)=> {
    var options = {
      root: path.join(__dirname)
    }
    var fileName = 'index.html';
    res.render(fileName, options);
});

server.listen(3001, () => {
    console.log("Server running...");
});

const arrUserInfo = [];

io.on('connection', (socket) => {
  // console.log("User connected: " + socket.id);

    socket.on('NGUOI_DUNG_DANG_KY', user => {
      const isExist = arrUserInfo.some(e => e.name === user.name);
      
      socket.peerId = user.peerId;

      if(isExist) {
        return socket.emit('DANG_KY_THAT_BAI');
      }

      arrUserInfo.push(user);
      socket.emit('DANH_SACH_ONLINE', arrUserInfo);
      socket.broadcast.emit('CO_NGUOI_DUNG_MOI', user);
    });

    socket.on('disconnect', () => {
        const index = arrUserInfo.findIndex(user => user.peerId === socket.peerId);
        arrUserInfo.splice(index, 1);
        io.emit('USER_DISCONNECTED', socket.peerId);
    });
});