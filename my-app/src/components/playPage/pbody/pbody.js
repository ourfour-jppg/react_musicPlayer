import React, {
	Component
} from 'react';

import $ from 'jquery'

import './pbody.css'

export default class Pbody extends Component {
	constructor(props) {
		super(props);
		//类实例化，执行
		this.state = {
			
		}
	}
	componentDidMount(){	
		// 判断Audio是否播放
		var myAudio = document.querySelector('#myAudio')
		if(!myAudio.paused){
			$(".playbody-cd").addClass('cd-rotate')
		}
	}
	render(){
		return (
            <div className="playbody">
                <div className="playbody-cd">
					<div className="playbody-img">
						
					</div>	
				</div>
				<div className="playbody-classify">
					<div><i className="iconfont icon-aixin"></i></div>
					<div><i className="iconfont icon-xiazai"></i></div>
					<div><i className="iconfont icon-xiaoxi"></i></div>
					<div><i className="iconfont icon-gengduoxiao"></i></div>
				</div>
            </div>
		)
	}
}