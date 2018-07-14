import React ,{Component} from 'react'
import './menuTypeSongs.css'
//import SongsSelectBottom from '../songsSelectBottom/songsSelectBottom'
import { connect } from 'react-redux';
import $ from 'jquery';
class MenuTypeSongs extends Component{
	constructor(props){
		super(props);
		this.state = {
			songs:[],
			selectSongs:true,
			isChecked:[],//接收每一项的勾选状态（true或false）
			checkNum:0,//已勾选的数量
			isSelectAll:false,//是否全选
			songsNum:0,
			isShowConfirm:false,
			isShowSingleDeleteConfirm:false,
			currentIndex:'',
			isShowMenuTypeSongs:true,
			menuName:'',//歌单名,
			isLogin:false,//判断是否登陆
			userId:''
		}
		
	}
	componentWillMount(){
		var isChecked = [];
		var songsData =[]
		var menuName = this.props.menuType;
		this.setState({
			menuName:menuName
		})
		var userData = document.cookie;
		if(userData){
			this.setState({
				isLogin:true
			})
			var userId = userData.split("; ")[1].split("=")[1];//获取用户id
			this.setState({
				userId:userId
			});
			if(this.props.state.playList){
				var playList = this.props.state.playList;
				var songsNum=0;
				if(playList.length>0){
					playList.map((item)=>{
						songsData.push(item)
					})
					songsNum = songsData.length;
				}
				for(var i=0;i<songsData.length;i++){
					isChecked.push(false)
					console.log(isChecked)
				}
				this.setState({
					songsNum:songsNum,
					songs:playList,
					isChecked:isChecked
				})
			}else{
				$.post('http://192.168.191.1:1803/api/youlist', {
					way: 'get',
					id: userId
				}, (res) => {
					console.log(res)
					var listLength;
					if(res.length>0){
						var songsList = JSON.parse(res);
						listLength = songsList.length;
						songsList.map((item,index)=>{
							songsData.push(item)
						});
						for(var i=0;i<songsData.length;i++){
							isChecked.push(false)
							console.log(isChecked)
						}
						this.setState({isChecked:isChecked})
					}else{
						listLength = 0;
					}
					this.setState({
						myMusicNum:listLength
					})
					
				});		
			}
		}else{
			this.setState({
				songsNum:0
			})
		}
	}
	delList(){//删除当前歌曲
		console.log(666)
		var index = this.state.currentIndex;//歌曲索引
		var songsName = this.state.songs[index].name
		var currentIndex = this.props.currentIndex;//歌单索引
		console.log(currentIndex)
		this.state.songs.splice(this.state.currentIndex,1)
		this.setState({
			songs:this.state.songs,
			isShowSingleDeleteConfirm:false,
			songsNum:this.state.songsNum-1
		})
		
		this.props.state.playList[currentIndex].data = this.state.songs
		console.log(this.props.state.playList[currentIndex])
		$.post('http://192.168.191.1:1803/api/youlist', {
			way: 'delete',
			user_id: this.state.userId,
//			title:this.state.menuName,
			name:songsName
		}, (res) => {
			console.log('删除后的用户歌单》》', res)
		});
		
	}
	cancelOneDelete(){
		this.setState({
			isShowSingleDeleteConfirm:false,
		})
	}
	showSingleDeleteConfirm(index){
		this.setState({
			isShowSingleDeleteConfirm:true,
			currentIndex:index
		})
	}
	clearAll(){//清空
		var currentIndex = this.props.currentIndex;//歌单索引
		this.props.state.playList[currentIndex].data =[]
		this.setState({
			songs:[],
			songsNum:0,
		})
		$.post('http://192.168.191.1:1803/api/youlist', {
			way: 'delete',
			user_id: this.state.userId,
//			title:this.state.menuName,
			data:'[]'
		}, (res) => {
			console.log('清空'+this.state.menuName+'歌单》》', res)
		});
	}
	selectSongs(){//编辑
		this.setState({
			selectSongs:false
		})
		console.log(666)
	}
	checkSongs(index,e){//勾选歌曲
		console.log(this.state.isChecked[index])
		var newIsChecked = this.state.isChecked;
		console.log(newIsChecked)
		newIsChecked[index]=!this.state.isChecked[index]
		console.log(newIsChecked)
		this.setState({
			isChecked:newIsChecked
		})
		console.log(this.state.isChecked)
		console.log(e.target)
		if(this.state.isChecked[index]){//实现勾选状态
			e.target.className='icon-xuanxiangkuangqueding iconfont checkbox'
		}else{
			e.target.className='iconfont icon-xuanxiangkuang checkbox'
		}
		console.log(index)
		var checkNum = 0;
//		var len = this.state.isChecked.length
		for(var i=0;i<this.state.isChecked.length;i++){
			if(this.state.isChecked[i]){
				checkNum++
			}
		}
		this.setState({
			checkNum:checkNum
		})
		console.log(checkNum)
		if(checkNum==this.state.isChecked.length){
			this.setState({
				isSelectAll:true
			})
		}else{
			this.setState({
				isSelectAll:false
			})
		}
	}
	selectAll(){//全选
		var isChecked =[]
		var checkbox = document.getElementsByClassName('checkbox');
		var len = checkbox.length;
		for(let i=0;i<len;i++){
			isChecked[i]=true
			checkbox[i].className='icon-xuanxiangkuangqueding iconfont checkbox'
			console.log(checkbox[i])
			console.log(666)
		}
//		this.refs.icon.className='icon-xuanxiangkuangqueding iconfont'
		console.log(isChecked)
		this.setState({
			isChecked:isChecked,
			checkNum:len,
			isSelectAll:true
		})
		console.log(this.state.isChecked)

	}
	selectNone(){//取消全选
		var isChecked =[]
		var checkbox = document.getElementsByClassName('checkbox');
//		var len = checkbox.length;
		for(let i=0;i<this.state.isChecked.length;i++){
			isChecked[i]=false
			checkbox[i].className='icon-xuanxiangkuang iconfont checkbox'
		}
		this.setState({
			isChecked:isChecked,
			checkNum:0,
			isSelectAll:false
		})
	}
	deleteSelect(){//删除已选歌曲
//		var songsArr = this.state.songs.filter(function(item) {
//					//返回select=false的数据
//					return !item.select
//				});
		var songsArr = [];
		var isChected = [];
		var len = this.state.songs.length;
		
		for(var i=0;i<len;i++){
			if(this.state.isChecked[i]===false){
//				songsArr.splice(i,1);
//				isChected.splice(i,1);
				songsArr.push(this.state.songs[i]);
				isChected.push(false)
			}
		}
		console.log(songsArr);
		console.log(isChected);
		this.setState({
			songs:songsArr,
			isChected:isChected,
			checkNum:0,
			isShowConfirm:false
		})
		var checkbox = document.getElementsByClassName('checkbox');
		var len = checkbox.length;
		for(let i=0;i<len;i++){
			checkbox[i].className='icon-xuanxiangkuang iconfont checkbox'
		}
		$.post('http://192.168.191.1:1803/api/youlist', {
					way: 'set',
					id: this.state.userId,
//					title:this.state.menuName,
					data:songsArr
				}, (res) => {
					console.log('添加后的歌单youlist》》', res)
				});
	}
	showConfirm(){
		this.setState({
			isShowConfirm:true,
		})
	}
	
	cancelDelete(){
		this.setState({
			isShowConfirm:false
		})
	}
	hiddenMenuTypeSongs(){//隐藏歌单中的歌曲列表
		this.setState({
			isShowMenuTypeSongs:false
		})
	}
	play(index){//播放歌曲
		this.props.state.playList.push(this.state.songs[index]);
		this.props.state.setPlay(this.props.state.playList.length-1);
	}
	toLogin(){
		console.log(this)
		this.props.state.history.push('/login')

	}
	render(){
		return(
			<div id="menuTypeSongs">
				{this.state.selectSongs?<div style={{width:'100%'}}>
					<div id="menuTop">
						<i className="iconfont icon-flow" onClick={()=>this.props.onClicked({showSongs: false})}></i>
						<span className="presentPlay">{this.props.menuType}</span>
						<span className="clearAll" onClick={this.clearAll.bind(this)}>清空</span>
					</div>
					<div id="playBar" className="iconfont icon-iconset0481 ListSongs_t">
						<span>播放全部</span>
						<span className="total">(共{this.state.songsNum}首)</span>
						<span className="chooseMore" onClick={this.selectSongs.bind(this)}><i className="iconfont icon-liebiao1"></i>&nbsp;多选</span>
					</div>
					<div id="ListSongs">
						{this.state.isLogin?<div className="listSongs">
							<ul className="songsList">
								{
									(function(self){
										return self.state.songs.map((item,index)=>{
											var arr = item.name.split('-');
											var songName = arr[0];
											var singerName = arr[1];
											return <li key={index}>
														<div className="index">{index+1}</div>
														<div className="name"><p className="songName">{songName}</p>
														<p className="singerName">{singerName}</p></div>
														<i className="play iconfont icon-shipinbofangyingpian" onClick={self.play.bind(self,index)}></i>
														<i className="iconfont icon-gengduoxiao" onClick={self.showSingleDeleteConfirm.bind(self,index)}></i>
													</li>
													
										})
									})(this)
								}
							</ul>
						</div>:<div className="loginWarning"><h2>您还未登录，请先登录！</h2><div className="toLogin" onClick={this.toLogin.bind(this)}>登录或注册</div></div>}
						{this.state.isShowSingleDeleteConfirm?<div id="confirmDiv">
														<div className="confirmBox">
															<p>确定将所选音乐从列表中删除?</p>
															<div className="confirm">
																<span onClick={this.cancelOneDelete.bind(this)}>取消</span>
																<span onClick={this.delList.bind(this)}>删除</span>
															</div>
														</div>
													</div>:null}
					</div>
				</div>:
				<div>
					<div id="menuTop">
						<i className="iconfont icon-flow" onClick={()=>this.props.onClicked({showSongs: false})}></i>
						<span className="presentPlay">已选择{this.state.checkNum}项</span>
						{!this.state.isSelectAll?<span className="checkAll clearAll" onClick={this.selectAll.bind(this)}>全选</span>:
						<span className="checkAll clearAll" onClick={this.selectNone.bind(this)}>取消全选</span>}
					</div>
					<div id="ListSongs">
						<div className="listSongs">
							<ul className="songsList">
								{
									(function(self){
										return self.state.songs.map((item,index)=>{
											var arr = item.name.split('-');
											var songName = arr[0];
											var singerName = arr[1];
											return <li key={index}>
														<div className="index"><i className="iconfont icon-xuanxiangkuang checkbox" onClick={self.checkSongs.bind(self,index)} ref="icon" data-id={index}></i></div>
														<div className="name"><p className="songName">{songName}</p>
														<p className="singerName">{singerName}</p></div>
													</li>
										})
									})(this)
								}
							</ul>
						</div>
					</div>
					<div id="SongsSelectBottom">
						<ul>
		                    <li><i className="iconfont icon-xiayiqu101"></i><span>下一首播放</span></li>
		                    <li><i className="iconfont icon-tianjia"></i><span>加入歌单</span></li>
		                    <li><i className="iconfont icon-xiazai1"></i><span>下载</span></li>
		                    <li onClick={this.showConfirm.bind(this)}><i className="iconfont icon-shanchu"></i><span>删除</span></li>
		                </ul>
					</div>
				</div>}
				{this.state.isShowConfirm?<div id="confirmDiv">
					<div className="confirmBox">
						<p>确定将所选音乐从列表中删除?</p>
						<div className="confirm">
							<span onClick={this.cancelDelete.bind(this)}>取消</span>
							<span onClick={this.deleteSelect.bind(this)}>删除</span>
						</div>
					</div>
				</div>:null}
			</div>
		)
	}
}
export default connect((state)=>{
	return {state:state}
})(MenuTypeSongs)