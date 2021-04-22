// app.js
// Require and create our server packages
const express = require('express');
const app = express();
const http = require('http');

const server = http.createServer(app);
const io = require('socket.io')(server);
var numberPlayer = 0;

app.get("/gameControl",(request,resultat)=>{
    resultat.sendFile(__dirname+"/game.control.js")
})
app.get("/gameDisplay",(request,resultat)=>{
    resultat.sendFile(__dirname+"/game.display.js")
})
app.get("/gameKeycode",(request,resultat)=>{
    resultat.sendFile(__dirname+"/game.keycode.js")
})
app.get("/game",(request,resultat)=>{
    resultat.sendFile(__dirname+"/game.js")
})
app.get("/",(request,resultat)=>{
    resultat.sendFile(__dirname+"/pong.html")
})

io.on("connection",(socket)=>{
    numberPlayer++;
    if(numberPlayer===1){
        socket.emit("Attribution du joueur", "playerOne");
    }
    if(numberPlayer===2){
        socket.emit("Attribution du joueur", "playerTwo");
    }
    if(numberPlayer===3){
        socket.emit("Attribution du joueur", "playerThree");
    }
    if(numberPlayer===4){
        socket.emit("Attribution du joueur", "playerFour");
        numberPlayer = 0;
    }

    socket.on("player one move",(player)=>{
        io.emit("Update position player one", player);
    })
    socket.on("player two move",(player)=>{
        io.emit("Update position player two", player);
    })
    socket.on("player three move",(player)=>{
        io.emit("Update position player three", player);
    })
    socket.on("player four move",(player)=>{
        io.emit("Update position player four", player);
    })

    socket.on("ball Move",(ball)=>{
        io.emit("Update position ball", ball);
    })

    socket.on("disconnect",()=> {
        numberPlayer--;
    })
})
server.listen(3000,()=>{})