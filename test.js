// var query= require('./query')
// var data=query.db
// var {isChatee}=query
// var {fetchMeFriends}=query
// fetchMeFriends('d').then(res=>{
// 	console.log(res,'answer')
// })
// data.query('SELECT * FROM aremu_status',(e,r)=>{
// 	console.log(r,'resukl;')
// })
// function el(id){return document.getElementById(id);} // Get elem by ID

// function readImage() {
//     if ( this.files && this.files[0] ) {
//         var FR= new FileReader();
//         FR.onload = function(e) {
//              el("img").src = e.target.result;
//              el("base").innerHTML = e.target.result;
//         };       
//         FR.readAsDataURL( this.files[0] );
//     }
// }
// // <!DOCTYPE html>
// // <html>
// // <head>
// // <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
// // <meta charset=utf-8 />
// // <title>JS Bin</title>
// // </head>
// // <body>
  

// // <input type='file' id="asd" />
// // <br>
// // <img id="img" src="//placehold.it/1x1/" />
// // <div id="base"></div>

  
// // </body>
// // </html>
// el("asd").addEventListener("change", readImage, false);\
// var str='123;,lkjhnb 890plkjhujkmlkjnhgydtycjbnhvgtfkjuylkjhl,b4567890'
// var l=str.length;
// let a=Math.floor(l/6)
// console.log(a)
// console.log([
// str.slice(0,a),
// str.slice(a,a*2),
// str.slice(a*2,a*3),
// str.slice(a*3,a*4),
// str.slice(a*4,a*5),
// str.slice(a*5,l),

var fs=require('fs')
fs.readFile('/Users/PCPC/nodejs/chat app/uploads/post0.txt',function(resp,res){
	console.log(res)
})