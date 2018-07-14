import React, {
	Component
} from 'react';

import './playPage.css'

import Pheader from './pheader/pheader'
import Pbody from './pbody/pbody'
import Pfooter from './pfooter/pfooter'
import Plist from './plist/plist'


export default class PlayPage extends Component {
	constructor(props) {
		super(props);
		//类实例化，执行
		this.state = {
			pageHeight:window.innerHeight,
			pageWidth:window.innerWidth,
			showList:false
		}
	}

	componentDidMount(){

	}
	listState(){
		// 父子组件互相触发此函数改变播放图标状态
		console.log(123)
		this.setState({
			showList:false,
		})
		
	}
	showList(e){
		console.log(e.target.className)
		if(e.target.className === 'iconfont icon-liebiaozhankai'){
			this.setState({
				showList:true
			}) 
		}
	}
	render(){
		return (
			<div className="playPage" style={{width:this.state.pageWidth,height:this.state.pageHeight }} onClick={this.showList.bind(this)}>
				<Pheader  playState={this.props.playState} />
				<Pbody />
				<Pfooter />
				{this.state.showList ? <Plist listState={(this.listState).bind(this)} /> : ''}
			</div>
		)
	}
}