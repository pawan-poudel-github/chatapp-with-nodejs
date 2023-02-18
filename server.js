const express = require('express');
const app = express();
const http = require('http').Server(app)
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
});
app.use(express.static(__dirname + '/public'))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// socket 
const io = require('socket.io')(http);
io.on('connection', function(socket) {  
    socket.on('message', (msg) => {

        socket.broadcast.emit('message', msg)
    })
 });