
var mysql=require('mysql')

const db=mysql.createConnection({
	host:'127.0.0.1',
	user:'root',
	database:'gg'
   
})
db.connect((err)=>{
	if(err) console.log('no')
	console.log('connected')
	

})

db.query('SELECT * FROM chatters',(err,res)=>{
	all=res
	console.log(all)
console.log(chatParser('aremu','bolu')) 
})
function getAll(){
	return new Promise(function(res,rej){
		db.query('SELECT * FROM chatusers',(err,resp)=>{
	       res(resp)
        })
	})
}
function fetchPosts(){
	return new Promise((res,rej)=>{
		db.query('SELECT * FROM bucker_posts',(err,resp)=>{
	          res(resp)
        })
	})
}
function group_chats(group){
	return new Promise((res,rej)=>{
		db.query(`SELECT * FROM ${group}`,(err,resp)=>{
	          res(resp)
	})
  })
}
function search(val,db){
	var res;
	for (var i = 0; i < db.length; i++) {
		if(db[i].username==value){
			res=db[i].activity
		}
	}
	return res;
}
function searchdb(val,db){
	var res;
	for (var i = 0; i < db.length; i++) {
		if(db[i].data==val){
			res=db[i].message
			break;
		}
	}
	return res;
}

var fetchMeFriends=(user)=>{
	return new Promise((result,rej)=>{
        db.query(`SELECT * FROM ${user}`,(err,res)=>{
        	if(err){
        		result({error:"error"})
        	}else{
        		result(res)
        	}
			
        })
	})
}

fetchMeFriends('aremu').then(res=>{
	console.log(res,'kjh')
	
})

function chatParser(u1,u2){
	var ID=[]
	for(var i=0;i<all.length;i++){
		if(all[i].username==u1 || all[i].username==u2){
				ID.push(all[i].chatId)
			}
		
	}
	var f;
	console.log(ID)

	for (var i = 0; i < ID.length; i++) {
		if(ID[i]==ID[i+1]){
			f=ID[i]
			break
		}
	}
	return f
}
function isChatting(user){
	return new Promise((res,rej)=>{
		db.query('SELECT * FROM activity',(err,result)=>{
             for(var i=0;i<result.length;i++){
             	if(result[i].username==user){
             		if(result[i].activity=='active'){
             			res(true)
             		}else{
             			res(false)
             		}
             	}
             }
		})
	})
}
isChatting('aremu').then(res=>{
	console.log(res,'activity')
})
function isActivity(){
	return new Promise((res,rej)=>{
		db.query('SELECT * FROM activity',(err,result)=>{
             res(result)
		})
	})
}
function newbe(n){
	var sql=`
CREATE TABLE ${n}
(
friends VARCHAR(20)

)
	 `
}
function isChatee(a,b){
	return new Promise(function(res,rej){
		db.query('SELECT * FROM chatters',(err,result)=>{
				all=result;
				if(chatParser(a,b)==undefined && chatParser(b,a)==undefined ){
                     res(false)
				}else{
					res(true)
				}
	            
	    })
	})

}
function returndb(user){
	return new Promise((resolve,rej)=>{
		fetchMeFriends(user).then(res=>{
			db.query('SELECT * FROM chatters',(err,result)=>{
				var arr=[]
	             all=result;
	             for (var i = 0; i < res.length; i++) {
	             	arr.push({
	             		db:chatParser(user,res[i].friends),
	             		user:res[i].friends
	             	})
	             	
	             }
	             resolve(arr)

	 
            })
		})
	})
}

returndb('aremu').then(res=>console.log(res,'response'))
function returnlast(user){
	return new Promise((resolve,reject)=>{
			returndb(user).then(res=>{
			db.query('SELECT * FROM last',(err,result)=>{
				var lasts=[]
				
				for(var i=0;i<res.length;i++){
					lasts.push({
						last:searchdb(res[i].db,result),
						user:res[i].user
					})
				}
				resolve(lasts)

			})
		})
	})
	

}

returnlast('aremu').then(res=>{
	console.log(res)
})
function addFriend(friend,user){
	var sql1=`INSERT INTO ${user} SET ?`
    var data={
    	friends:friend
    }
	let query=db.query(sql1,data,(err,result)=>{
		if(err){
			console.log('an error occured')
		}else {
			console.log('inserted successfully...')
		}
	})
	var sql2=`INSERT INTO ${friend} SET ?`
    var data={
    	friends:user
    }
	let iquery=db.query(sql2,data,(err,result)=>{
		if(err){
			console.log('an error occured')
		}else {
			console.log('inserted successfully...')
		}
	})
}
function addGroup(friend,group){
	var sql1=`INSERT INTO ${friend} SET ?`
    var data={
    	friends:group
    }
	let query=db.query(sql1,data,(err,result)=>{
		if(err){
			console.log('an error occured')
		}else {
			console.log('inserted successfully...')
		}
	})
	
}
function register(user){
	var sql=`
CREATE TABLE ${user}
(
friends VARCHAR(20)
)
	`
    
	db.query(sql,(err,result)=>{
		if(err){
			console.log('an error occured',err)
		}else {
			console.log('CREATED TABLE successfully...')
		}
	})
	var sql2=`
	CREATE TABLE ${user}_status
	(
status VARCHAR(500),
color VARCHAR(15),
user VARCHAR(40),
time VARCHAR(10)
	)
		`
	    
		db.query(sql2,(err,result)=>{
			if(err){
				console.log('an error occured',err)
			}else {
				console.log('CREATED TABLE successfully...')
			}
		})
}

function FetchStatus(user){
	return new Promise((res,rej)=>{
		db.query(`SELECT * FROM ${user}_status`,(err,result)=>{
             if(err){
             	res({resolve:'error'})
             }else if(result.length==0){
             	res({resolve:'empty'})
             }else{
             	res({resolve:result})
             }
		})
	})
}
function addStatus(text,color,time,user){
	var sql9=`INSERT INTO ${user}_status SET ?`
    var data={
    	status:text,
    	color:color,
    	user,
    	time
    }
	db.query(sql9,data,(err,result)=>{
		if(err){
			console.log('an error occured')
		}else {
			console.log('inserted successfully...')
		}
	})
}
function chatCreate(u1,u2){
    var sql1=`INSERT INTO chatters SET ?`
    var data={
    	username:u1,
    	chatId:u1+u2
    }
	let query=db.query(sql1,data,(err,result)=>{
		if(err){
			console.log('an error occured')
		}else {
			console.log('inserted successfully...')
		}
	})
	var sql2=`INSERT INTO chatters SET ?`
    var data={
    	username:u2,
    	chatId:u1+u2
    }
	let query1=db.query(sql2,data,(err,result)=>{
		if(err){
			console.log('an error occured')
		}else {
			console.log('inserted successfully...')
		}
	})
	var sql9=`INSERT INTO last SET ?`
    var data={
    	data:u1+u2,
    	message:"Hey, i'm on this app"
    }
	db.query(sql9,data,(err,result)=>{
		if(err){
			console.log('an error occured')
		}else {
			console.log('inserted successfully...')
		}
	})
	var sql3=`
CREATE TABLE ${u1+u2}
(
username VARCHAR(20),
message VARCHAR(225),
time VARCHAR(6)
)
	`
    
	let query3=db.query(sql3,(err,result)=>{
		if(err){
			console.log('an error occured')
		}else {
			console.log('CREATED TABLE successfully...')
		}
	})
}

function fetchchats(u1,u2){
	return new Promise((res,rej)=>{
		db.query('SELECT * FROM chatters',(err,resk)=>{
	all=resk;
	if(err){
          fetchMeFriends(u2).then(friend=>{
		var friends=[]
		for(var i=0;i<friend.length;i++){
			friends.push(friend[i].friends)
		}
		var chats;
		console.log(friends)
	var isfriend=false;
	for(var i=0;i<friends.length;i++){
		if(friends[i]==u1){
			isfriend=true
			break

		}
	}
	console.log(chatParser(u2,u1))
	if(isfriend==true &&  chatParser(u2,u1) != undefined){
		let s=`SELECT * FROM ${chatParser(u2,u1)}`
		let aquery=db.query(s,(err,resf)=>{
			
				res(resf)
			
			
		})

	}
  })
	

	}else{
		fetchMeFriends(u1).then(friend=>{
		var friends=[]
		for(var i=0;i<friend.length;i++){
			friends.push(friend[i].friends)
		}
		var chats;
		console.log(friends)
	var isfriend=false;
	for(var i=0;i<friends.length;i++){
		if(friends[i]==u2){
			isfriend=true
			break

		}
	}
	console.log(chatParser(u1,u2))
	if(isfriend==true &&  chatParser(u1,u2) != undefined){
		let s=`SELECT * FROM ${chatParser(u1,u2)}`
		let aquery=db.query(s,(err,resf)=>{
			
				res(resf)
			
			
		})

	}
  })
	}
	
})
	})
	
 
	
}
fetchchats('bolu','aremu').then(res=>{
	console.log(res,'l')
})

module.exports={
fetchchats,
chatCreate,
chatParser,
db,
fetchMeFriends,
returnlast,
isChatting,
isActivity,
getAll,
addFriend,
isChatee,
register,
FetchStatus,
addStatus,
addGroup,
group_chats,
fetchPosts
}