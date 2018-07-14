import React, { Component } from 'react';
import $ from 'jquery'
import { connect } from 'react-redux';
import{ createStore }from 'redux'

import './Lcollect.css'



class Lcollect extends Component {
	constructor(props) {
		super(props);
		this.state={
        	
      	}
	}
	componentDidMount () {
		
	}
	render(){
		return (
			<div className="big" onClick={this.props.end}>
				<div className="min">
					<h1>收藏到歌单</h1>
					<ul className="danlist">
						<li>
							<div className="dan_le iconfont icon-jia"></div>
							<div className="dan_ri">新建歌单</div>
						</li>
						<li>
							<div className="dan_le iconfont icon-aixin"></div>
							<div className="dan_rii">
								<p className="danh1">我喜欢的音乐</p>
								<p className="danh2">99首</p>
							</div>
						</li>
					</ul>
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
})(Lcollect);