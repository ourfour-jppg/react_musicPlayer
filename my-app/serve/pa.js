var request = require('request')
var mongodb = require('mongodb')
var cheerio = require('cheerio')
var fs = require("fs");

var db, db_music, client;
///////////
//获取运行参数 //
///////////
if (process.argv.length > 2) {
    mongodb.connect('mongodb://localhost:27017/', function(err, client_) {
        if (err) {
            console.log('连接数据库失败')
            process.exit();//关闭进程
        } else {
            client=client_
            db = client.db('musicPlayer')
            db_music = db.collection('music')
            main(process.argv[2])
        }
    })
} else {
    console.log('没有接受参数')
}
///////
//主线 //
///////
function main(name) {
	name=encodeURI(name)
	// qq音乐搜索歌曲api
	let url='https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w='+name+'&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=2&n=50&p=1&remoteplace=txt.mqq.all&_=1520833663464'
	request.get(url,(err,res,body)=>{
		body=JSON.parse(body.slice(9,-1))
		if(body.code!=0){
			return ;//code不等于0则为错误,不执行爬取
		}
		//获取歌曲列表
		let lisp=body.data.song.list
		//遍历提取songmid拼接歌曲文件地址
		let lisp_song=[]
		ccc()
		async function ccc(){
			for(let i=0;i<lisp.length;i++){
				let data={
					name:lisp[i].songname+'-'+lisp[i].singer[0].name,
					url:'http://ws.stream.qqmusic.qq.com/C100'+lisp[i].songmid+'.m4a?fromtag=0&guid=126548448'
				}
				//等待promise执行完成
				await new Promise((resolve)=>{
					db_music.insertOne(data,(err,res)=>{
						resolve()
					})
				})
				lisp_song.push(data)
			}
			//打印数量
			console.log(lisp.length)
			client.close();//断开数据库
	    	process.exit();//关闭进程

		}
	})
}
process.on('SIGINT', () => {
    client.close();//断开数据库
    // console.log('[退出成功]');
    process.exit();//关闭进程
});