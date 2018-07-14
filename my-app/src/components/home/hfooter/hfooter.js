import React, {
	Component
} from 'react';
import { connect } from 'react-redux';

import $ from "jquery"

import './hfooter.css'

import PlayPage from '../../playPage/playPage';


class Footer extends Component {
	constructor(props) {
		super(props);
		//类实例化，执行
		this.state = {	
			play:false,
			isShow:false,
			haha:'123'
		}
	}
	componentDidMount(){
		console.log(this.state)
		console.log(this.props)
	}
	isPlay(){
		// 获取播放标签
		let $myAudio = $('#myAudio')[0]

		this.setState({
            play:!this.state.play
		})

		if(!this.state.play){
			$myAudio.play();
		}else{
			$myAudio.pause()	
		}
	}
	// cutList(){
		
	// }
	playState(){
		// 父子组件互相触发此函数改变播放图标状态
		this.setState({
			isShow:!this.state.isShow,
			play:!$('#myAudio')[0].paused
		})
		this.props.state.ui_mover(true)
		
	}
	start(e){
		if( e.target.className === 'songData' || e.target.className === 'songImgBox' || e.target.tagName === 'P'){
			this.setState({
				isShow:true
			}) 
			this.props.state.ui_mover(false)
		}
	}


	render(){
		return (
			<div className="homeFooter" onClick={this.start.bind(this)}>
				<div className="homeFooter-l">	
					<div className={this.state.play ? "songImgBox songImgRotate" : "songImgBox" } ></div>
					<div className="songData">
						{/* <p style={{fontSize:26}}>{this.state.playList[0].name}</p> */}
						<p>123</p>
					</div>
				</div>
				<div className="homeFooter-r">	
					<i className={this.state.play ? 'iconfont icon-zanting':'iconfont icon-iconset0481'} onClick={this.isPlay.bind(this)} ></i>
					<i className="iconfont icon-aixin"></i>
				</div>
				{this.state.isShow ? <PlayPage playState={(this.playState).bind(this)} /> : ''}
            </div>
			
		)
	}
}

export default connect(
	(state)=>{
	  return {
		  state: state
	  }
  }
  )(Footer);