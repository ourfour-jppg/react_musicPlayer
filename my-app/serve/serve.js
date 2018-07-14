var request = require('request');
var fs = require('fs');
var MongoClient = require('mongodb');
var express = require('express');
var body_parser = require('body-parser');
var exec = require('child_process').exec;

// 初始化变量
var db,db_home,db_music,db_song_menu,client,pa_arr=[]
var cache=new Map()
var cache_time=30*60*1000



var time = new Date()
MongoClient.connect('mongodb://localhost:27017', function(err, client_) {
    if (err) {
        console.log('[' + new Date().toLocaleString() + ']', '连接数据库失败>>');
        process.exit();//连接失败结束进程
    } else {
    	console.log('[' + new Date().toLocaleString() + ']', '连接数据库成功>>',new Date()-time,'ms');
    	//连接成功将光标对象储存,共后面调用
        client=client_;

        db = client_.db('musicPlayer');
        db_user = db.collection('user');
        db_music = db.collection('music');
        db_song_menu=db.collection('song_menu');
        // console.log(MongoClient,client_)
        main()//启动路由
    }
});
//////////
// main //
//////////
function main(){

var app = express();
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static('../'));
app.use((req,res,exit)=>{
	res.append('Access-Control-Allow-Origin', '*');
	exit()
});
//设置静态页面并且设置资源缓存时间
// app.use(express.static('../',{maxAge:1000*60*3}))
///////////////////
//主页/////////////
///////////////////
app.get('/',function (req, res, err) {
    var index=fs.readFileSync().toString();
    if(index){
        // res.sendFile('../index.html') //弃用.没有文件的话直接报错
        res.send(index)
    }else{
        res.send('这个页面不见了!!!');
        console.log('[' + new Date().toLocaleString() + ']','主页不就了');
    }
});
//////////////////
///精准查询音乐////
/////////////////
app.post('/api/music', function(req, res, err) {
    console.log('[' + new Date().toLocaleString() + ']', 'music>>', req.body);
    // res.append('Access-Control-Allow-Origin', '*');
    //将收到的参数提取出来
    var _data = {
        name: req.body.name
    }
    //合成查询语句
    var query=[]
    for(var i=0;i<_data.name.length;i++){
    	 query.push({name:_data.name[i]})
    }
    // 查询并转数组
    db_music.find({ $or:query }).toArray(function(err, data) {
        res.json(data);
    });
});

///////////////////////////////
//用户歌单添加(一首一首添加) ///
/////////////////////////////
app.post('/api/youlist', function(req, res, err) {
    console.log('[' + new Date().toLocaleString() + ']', 'youlist>>', req.body);
    // res.append('Access-Control-Allow-Origin', '*');
    //将收到的参数提取出来
    var _data = {
        way:req.body.way,
		user_id:req.body.user_id,
		title:req.body.title,
		name:req.body.name,
		url:req.body.url,
		data:req.body.data,
    }
    //定义响应数据格式
    var data={
			state:1,	
			message:'',	
			data:''
    	}
    //查询歌单
    new Promise((fn_res,err)=>{
    	db_user.find({ _id:new MongoClient.ObjectID(_data.user_id) }).toArray(function(err, arr) {
    		if(err){
    			data.message='查找出错!!'
    			res.json(data);
    		}else{
    			if(arr.length==0){
    				data.message='此用户ID不存在!!'
    				res.json(data);
    			}else{
    				fn_res(arr[0])
    			}
    		}
    	});
    }).then((_res)=>{
    	// 创建歌曲格式
    	var obj={
    			name:_data.name,
    			url:_data.url
    		}

    	// 判断是否有这个歌单

    	//有歌的情况下将歌曲数据push进数组对应歌单内的列表里
    	//遍历歌单
    	for(var i=0;i<_res.youlist.length;i++){
    		if(_res.youlist[i].title==_data.title){
    			//找到歌单则将歌添加进去
    			if(_data.data){//如果有data则用data替换现有列表
    				if(_data.way=='delete'){
    					_res.youlist.splice(i,1)
    				}else{
    					_res.youlist[i].data=_data.data;
    				}
    			}else {
    				if(obj.url){//判断
    					// 没有列表则添加歌曲
    					_res.youlist[i].data.push(obj);
    				}else {
    					data.data=_res.youlist
						res.json(data);
    					return;
    				}
    				
    			}
    			break;
    		}
    	}
    	//没找到歌单则加入新歌单
    	if(i==_res.youlist.length){
    		_res.youlist.push({
    			title:_data.title,
    			data:[]
    		})
    	}

    	db_user.updateOne({user:_res.user},{$set:_res},function(err){
			if(err){
				data.state=1;
				res.json(data);
				console.log('[' + new Date().toLocaleString() + ']', 'youlist[失败:]'+_data.title+'>>', req.body);
			}else {
				data.data=_res.youlist
				res.json(data);
			}
    	})
    })
});
////////////
///exp更新//
///////////
app.post('/api/exp', function(req, res, err) {
    console.log('[' + new Date().toLocaleString() + ']', 'exp>>', req.body);
    // res.append('Access-Control-Allow-Origin', '*');
    //将收到的参数提取出来
    var _data = {
         user_id:req.body.user_id,
		 Date:req.body.Date,		//当前的UNIX时间
		 Music:req.body.Music		//刚刚播放完成的歌曲
    }
    //定义响应数据格式
    var data={
			state:1,	
			message:'',	
			data:''
    	}
    new Promise((fn_res,err)=>{
    	// 查询用户id
    	 db_user.find({ _id:_data.user_id }).toArray(function(err,arr) {
	    	if(data.lengtn==0){
	    		data.state=0;
	    		data.message='此ID不存在!!'
	    		res.json(data);
	    	}else{
	    		//大于3分钟则记录有效
	    		if(!(_data.Date-arr[0].date>1000*60*3)){
	    			data.state=0;
	    			data.message='歌曲没播放完成!!'
	    			res.json(data);
	    		}else{
	    			//id存在则传递现有exp并且进入下一步
	    			fn_res(arr[0].exp)
	    		}
	    	}
	    });
    }).then((exp)=>{
    	db_user.updateOne({ _id:_data.user_id },{date:_data.Date,exp:exp+1},(err,_res)=>{
    		if(err){
				data.state=0;
				data.message='更新失败'
				res.json(data);
				console.log('[' + new Date().toLocaleString() + ']', 'exp[更新失败]'+_data.user_id+'>>', req.body);
			}else {
				// 记录成功播放的歌曲
				db_music.find({ Music:_data.Music,url:_data.url }).toArray((err,arr)=>{
					// 查询成功数
					var num=arr[0].succeed
						if(!num){
							num=0
						}
					// 加一写入
					db_music.updateOne({ Music:_data.Music,url:_data.url },{succeed:num+1},(err,_res)=>{
						if(!err){
							data.state=0;
							data.message='写入失败';
							res.json(data);
							console.log('[' + new Date().toLocaleString() + ']', 'exp[写入失败:]'+_data.user_id+'>>', req.body);
						}else {
							res.json(data);
						}
					})
				})
			}
    	})
    });
});
///////////
//错误反馈//
///////////
app.post('/api/err', function(req, res, err) {
	console.log('[' + new Date().toLocaleString() + ']', 'Music_err>>', req.body);
    // res.append('Access-Control-Allow-Origin', '*');
    //将收到的参数提取出来
    var _data = {
         user_id:req.body.user_id, 	
		 Date:req.body.Date,		//当前的UNIX时间
		 Music:req.body.Music,	//刚刚播放完成的歌曲
		 url:req.body.url		//歌曲url
    }
    //定义响应数据格式
    var data={
			state:1,	
			message:'',	
			data:''
    	}
    new Promise((fn_res,err)=>{
	    db_music.find({  Music:_data.Music,url:_data.url }).toArray((err,arr)=>{
	    	if(arr.length==0){
	    		data.state=1	
				data.message='此歌疑从天上来!!!'
				res.json(data);
	    	}else{
	    		fn_res(arr[0].err-0)
	    	}
	    })
    }).then((num)=>{ 
    	db_music.updateOne({ Music:_data.Music,url:_data.url },{err:num+1},(err,_res)=>{
			if(!err){
				data.state=0;
				data.message='更新失败'
				res.json(data);
				console.log('[' + new Date().toLocaleString() + ']', 'exp[失败:]'+_data.user_id+'>>', req.body);
			}else {
				res.json(data);
			}
		})
    })
})
////////////
//主页歌单//*
///////////
app.get('/api/home', function(req, res, err) {
	console.log('[' + new Date().toLocaleString() + ']', 'home>>', req.body);
	// res.append('Access-Control-Allow-Origin', '*');
	db_song_menu.find().toArray((err,arr)=>{
		res.json(arr[0]);
	})
})
////////
//登录//*
////////
app.post('/api/login', function(req, res, err) {
	console.log('[' + new Date().toLocaleString() + ']', 'login>>', req.body);
	// res.append('Access-Control-Allow-Origin', '*');
	//将收到的参数提取出来
    var _data = {
        ur:req.body.ur,
		pr:req.body.pr
    }
    //定义响应数据格式
    var data={
			state:1,	
			message:'',	
			data:''
    	}
	if(!_data.ur || !_data.pr){
		data.state=0;
		data.message="未知的信号!!可能被外星人劫持了";
		res.json(data)
	}else{
		db_user.find({user:_data.ur,password:_data.pr}).toArray((err,arr)=>{
			if(!arr.length){
				data.state=0;
				data.message="这个账号和密码对不上";
	    		res.json(data);
			}else{
				delete arr[0].password;//将密码哪一行清除掉
				data.data=arr[0]
				res.json(data);
			}
		})
	}
})
//////////
///注册///*
/////////
app.post('/api/reg',function (req,res,err) {
	console.log('[' + new Date().toLocaleString() + ']', 'reg>>', req.body);
	// res.append('Access-Control-Allow-Origin', '*');
	//将收到的参数提取出来
    var _data = {
        phone:req.body.phone,
		pr:req.body.pr
    }
    //定义响应数据格式
    var data={
			state:1,	
			message:'',	
			data:''
    	}
    	console.log(_data)
    new Promise((fn_res,rej)=>{
    	console.log(_data)
    	db_user.find({phone:_data.phone}).toArray((err,arr)=>{
	    	if(arr.length){
	    		data.state=0;
				data.message="你已经有账号了为啥还注册??快去登录把!";
	    		res.json(data);
	    	}else{
	    		fn_res()
	    	}
	    })
    }).then(()=>{
    	var newUser={
    		user:_data.phone,
    		phone:_data.phone,
    		password:_data.pr,
    		exp:0,
    		gold:0,
    		date:Date.now(),//es5直接获取Unix时间
    		youlist:[{
    			title:'默认歌单',
    			data:[]
    		}]
    	}
    	db_user.insertOne(newUser,(err,_res)=>{
	    	if(err){
	    		data.state=0;
				data.message="Boommmmmm!!!!!!";
	    		res.json(data);
	    	}else{
				delete newUser.password;//将密码哪一行清除掉
				data.data=newUser;
				console.log('[' + new Date().toLocaleString() + ']', 'reg>>[成功]>>',_res.ops[0]._id);
				res.json(data);
	    	}
	    })
    })
    
})
////////
//搜索//*
///////
app.get('/api/search',function (req,res,err) {
	console.log('[' + new Date().toLocaleString() + ']', 'search>>',req.query);
	var time1=new Date()
	var data={ //定义响应数据格式
				state:1,
				message:'',	
				data:''
	    	}
	 if(!req.query.ss || req.query.ss==' '){
	 	state:0;
	 	data.data='大哥带个参数把.我都不知道你要啥(@﹏@)~';
	 	res.json(data);
	 	console.log('[' + new Date().toLocaleString() + ']', 'search>>[空消息!!!]>>',req.query.ss);
	 	return ;//直接返回阻止向后运行
	 }
	 //数据是否在爬取
	 if(pa_arr.indexOf(req.query.ss)>-1){
	 	state=0;
	 	data.data=[];
	 	res.json(data);
	 	console.log('[' + new Date().toLocaleString() + ']', 'search>>[正在爬取]>>',req.query.ss);
	 	return ;//直接返回阻止向后运行
	 }

	 //缓存判断
	if(cache.has(req.query.ss)){
		var _data=cache.get(req.query.ss)
		if(_data[0]+cache_time > new Date()-0){
			data.data=_data[1];
			cache.set(req.query.ss,[new Date()-0,_data[1]])//更新时间
	        console.log('[' + new Date().toLocaleString() + ']', 'search>>[调用缓存]>>',req.query.ss,new Date()-time1,'ms');
	        res.json(data);
	        return ;//直接返回阻止向后运行
        }else{
        	console.log('[' + new Date().toLocaleString() + ']', 'search>>[缓存过期]>>',req.query.ss);
        	//清理缓存
        	clearCache()
        }
    }

    // 搜索
	var Re=new RegExp(req.query.ss, 'ig');//创建正则
	db_music.find({name:Re}).toArray((err,arr)=>{
		console.log('[' + new Date().toLocaleString() + ']', 'search>>[查询数据库-用时]>>',new Date()-time1,'ms')
		if(!arr.length){
			data.state=0;
			data.message='此歌被UFC偷走了.正在准备抢回来!!!'
			res.json(data);
			console.log('[' + new Date().toLocaleString() + ']', 'search>>[调用爬虫]>>',req.query.ss)
			//调用爬虫
			
			let text=req.query.ss
			pa_arr.push(text)
			exec('node pa '+text,()=>{
				console.log('[' + new Date().toLocaleString() + ']', 'search>>[爬取完成]>>',text)
				pa_arr.splice(pa_arr.indexOf(text),1)
				console.log('删除',text,pa_arr)
			})
		}else{
			data.data=arr
			//添加进缓存
			cache.set(req.query.ss,[new Date()-0,arr])
			res.json(data);
		}
	})
})






app.listen(1803,(err)=>{
	console.log('路由已经启动>>>')
});

}//main函数块级边界

process.on('SIGINT', () => {
    client.close();//断开数据库
    console.log('[' + new Date().toLocaleString() + ']'+'[退出成功]');
    process.exit();//关闭进程
});


function clearCache() {
	var time1=new Date()
	var arr=cache.keys()
	for(var i=0;i<arr.length;i++){
		if(cache.get(arr[i])[0]+cache_time > new Date()-0){
			cache.delete(arr[i])
			i--
		}
	}
	console.log('[' + new Date().toLocaleString() + ']', 'clearCache>>[触发清理缓存]>>',new Date()-time1,'ms')
}