const io=require('socket.io')(3000)
io.on('connection',socket=>{
	socket.emit('chat-message','hello')
})
var express=require('express')
var path=require('path')
var app=express()

app.use(express.static(path.join(__dirname,'sc')))
