import React ,{Component} from 'react'
import './menuTypes.css'
import { connect } from 'react-redux';
import MenuTypeSongs from '../menuTypeSongs/menuTypeSongs'
import $ from 'jquery'
class MenuType extends Component{
	constructor(props){
		super(props);
		this.state ={
			showSongs:false,
			currentMenuName:'',
			myMusicNum:0,
			myRadioNum:0,
		}
	}
	componentWillMount(){
//"user_name=123; user_id=5b487009d7e22b35b850bf88; user_exp=0; user_gold=0"
		var userData = document.cookie;
		if(userData){
			var userId = userData.split("; ")[1].split("=")[1];//获取用户id
		
			if(this.props.state.playList){
				var playList = this.props.state.playList;
				var myMusicNum=0;
				playList.map((item)=>{
					myMusicNum=item.length;
				})
				this.setState({
					myMusicNum:myMusicNum,
				})
			}else{
				$.post('http://192.168.191.1:1803/api/youlist', {
					way: 'get',
					id: userId,
					title:'最近播放'
				}, (res) => {
					console.log(res)
					var listLength=0;
					if(res.length>0){
						var songsList = JSON.parse(res);
						listLength = songsList.length;
						console.log(listLength)
					}else{
						listLength = 0;
						console.log(listLength)
					}
					this.setState({
						myMusicNum:listLength
					})
					
				});		
			}
		}else{
//			this.setState({
//				myMusicNum:0
//			})
		}
		
	}
	showSongs(index){
		var currentMenuName = document.getElementsByTagName('em')[index].innerHTML;
		console.log(currentMenuName)
		this.setState({
			showSongs:true,
			currentMenuName:currentMenuName,
			currentIndex:index
		})
	}
	onChangeState(showSongs){
        this.setState(showSongs)
   }
	render(){
		return(
			<div id="menuTypes">
				<ul>
					<li onClick={this.showSongs.bind(this,0)}><a><i className="iconfont icon-yinyue menuTypesIcon"></i><p className="p0"><em>我的音乐</em><span>({this.state.myMusicNum})</span></p></a></li>
					<li onClick={this.showSongs.bind(this,1)}><a><i className="iconfont icon-iconset0481 menuTypesIcon"></i><p className="p0"><em>最近播放</em><span>({this.state.myMusicNum})</span></p></a></li>
					<li onClick={this.showSongs.bind(this,2)}><a><i className="iconfont icon-icon--1 menuTypesIcon"></i><p className="p0"><em>我的电台</em><span>(0)</span></p></a></li>
				</ul>
				{this.state.showSongs?<MenuTypeSongs onClicked={this.onChangeState.bind(this)} menuType={this.state.currentMenuName} currentIndex={this.state.currentIndex}/>:null}
			</div>
		)
	}
}
export default connect((state)=>{
	console.log(666)
	console.log(state)
	return {state:state}
})(MenuType)