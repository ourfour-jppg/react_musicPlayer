import React ,{Component} from 'react'
import MenuTop from '../menuTop/menuTop'
import './uerBuildMenuSongs.css'
import { connect } from 'react-redux';
import $ from 'jquery'
class UerBuildMenuSongs extends Component{
	constructor(props){
		super(props);
		this.state = {
			songs:[],
			listLength:0,
			menuName:'',
			isShowConfirm:false,
			currentIndex:'',
			isLogin:false,
			userId:'',
			userName:''
		}
		
	}
	componentWillMount(){
		var menuName = this.props.menuType;
		console.log(menuName)
		var userData = document.cookie;
		
		if(userData){
			var userName = userData.split("; ")[0].split("=")[1]
			var userBuildMenu =[];
			var songsData=[];
			this.setState({
				isLogin:true,
				userName:userName
			})
			var userId = userData.split("; ")[1].split("=")[1];//获取用户id
			if(this.props.state.youlist){
				userBuildMenu = this.props.state.youlist;
				
			}else{
				$.post('http://192.168.191.1:1803/api/youlist', {
					way: 'get',
					id: userId
				}, (res) => {
					console.log(res)
					if(res.length>0){
						userBuildMenu = JSON.parse(res);
					}
				})
					
			}
			for(var i=0;i<userBuildMenu.length;i++){
				if(userBuildMenu[i].title==menuName){
		//			var songsData = userBuildMenu[i].data;
					userBuildMenu[i].data.map((item)=>{
						songsData.push(item);
					})
					break;
				}
			}
			console.log(songsData)
			this.setState({
				songs:songsData,
				listLength:songsData.length,
				menuName:menuName,
				userId:userId
			})
		}else{
			this.setState({
				isLogin:false
			})
		}
	}
	showConfirm(index){
		this.setState({
			currentIndex:index,
			isShowConfirm:true
		})
	}
	delList(){
		var index = this.state.currentIndex;//歌曲索引
		console.log(this.state.songs[index])
		var songsName = this.state.songs[index].name
		console.log(songsName)
		console.log(index)
		this.state.songs.splice(index,1)
		this.setState({
			songs:this.state.songs,
			isShowConfirm:false,
			listLength:this.state.listLength-1
		})
		var currentIndex = this.props.currentIndex;//歌单索引
		console.log(currentIndex)
		console.log(this.props.state.youlist)
		this.props.state.youlist[currentIndex].data = this.state.songs//修改youlist中对应歌单的数据
		console.log(this.props.state.youlist[currentIndex])
		$.post('http://192.168.191.1:1803/api/youlist', {
			way: 'delete',
			user_id: this.state.userId,
			title:this.state.menuName,
			name:songsName
		}, (res) => {
			console.log('删除后的用户歌单》》', res)
		});
	}
	cancelDelete(){
		this.setState({
			isShowConfirm:false,
		})
	}
	play(index){//播放歌曲
		// console.log(this)
		this.props.state.playList.push(this.state.songs[index]);
		this.props.state.setPlay(this.props.state.playList.length-1);
	}
	render(){
		return(
			<div id="uerBuildMenuSongs">
				<div style={{width:'100%'}}>
					<div id="menuTop">
						<i className="iconfont icon-flow" onClick={()=>this.props.onClicked({showListSongs: false})}></i>
						<span>歌单</span>
						<i className="iconfont icon-sousuo"></i>
						<i className="iconfont icon-gengduoxiao"></i>
					</div>
					<div id="introduce">
						<div className="introduce_l">
							<img src={require('../../img/menu1.png')} />
						</div>
						<div className="introduce_r">
							<p>{this.state.menuName}</p>
							<p><img />
							<span>{this.state.userName}</span>
							<i className="iconfont icon-xiangyou"></i></p>
						</div>
					</div>
					<div id="ListSongs">
						<div className="iconfont icon-iconset0481 ListSongs_t"><span>播放全部</span><span>(共{this.state.listLength}首)</span></div>
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
														<i className="iconfont icon-gengduoxiao" onClick={self.showConfirm.bind(self,index)}></i>
													</li>
										})
									})(this)
								}
							</ul>
							{this.state.isShowConfirm?<div id="confirmDiv">
								<div className="confirmBox">
									<p>确定将歌曲从列表中删除?</p>
									<div className="confirm">
										<span onClick={this.cancelDelete.bind(this)}>取消</span>
										<span onClick={this.delList.bind(this)}>删除</span>
									</div>
								</div>
							</div>:null}
						</div>:<div className="loginWarning"><h2>您还未登录，请先登录！</h2><div className="toLogin" onClick={this.toLogin.bind(this)}>登录或注册</div></div>}
					</div>
				</div>
			</div>
		)
	}
}
export default connect((state)=>{
	console.log(666)
	console.log(state)
	return {state:state}
})(UerBuildMenuSongs)
