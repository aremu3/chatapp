var path=require('path')
const http=require('http')
const express=require('express')
const socketio=require('socket.io')
const app=express()
const server=http.createServer(app)
const io=socketio(server)
var router=require('./router')
var query=require('./query')
var multer = require('multer');
var fs = require('fs');
var userSocket={}
var G='E54jh9';
var R='8Joi9H';
var O='JU8rhod';
var U='hi484j';
var P='7(*&J;%';
var group_id=G+R+O+U+P
// app.use(express.static(path.join(__dirname,'ff')))
app.use(express.static(path.join(__dirname,'build')))
app.post('/api/new_post',function(req,res){
	fs.writeFileSync('./uploads/app.txt',image)
});

io.on('connection',socket=>{
socket.on('friend-request',request=>{
	var {addFriend}=query
	addFriend(request.person1,request.person2)

})
socket.on('new_post',res=>{
	console.log(res)
	db.query('SELECT * FROM bucker_posts',(err,resp)=>{
			fs.writeFileSync(`./uploads/post${resp.length-1}.txt`,res.image)
			var data={
			  post:res.post,
		      comments:res.comments,
		      likes:res.likes,
		      commentTable:`comments${resp.length-1}`,
		      postID:`postID${resp.length-1}`
			}
			db.query(`INSERT INTO bucker_posts SET ?`,data,(err,resp)=>{
		   		if(err){
		   			console.log('err',err)
		   		}else{
		   			console.log('sucess')
		   		}
		   	})
		})
	
})
socket.on('status',res=>{
	query.addStatus(res.text,res.color,res.time,res.user)
})
socket.on('register',res=>{
	var {register}=query
	register(res.user)
})
socket.on('groupChat-message',res=>{
	var {db}=query
   	db.query(`INSERT INTO ${res.group} SET ?`,{
   		username:res.user,
   		message:res.message,
   		time:res.time
   	},(err,res)=>{
   		if(err){
   			console.log('err',err)
   		}else{
   			console.log('sucess')
   		}
   	})
})
socket.on('new_group',res=>{
	var {addGroup}=query;
	for(var i=0;i<res.users.length;i++){
		addGroup(res.users[i],res.groupname+group_id)
	}
		var sql3=`
CREATE TABLE ${res.groupname}
(
username VARCHAR(20),
message VARCHAR(225),
time VARCHAR(20)
)
	`
    
	db.query(sql3,(err,result)=>{
		if(err){
			console.log('an error occured')
		}else {
			console.log('CREATED TABLE successfully...')
		}
	})
		var sql4=`
CREATE TABLE ${res.groupname}_users
(
username VARCHAR(20)
)
	`
    
	db.query(sql4,(err,result)=>{
		if(err){
			console.log('an error occured')
		}else {
			console.log('CREATED TABLE successfully...')
		}
	})
var sql=`INSERT INTO  ${res.groupname}_users SET ?`

	db.query(sql,{
		username:res.users[i]
	},(err,result)=>{
		if(err){
			console.log('an error occured')
		}else {
			console.log('insrted successfully...')
		}
	})
})

socket.on('createChat',resp=>{
	console.log(resp)
	var {chatCreate}=query
	chatCreate(resp.user,resp.current_user)

})
	socket.on('disconnect',()=>{
		socket.broadcast.emit('remove_user',userSocket[socket.id])
		var {db}=query
	console.log('disconned'+userSocket[socket.id])
	var sql=`UPDATE activity SET activity='inactive'
			WHERE username='${userSocket[socket.id]}' `;
			db.query(sql,(err,ress)=>{
				if(err){
					console.log('err',err)
				}else{
					console.log('updated')
				}
			})
})

	socket.on('new-user',user=>{

		socket.broadcast.emit('active',user)
		userSocket[socket.id]=user

	})
   console.log('a user connected')
   socket.on('request',res=>{
	socket.broadcast.emit('requests',res)
   })
   socket.on('chat-message',mes=>{
   	console.log(mes)
   	var {db}=query
	
   	socket.broadcast.emit('welcome',mes)
   	var {db}=query
   	db.query(`INSERT INTO ${mes.db} SET ?`,{
   		username:mes.user,
   		message:mes.message,
   		time:mes.time
   	},(err,res)=>{
   		if(err){
   			console.log('err',err)
   		}else{
   			console.log('sucess')
   		}
   	})
   	var sql=`UPDATE last SET message='${mes.message}'  WHERE data='${mes.db}' `;
   	db.query(sql,(err,res)=>{
   		if(err){
   			console.log('err',err)
   		}else{
   			console.log('sucess')
   		}
   	})
   })
    socket.on('offline_message',mes=>{
   	console.log(mes)
   	var {db}=query
   	var {chatParser}=query
   	db.query('SELECT * FROM chatters',(err,res)=>{
	all=res
		db.query(`INSERT INTO ${chatParser(mes.user,mes.userto)} SET ?`,{
		   		username:mes.user,
		   		message:mes.message,
		   		time:mes.time
		   	},(err,resg)=>{
		   		if(err){
		   			console.log('err',err)
		   		}else{
		   			console.log('sucess')
		   		}
		   	})
		   	var sql=`UPDATE last SET message='${mes.message}'  WHERE data='${chatParser(mes.user,mes.userto)}' `;
		   	db.query(sql,(err,res)=>{
		   		if(err){
		   			console.log('err',err)
		   		}else{
		   			console.log('sucess')
		   		}
		   	})
		})

})
   	
   socket.on('database',res=>{
	 var {db}=query
	 console.log(res)
	 db.query('SELECT * FROM chatters',(err,all)=>{
	 	var id=query.chatParser(res.user1,res.user2)
	 	 console.log(id)
	 	 console.log(res)
	 	 if(res.b==null){
			var sql=`UPDATE activity SET activity='active'
			WHERE username='${res.user1}' OR username='${res.user2}' `;
			db.query(sql,(err,ress)=>{
				if(err){
					console.log('err',err)
				}else{
					console.log('updated')
				}
			})
	 	 }else{
	 	 	var sql=`UPDATE activity SET activity='inactive'
			WHERE username='${res.b}' `;
			db.query(sql,(err,ress)=>{
				if(err){
					console.log('err',err)
				}else{
					console.log('updated')
				}
			})
	 	 	var sql=`UPDATE activity SET activity='active'
			WHERE username='${res.user1}' OR username='${res.user2}' `;
			db.query(sql,(err,ress)=>{
				if(err){
					console.log('err',err)
				}else{
					console.log('updated')
				}
			})
	 	 }
	 	 
	 	socket.emit('sucess',{
	 		o:res.user1,
	 		n:res.user2,
	 		id
	 	})
	 	socket.broadcast.emit('sucess',{
	 		o:res.user1,
	 		n:res.user2,
	 		id
	 	})
	 })
    })

})

app.use('/api',router)
const PORT=2000||process.env.PORT;
server.listen(PORT,()=>{
	console.log(`server running on port ${PORT}`)
})
//  var {db}=query
// var sql=`UPDATE activity SET activity='inactive'
// 			WHERE username='sandy' OR username='aremu' `;
// 			db.query(sql,(err,ress)=>{
// 				if(err){
// 					console.log('err',err)
// 				}else{
// 					console.log('updated')
// 				}
// 	})
// var {db}=query
// var sql=`UPDATE last SET message='pp'  
// WHERE database='aremubolu' `;
//    	db.query(sql,(err,res)=>{
//    		if(err){
//    			console.log('err',err)
//    		}else{
//    			console.log('sucess')
//    		}
//    	})
var {db}=query
var sql=`UPDATE last SET message='${'chat with'}'  WHERE data='${'aremubolu'}' `;
   	db.query(sql,(err,res)=>{
   		if(err){
   			console.log('err',err)
   		}else{
   			console.log('sucess',res)
   		}
   	})