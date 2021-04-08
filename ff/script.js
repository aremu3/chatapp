const socket=io()
window['isgroup']=false;
window['grouper']=null
var user=location.hash.replace('#','')
function fetchActivity(){
      fetch(`/api/activity?user=aremu`).then(res=>{
         return res.json()
      }).then(res=>{
           window['activity']=res
      })
}
function search(val,db){
  var res;
  for (var i = 0; i < db.length; i++) {
    if(db[i].username==val){
      res=db[i].activity
    }
  }
  return res;
}

function searchf(val,db){
  var res=false
  for (var i = 0; i < db.length; i++) {
    if(db[i].friends==val){
      res=true
    }
  }
  return res;
}
setInterval(fetchActivity,500)
window['usersArr']=[]
window['users']=null
var current_user=null
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
  window.location='app.html'
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
 function last(){
      fetch(`/api/last?user=${user}`).then(res=>{
      return res.json()
    }).then(res=>{
      for (var i = 0; i < res.length; i++) {
        new $(res[i].user+'msg').el.innerHTML=res[i].last
      }
    })
 }
 
window.onload=function(){
   fetch(`/api/friends?user=${user}`).then(res=>{
   return res.json()
 }).then(r=>{
  fetch('/api/all').then(res=>{
    return res.json()
  }).then(res=>{
    for (var i = 0; i < res.length; i++) {
      if(res[i].user!=user&&searchf(res[i].user,r)!=true)
        new $('conacts').el.innerHTML+=`
            <div class="contact shape s">
                  <div class="pic rogers"></div>
                  <div class="badge" id=${ res[i].user+'badge'}>
                    14
                  </div>
                  <div class="name left" >
                    ${res[i].user.search(group_id)!=-1?res[i].user:res[i].user.replace(group_id,'')}
                  </div>
                  <div class="message left" id=${ res[i].user+'msg'}>
                    <button class="input accept" id=${res[i].user} >add friend</button>
                  </div>
            </div>
        `
       
      }
  })
})
  
}
function fetchFriends(){
  new $('contacts').el.innerHTML=''
         fetch(`/api/friends?user=${user}`).then(res=>{
   return res.json()
 }).then(r=>{
  var results=r
   if(results.error){
      alert('err')
      socket.emit('register',{
        user
      })
    }else{
      last()
      for (var i = 0; i < r.length; i++) {
console.log(r[i].friends.indexOf(group_id))

        new $('contacts').el.innerHTML+=`
<div class="contact shape">
      <div class="pic rogers"></div>
      <div class="badge" id=${ r[i].friends+'badge'}>
        14
      </div>
      <div class="name left ${r[i].friends.indexOf(group_id)!=-1?group_id:''}" id=${r[i].friends}>
        ${r[i].friends.replace(group_id,'')}
      </div>
      <div class="message left" id=${ r[i].friends+'msg'}>
        click above to jump in to chat
      </div>
    </div>
        ` 
       
      }
    }
 })
}

 fetchFriends()
var form =new $('send-container')
socket.on('welcome',mun=>{
  if(current_db!=undefined){
    if(mun.userto==user){
       new $('hello').el.innerHTML+=`
<div class="message stark">
       ${mun.message}
       <span><small>${new Date().getHours()}:${new Date().getMinutes()}pm</small></span>
      </div>
    `
    }
   
  }



	console.log(mun)
})
function remove(value,arrr){
  var newarr=[]
  for (var i = 0; i < arrr.length; i++) {
    if(arrr[i]!=value){
      newarr.push(arrr[i])

  }
  
   }
   return newarr
}
setInterval(()=>{
  socket.emit('new-user',user)
},3000)
socket.on('remove_user',response=>{
  usersArr=remove(response,usersArr)
  if(new $(response+'badge').el){
       new $(response+'badge').el.style.background='grey'
  }
})
socket.on('active',act=>{
 
  usersArr.push(act)
  if(new $(act+'badge').el){
       new $(act+'badge').el.style.background='green'
  }
})
function isOnline(user){
  var online=false;
  for (var i = 0; i < usersArr.length; i++) {
    if(usersArr[i]==user){
      online=true
    }
  }
  return online
}

form.event('submit',(e)=>{


    e.preventDefault()
    var message=new $('message-input').val()
    if(message!=null &&message!=''){
     if(current_user!=null){
      
      if(isOnline(current_user)==false){
   
         socket.emit('offline_message',{
            message,
            time:`${new Date().getHours()}:${new Date().getMinutes()}pm`,
            user,
            userto:current_user,
      
         })
     }
   }
   else if(search(current_user,activity)=='active'){

          socket.emit('offline_message',{
                      message,
                      time:`${new Date().getHours()}:${new Date().getMinutes()}pm`,
                      user,
                      userto:current_user,
                
          })

     }else if(search(current_user,activity)=='inactive'){
           socket.emit('chat-message',{
                message,
                time:`${new Date().getHours()}:${new Date().getMinutes()}pm`,
                user,
                userto:user==users.o?users.n:users.o,
                db:current_db
           })
     }else if(isgroup==true&&grouper!=null){
            socket.emit('groupChat-message',{
            message,
            time:`${new Date().getHours()}:${new Date().getMinutes()}pm`,
            user,
            group:grouper
         })
     }else{
      socket.emit('chat-message',{
            message,
            time:`${new Date().getHours()}:${new Date().getMinutes()}pm`,
            user,
            userto:user==users.o?users.n:users.o,
            db:current_db
         })
     }
   if(new $(current_user+'msg').el){
       new $(current_user+'msg').el.innerHTML=message
   }else if(isgroup==false){
       new $(user==users.o?users.n:users.o+'msg').el.innerHTML=message
   }
    new $('hello').el.innerHTML+=`
<div class="message parker">
        ${message}
        <span><small>${new Date().getHours()}:${new Date().getMinutes()}pm</small></span>
      </div>
    `
    new $('message-input').el.value=''
    
  }
    
})

var input=new $('kk').val
  var but=new $('req').el;
  window.onclick=(e)=>{
   
    if(e.target.getAttribute('class')=='name left '){
  new $('first').el.style.display='block'
  new $('second').el.style.display='none'
      var id=e.target.getAttribute('id')
      var cl=document.getElementsByClassName('contact')
      var cn=document.getElementsByClassName('name')
  if(isOnline(id)==false){
     console.log('done')
        current_user=id;
        fetch(`/api/isChatee?a=${user}&b=${id}`).then(res=>{
          return res.text()
        }).then(res=>{
          if(res=='true'){
                      fetch(`/api/?i=${user}&id=${id}`).then(re=>{
                return re.json()
              })
                  .catch(err=>console.log(err))
                  .then(ress=>{
                new $('hello').el.innerHTML=''
                for(var i=0;i<ress.length;i++){
                  if(ress[i].username==user){
                     new $('hello').el.innerHTML+=`
            <div class="message parker">
                  ${ress[i].message}
                  <span><small>${ress[i].time}</small></span>
                </div>
                  `
                }else{
                     new $('hello').el.innerHTML+=`
            <div class="message stark">
                  ${ress[i].message}
                  <span><small>${ress[i].time}</small></span>
                </div>
                  `
                }
              }
              
             })
          }else{
            new $('hello').el.innerHTML=''
            socket.emit('createChat',{
              user,
              current_user
            })
          }
        })
        
  }else{
new $('chatto').el.innerHTML=id
     for (var i = 0; i < cn.length; i++) {
         if(e.target==cn[i]){
          cl[i].style.backgroundColor='#ccc'
         }else{
          cl[i].style.backgroundColor='white'
         }
     }
     var r=()=>{
      if(users.o==user){
        return users.n
      }else{
        return users.o
      }
     }
      socket.emit('request',{
      user:id,
      useri:user,
      b:users!=null?r():null
      })
    }
    }else if(e.target.getAttribute('class')==`name left ${group_id}`){
          new $('first').el.style.display='block'
          new $('second').el.style.display='none'
          window['isgroup']=true;
          window['grouper']=e.target.innerHTML;
           fetch(`/api/groups?i=${e.target.innerHTML}`).then(re=>{
                return re.json()
              }).then(ress=>{
                new $('hello').el.innerHTML=''
                for(var i=0;i<ress.length;i++){
                  if(ress[i].username==user){
                     new $('hello').el.innerHTML+=`
            <div class="message parker">
                  ${ress[i].message}
                  <span><small>${ress[i].time}</small></span>
                </div>
                  `
                }else{
                     new $('hello').el.innerHTML+=`
            <div class="message stark">
                  ${ress[i].message}
                  <span><small>${ress[i].time}</small></span>
                </div>
                  `
                }
              }
              
             })

    }else if(e.target.getAttribute('class')=='input accept'){

      let requ=document.getElementsByClassName('input accept')
      var divs=document.getElementsByClassName('contact shape s')
      for (var i = 0; i < requ.length; i++) {
        if(requ[i]==e.target){
             document.getElementById('conacts').removeChild(divs[i])
        }
      }
      fetchFriends()
      socket.emit('friend-request',{
        person1:user,
        person2:e.target.getAttribute('id')
      })
    }
  }
  socket.on('requests',req=>{
    
    if(user==req.user){
      console.log(req)
        socket.emit('database',{
             user1:req.user,
             user2:req.useri,
             b:req.b
        })
      
    }
  })
  socket.on('sucess',res=>{
   window['users']=res
   if(res.n==user){
    fetch(`/api/?i=${res.o}&id=${res.n}`).then(re=>{
      return re.json()
    }).then(ress=>{
      new $('hello').el.innerHTML=''
      for(var i=0;i<ress.length;i++){
        if(ress[i].username==user){
           new $('hello').el.innerHTML+=`
  <div class="message parker">
        ${ress[i].message}
        <span><small>${ress[i].time}</small></span>
      </div>
        `
      }else{
           new $('hello').el.innerHTML+=`
      <div class="message stark">
        ${ress[i].message}
        <span><small>${ress[i].time}</small></span>
      </div>
        `
      }
    }
    
   })
  
    if(user==res.o||user==res.n){
     window['current_db']=res.id
    }
  }
})
  