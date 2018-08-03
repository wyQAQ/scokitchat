var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var all = [];
var answer = '';
app.get('/', function(req, res){
  res.sendFile(__dirname + '/test.html');
});

io.on('connection', function(socket){

	//玩家昵称
  socket.on('userNick',function(msg){
  	io.emit('userNick',msg);
	})
  
  //玩家sockit信息
  socket.on('userinfo',function(msg){
  	io.emit('userinfo',msg);
	})
  
  //所有玩家信息
  socket.on('alluser',function(msg){
  	all.push(msg);
  	io.emit('alluser',all);
  })
  
  //所有玩家信息
  socket.on('editalluser',function(msg){
  	all = msg;
  	io.emit('alluser',all);
	})
  
  //当前题目
  socket.on('mapName', function(msg){
    answer = msg;
    io.emit("mapName",answer)
  });
  
  //绘图内容
  socket.on('drawCon',function(msg){
  	io.emit('drawCon',msg);
	})
  
  //玩家发送消息
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);  
  });
  
  //是否清空画布
  socket.on('isclearCanvas', function(msg){
    io.emit('isclearCanvas', msg);  
  });
  
  socket.on('disconnect', (reason) => {
    console.log(reason);
    io.emit("disconnect",reason);
    console.log(all);
  });
})

http.listen(port, function(){
  console.log('listening on :' + port);
});
