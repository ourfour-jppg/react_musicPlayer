import React ,{Component} from 'react'
import UerBuildMenuSongs from '../uerBuildMenuSongs/uerBuildMenuSongs'
import { connect } from 'react-redux';
import $ from 'jquery';
class UserBuildMenuList extends Component{
	constructor(props){
		super(props);
		this.state= {
			menu:[],
			showListSongs:false,
			isShowDeleteMenuConfirm:false,
			currentMenuName:'',
			menuLogoSrc:require('../../img/menuLogo.jpg'),
			loveLogo:require('../../img/mylove.jpg'),
			currentIndex:''
		}
	}
	componentWillMount(){
		
		var userBuildMenu = this.props.menu;
		this.setState({menu:userBuildMenu});
		
	}
	componentDidMount(){
		if(this.state.menu.length>0){
			console.log(this.state.menu)
			var userLoveMenu = document.getElementsByClassName('menuListLi')[0];
			console.log(userLoveMenu)
			userLoveMenu.getElementsByTagName('img')[0].src=this.state.loveLogo;
			$('.icon-shanchu',userLoveMenu).remove()
		}
		
	}
	showUserLoveMusic(){
		var currentMenuName = document.getElementsByClassName('userLoveMusic')[0].innerHTML;
		this.setState({
			showListSongs:true,
			currentMenuName:currentMenuName
		})
	}
	showListSongs(index){
		var currentMenuName = document.getElementsByClassName('userBuildMenuName')[index].innerHTML;
		console.log(currentMenuName)
		this.setState({
			showListSongs:true,
			currentMenuName:currentMenuName,
			currentIndex:index
		})
		
	}
	delList(index){
		var currentMenuName = document.getElementsByClassName('userBuildMenuName')[index].innerHTML;
		this.state.menu.splice(index,1);
		this.setState({
			menu:this.state.menu,
			isShowDeleteMenuConfirm:false
		})
		if(this.props.state.youlist){
			this.props.state.youlist.splice(index,1)
			console.log(this.props.state.youlist)
		}
		
		var userId = document.cookie.split("; ")[1].split("=")[1];//获取用户id
		$.post('http://192.168.191.1:1803/api/youlist', {
			way: 'delete',
			user_id: userId,
			title:currentMenuName,
			data:'[]'
		}, (res) => {
			console.log('删除后的用户歌单》》', res)
		});
	}
	showDeleteMenuConfirm(){
		this.setState({
			isShowDeleteMenuConfirm:true
		})
	}
	cancelDelete(){
		this.setState({
			isShowDeleteMenuConfirm:false
		})
	}
	onChangeState(showListSongs){
        this.setState(showListSongs)
    }
	
	render(){
		return(
			<div id="userMenuList">
				<ul className="menuList">
					{
						(function(self){
							return self.state.menu.map((item,index)=>{
								return <li key={index} className="menuListLi">
											<div className="listImg" onClick={self.showListSongs.bind(self,index)}><img src={self.state.menuLogoSrc} /></div>
											<div className="title-num" onClick={self.showListSongs.bind(self,index)}><p className="userBuildMenuName">{item.title}</p>
											<p>{item.data.length}首</p></div>
											<i className="iconfont icon-shanchu" onClick={self.showDeleteMenuConfirm.bind(self)}></i>
											{self.state.isShowDeleteMenuConfirm?<div id="confirmDiv">
												<div className="confirmBox">
													<p>确定要删除该歌单?</p>
													<div className="confirm">
														<span onClick={self.cancelDelete.bind(self)}>取消</span>
														<span onClick={self.delList.bind(self,index)}>删除</span>
													</div>
												</div>
											</div>:null}
										</li>
							})
						})(this)
					}
				</ul>
				{this.state.showListSongs?<UerBuildMenuSongs onClicked={this.onChangeState.bind(this)} menuType={this.state.currentMenuName} currentIndex={this.state.currentIndex}/>:null}
				
			</div>
		)
	}
}
export default connect((state)=>{
	console.log(666)
	console.log(state)
	return {state:state}
})(UserBuildMenuList)