import React, {
	Component
} from 'react';


import './pfooter.css';

import $ from 'jquery'


export default class Pfooter extends Component {
	constructor(props) {
		super(props);
		//类实例化，执行
		this.state = {
			timer:'',
		}
	} 
	componentDidMount(){	
		// 页面渲染完成后执行进度条方法 并且设置定时器没1s执行一次这个函数

		

		this.songBar();
		this.setState({
			timer:setInterval(this.songBar,1000),
			
		})
	}
	componentWillUnmount(){
		clearInterval(this.state.timer);
	}
	// 进度条时间与小球定位值函数
	songBar(){
		// 小圆球的left值为Audio的当前时间/总体时间*外边div长度

		//Audio当前时间
		let time = parseInt(document.querySelector('#myAudio').currentTime,10);
		//Audio总体时间
		let allTime = parseInt(document.querySelector('#myAudio').duration,10);

		//如果当前时间==总体事件清楚定时器

		$('#thisTime').css('left',(time/allTime)*$('.allTime').innerWidth());

		let min = parseInt(time/60,10);
		let sec = time%60;
		min = min>9 ? min : '0'+min;
		sec = sec>9 ? sec : '0'+sec;
		let str = '';
		str = min + ':' +sec;
		$('#nowTime').text(str);

	}
	togglePlay(){
		var myAudio = document.querySelector('#myAudio')
		// console.log($('.isPlay').attr('class'))
		// console.log(myAudio.paused)
		if(myAudio.paused){
			// 音乐播放 图标切换至播放 cd开始转动
			myAudio.play() 

			$('.isPlay').attr('class','iconfont icon-zanting isPlay')

			$(".playbody-cd").addClass('cd-rotate')			
		}else{
			// 音乐暂停 图标切换至暂停 cd停止转动
			myAudio.pause()

			$('.isPlay').attr('class','iconfont icon-iconset0481 isPlay')

			$(".playbody-cd").removeClass('cd-rotate')
		}
	}
	changeSong(e){
		var myAudio = document.querySelector('#myAudio')
		if(e.target.className === 'iconfont icon-shangyiqu101'){
			myAudio.src = 'http://59.37.84.4/mp3.9ku.com/m4a/183203.m4a'
			myAudio.play() 
		}
		if(e.target.className === 'iconfont icon-xiayiqu101'){
			myAudio.src = 'http://59.37.84.4/mp3.9ku.com/m4a/183203.m4a'
			myAudio.play() 
			console.log('下一曲')
		}
	}
	render(){
		return (
            <div className="playfooter">
				<div className="playTime">
					<div className="nowTime" id="nowTime">
						00:00
					</div>
					<div className="allTime" style={{flex:1,backgroundColor:"#ccc"}}>
						<span id="thisTime"></span>
					</div>
					<div className="endTime">
					{(function(){
						// 返回音频长度
						var timeLong = parseInt(document.querySelector('#myAudio').duration,10)
						var min = parseInt(timeLong/60,10);
						var sec = timeLong%60;
						min = min>9 ? min : '0'+min
						sec = sec>9 ? sec : '0'+sec
						var str = ''
						str = min + ':' +sec;

						return str
					})()}
					</div>
				</div>
				<div className="playSwitch" onClick={this.changeSong}>
					<div className="playSwitch-classify"><i className="iconfont icon-xunhuan"></i></div>
					<div className="playSwitch-change">
						<i className="iconfont icon-shangyiqu101" ></i>
						{/* 判断isPlay的值 */}
						<i className={document.querySelector('#myAudio').paused ? 'iconfont icon-iconset0481 isPlay':'iconfont icon-zanting isPlay'} onClick={this.togglePlay}></i>
						<i className="iconfont icon-xiayiqu101"></i>
					</div>
					<div className="playSwitch-classify"><i className="iconfont icon-liebiaozhankai"></i></div>
				</div>
            </div>
		)
	}
}