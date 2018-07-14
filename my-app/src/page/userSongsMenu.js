import React ,{Component} from 'react'
import { Flex } from 'antd-mobile';
import MenuTypes from '../components/menuTypes/menuTypes';
import UserBuildMenu from '../components/userBuildMenu/userBuildMenu';
export default class UserSongsMenu extends Component{
	constructor(props){
		super(props);
		this.state = {
			isShowMenuTypeSongs:false,
			isShowUserBuildMenuSongs:false
		}
	}
	render(){
		return(
			<div id="userSongsMenu" style={{overflowX:'hidden',background:'#fff',height:'100%'}}>
				<div>
					<MenuTypes />
					<UserBuildMenu />
				</div>
			</div>
		)
	}
}
