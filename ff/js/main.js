var route=(port,user,pass)=>{
    return `http://localhost:${port}/api/users?username=${user}&password=${pass}`
}
function $(argument) {
   return document.getElementById(argument)
}
$('form').onsubmit=e=>{
 e.preventDefault()
 var a=$('o').value
  var b=$('n').value
  if(a!==''&&b!==''){
  	window.location='/app.html#'+a
  }
 

}