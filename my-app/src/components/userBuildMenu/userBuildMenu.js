import React ,{Component} from 'react'
import './userBuildMenu.css'
import UserBuildMenuList from '../userBuildMenuList/userBuildMenuList'
import UerBuildMenuSongs from '../uerBuildMenuSongs/uerBuildMenuSongs'
import { connect } from 'react-redux';
import $ from 'jquery';
class UserBuildMenu extends Component{
	constructor(props){
		super(props);
		this.state ={
			showList:true,
			isShowBuildMenu:false,
			userBuildMenuNum:0,
			newMenuName:'',
			menu:[],
			userId:'',
			isLogin:false
		}
	}
	componentWillMount(){
		var userBuildMenu = [];
		var userData = document.cookie;
		if(userData){
			var userId = userData.split("; ")[1].split("=")[1];//获取用户id
			
			var userBuildMenuNum = 0;
			var userBuildMenu =[];
			if(this.props.state.playList){
				userBuildMenu = this.props.state.youlist;
				userBuildMenuNum = userBuildMenu.length;
				
			}else{
				$.post('http://192.168.191.1:1803/api/youlist', {
					way: 'get',
					id: userId
				}, (res) => {
					console.log(res)
					var userBuildMenu;
					if(res.length>0){
						userBuildMenu = JSON.parse(res);
						userBuildMenuNum = userBuildMenu.length;
					}else{
						userBuildMenu=[];
						userBuildMenuNum = 0;
					}
				});		
			}
			this.setState({
				menu:userBuildMenu,
				userBuildMenuNum:userBuildMenuNum,
				userId:userId,
				isLogin:true
				
			});
		}else{
			this.setState({
				menu:[],
				userBuildMenuNum:0
			})
		}
	}
	toggleList(){
		this.setState({
			showList:!this.state.showList
		})
	}
	showBuildMenu(){
		this.setState({
			isShowBuildMenu:true
		})
	}
	cancelBuildMenu(){
		this.setState({
			isShowBuildMenu:false
		})
	}
	BuildAMenu(){//新建歌单
		if(this.state.isLogin){
			var newMenuName = $('input').val()
			console.log(newMenuName)
			this.setState({
				isShowBuildMenu:false,
			})
			var newMenu = {
				title:newMenuName,
				data:[]
			}
			if(this.props.state.youlist){
				this.props.state.youlist.push(newMenu)
				console.log(this.props.state.youlist)
			}
			$.post('http://192.168.191.1:1803/api/youlist', {
				way: 'set',
				id: this.state.userId,
				title:newMenuName
			}, (res) => {
				console.log('添加后的歌单youlist》》', res)
				this.setState({
					menu:res
				})
			});
		}else{
			alert('登陆后才能创建歌单')
		}
	}
	render(){
		return(
			<div id="userBuildMenu">
				<div id="toggleMenu" onClick={this.toggleList.bind(this)}>
					<i className={this.state.showList?"iconfont icon-xiala2":"iconfont icon-xiangyou"}></i>
					<span>创建的歌单({this.state.userBuildMenuNum})</span>
					<i className="iconfont icon-shezhi"></i>
				</div>
				{this.state.showList?<UserBuildMenuList menu={this.state.menu}/>:null}
				<div className="builMenu" onClick={this.showBuildMenu.bind(this)}><i className="iconfont icon-jia"></i><span>创建新歌单</span></div>
				{this.state.isShowBuildMenu?<div id="builNewMenu">
					<div className="builNewMenuBox">
						<h3>新建歌单</h3>
						<input placeholder="请输入歌单标题"/>
						<div className="confirm">
							<span onClick={this.cancelBuildMenu.bind(this)}>取消</span>
							<span onClick={this.BuildAMenu.bind(this)}>提交</span>
						</div>
					</div>
				</div>:null}
				
			</div>
		)
	}
}
export default connect((state) => {
	//他把store的state全部放到该组件的props里面
	return {
		state:state
	}
})(UserBuildMenu)
