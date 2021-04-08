function $(argument) {
	this.el= document.getElementById(argument)
    this.event=function(events,func){
	    this.el.addEventListener(events,func)
}
  this.val=function (){
  	return this.el.value
  }
  this.class=(index)=>{
        return document.getElementsByClassName(argument)[index];
  }
}
var el=new $('e ss').class(0).onclick=()=>{
   if(window.location.pathname=='/app.html'){
    new $('first').el.style.display='none'
  new $('second').el.style.display='block'
}else{
  window.location='app.html#'+user
}
  
}
var el=new $('e dd').class(0).onclick=()=>{
  window.location='/status.html#'+user
}
var el=new $('e po').class(0).onclick=()=>{
  window.location='/posts.html#'+user
}
var el=new $('e new').class(0).onclick=()=>{
  window.location='/new_post.html#'+user
}
var el=new $('e cr').class(0).onclick=()=>{
  window.location='/create.html#'+user
}