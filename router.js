var express=require('express');
var router=express.Router()
var query=require('./query')
var {fetchchats}=require('./query')
var {chatCreate}=require('./query')
var fs=require('fs')
router
    .route('/')
    .get((req,res)=>{
    	  var {id}=req.query
	      var {i}=req.query
	       fetchchats(id,i).then(resf=>{
		  res.send(resf)
	     }).catch(err=>res.send(err))
        })
    .post((req,res)=>{
    	console.log(req)
      res.send('hi')
    	
      })
router
     .route('/creatChat')
     .post((req,res)=>{
         var {u1}=req.query
         var {u2}=req.query
         chatCreate(u1,u2)
        })
router
      .route('/friends')
      .get((req,res)=>{
        var {user}=req.query
        query.fetchMeFriends(user)
           .then(resf=>{
            res.send(resf)
            })
           .catch(err=>res.send(err))


      })
router
      .route('/last')
      .get((req,res)=>{
        var {returnlast}=query
        var {user}=req.query;
        returnlast(user).then(response=>{
          res.send(response)
        })
      })
router
      .route('/isChatting')
      .get((req,res)=>{
        var {user}=req.query
        query.isChatting(user).then(resp=>{
          res.send(resp)
        })
      })
router
      .route('/activity')
      .get((req,res)=>{
        var {user}=req.query
        query.isActivity(user).then(resp=>{
          res.send(resp)
        })
      })
router
      .route('/all')
      .get((req,res)=>{
        query.getAll().then(resp=>{
          res.send(resp)
        })
      })
router
      .route('/isChatee')
      .get((req,res)=>{
        var {a}=req.query
        var {b}=req.query
        query.isChatee(a,b).then(resp=>{
          res.send(resp)
        })
      })
router
      .route('/status')
      .get((req,res)=>{
        var {user}=req.query
        query.FetchStatus(user).then(resp=>{
          res.send(resp)
        })
      })
router
      .route('/groups')
      .get((req,res)=>{
        var {i}=req.query
        query.group_chats(i).then(resp=>{
          res.send(resp)
        })
      })
router
      .route('/posts')
      .get((req,res)=>{
        query.fetchPosts().then(resp=>res.send(resp))
      })
router
      .route('/post_image')
      .get((req,resp)=>{
        console.log(req.query)
        fs.readFile(`/Users/PCPC/nodejs/chat app/uploads/${req.query.post}.txt`,function(resvp,res){
          if(resvp){
            console.log(resvp)
          }else{
            console.log(res,'lll')
          resp.send(res)
          }
          
        })
        // require('./test')
      })

module.exports=router