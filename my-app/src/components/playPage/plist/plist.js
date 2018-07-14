import React, {
	Component
} from 'react';
// import { connect } from 'react-redux';

import $ from "jquery"

import './plist.css'


export default class Plist extends Component {
	constructor(props) {
		super(props);
		//类实例化，执行
		this.state = {	
			song:['演员-薛之谦1','演员-薛之谦2','演员-薛之谦3','演员-薛之谦4','演员-薛之谦5','演员-薛之谦6','演员-薛之谦7','演员-薛之谦8']
		}
	}
	componentDidMount(){
	
		console.log(this.props)
	}
	listState(e){
		console.log(e.target.className)
		if(e.target.className === 'pagelist'){
			console.log(123)
			this.props.listState()
		}	
	}
	render(){
		return (
			<div className="pagelist" onClick={this.listState.bind(this)}>
				<div className="pagelist-bg">  
					<div className="pagelist-title">
						<div className="pagelist-title-l"><i className="iconfont icon-suijibofang"></i><p>随机播放</p></div>
						<div className="pagelist-title-r">
							<i className="iconfont icon-aixin"></i>
							<i className="iconfont icon-aixin"></i>
							<i className="iconfont icon-aixin"></i>
						</div>
					</div>
					<div className="pagelist-content">
						<ul>
							{(function(self){
								return self.state.song.map((item,idx)=>{
									return <li key={idx}>
										<div className="songNum">
											<p>{idx+1}</p>
										</div>
										<div className="songName">
											<span>{item}</span>
											<i className="iconfont icon-aixin"></i>
										</div>
									</li>
								})
							})(this)}
						</ul>
					</div>
				</div>
            </div>	
		)
	}
}