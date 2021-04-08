function $(argument) {
	this.el= document.getElementById(argument)
    this.event=function(events,func){
	    this.el.addEventListener(events,func)
}
this.val=function (){
	return this.el.value
}
}
var user=prompt('what is ur name','john walker')
const socket=io()
var form =new $('send-container')
socket.on('welcome',mun=>{
new $('message-container').el.innerHTML+=`
<div id='messages'>${mun.message} <span><small>${mun.time}</small></span></div>
		`


	console.log(mun)
})
// $('message-input').addEventListener('keydown',e=>{
// 	console.log(e)
// 	if(e.keyCode==13&&e.shiftkey==false){
// 		e.preventDefault()
// 	}
// })
form.event('submit',(e)=>{
    e.preventDefault()
    var message=new $('message-input').val()
    socket.emit('chat-message',{
    	message,
    	time:`${new Date().getHours()}:${new Date().getMinutes()}pm`,
    	user
    })
    new $('message-container').el.innerHTML+=`
<div id='messages-user'>${message} <span><small>${new Date().getHours()}:${new Date().getMinutes()}pm</small></span></div>
		`
    new $('message-input').el.value=''
})