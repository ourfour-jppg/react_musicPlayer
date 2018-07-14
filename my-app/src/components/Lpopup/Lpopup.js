import React, { Component } from 'react';

import { connect } from 'react-redux';
import{ createStore }from 'redux'

import './Lpopup.css'
import Lcollect from '../Lcollect/Lcollect'

class Lpopup extends Component {
	constructor(props) {
		super(props);
		this.state={
        	arr:[]
      	}
	}
	componentDidMount () {
		
//		this.props.state.isSong =this.props.list		
		console.log(this.props.list)
		this.state.arr.push(this.props.list)
		console.log(this.state.arr)
		document.querySelector(".bo").innerHTML = this.state.arr.map(function(item){
			return `
					<div class="popup" >
					<h1>歌曲:${item.name}</h1>
					<ul class="sonlist">
						<li>
							<i class="ile iconfont icon-iconset0481"></i>
							<a class="iri">下一首播放</a>
						</li>
						<li>
							<i class="ile iconfont icon-jiarugedan"></i>
							<a class="iri collect">收藏到歌单</a>
						</li>
						<li>
							<i class="ile iconfont icon-xiazai"></i>
							<a class="iri">下载</a>
						</li>
						<li>
							<i class="ile iconfont icon-xiaoxi"></i>
							<a class="iri">评论(999+)</a>
						</li>
						<li>
							<i class="ile iconfont icon-fenxiang2"></i>
							<a class="iri">分享</a>
						</li>
						<li>
							<i class="ile iconfont icon-geshou"></i>
							<a class="iri">歌手:${item.sing}</a>
						</li>
						<li>
							<i class="ile iconfont icon-iconset04100"></i>
							<a class="iri">专辑:${item.albu}</a>
						</li>
						<li>
							<i class="ile iconfont icon-shipinbofangyingpian"></i>
							<a class="iri">查看视频</a>
						</li>
					</ul>
				</div>
			`
		}).join("")
	}
	
	componentDidMount () {
    		this.props.state.isPalylist = this.state.isPalylist;
	}
	songDan(e){
		console.log(e.target)
		if(e.target.className === "iri collect"){
			alert('收藏')
			this.setState({
				isPalylist:true
			})
		}
	}
	ends(){
		this.setState({
			isPalylist:false
		})
	}
	render() {

		return (
		<div>
			<div onClick={this.songDan.bind(this)}>
			<div className="bo" style={{
				}} onClick={this.props.end}>
			
				<div className="popup" >
					<h1>歌曲:时间飞行(超级网剧《镇魂》推广曲)</h1>
					<ul className="sonlist">
						<li>
							<i className="ile iconfont icon-iconset0481"></i>
							<a className="iri">下一首播放</a>
						</li>
						<li>
							<i className="ile iconfont icon-jiarugedan"></i>
							<a className="iri collect">收藏到歌单</a>
						</li>
						<li>
							<i className="ile iconfont icon-xiazai"></i>
							<a className="iri">下载</a>
						</li>
						<li>
							<i className="ile iconfont icon-xiaoxi"></i>
							<a className="iri">评论(999+)</a>
						</li>
						<li>
							<i className="ile iconfont icon-fenxiang2"></i>
							<a className="iri">分享</a>
						</li>
						<li>
							<i className="ile iconfont icon-geshou"></i>
							<a className="iri">歌手:白宇/朱一龙</a>
						</li>
						<li>
							<i className="ile iconfont icon-iconset04100"></i>
							<a className="iri">专辑:时间飞行</a>
						</li>
						<li>
							<i className="ile iconfont icon-shipinbofangyingpian"></i>
							<a className="iri">查看视频</a>
						</li>
					</ul>
				</div>
				</div>
				{this.state.isPalylist?<Lcollect ends={this.end.bind(this)}/>:''}
			</div>
			
		</div>
		)
	}
	
}


export default connect((state) => {
	//他把store的state全部放到该组件的props里面
	return {
		state:state
	}
	
})(Lpopup);

//export default Lpopup;