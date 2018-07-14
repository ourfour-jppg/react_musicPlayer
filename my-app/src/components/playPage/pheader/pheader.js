import React, {
	Component
} from 'react';

import './pheader.css'

export default class Pheader extends Component {
	constructor(props) {
		super(props);
		//类实例化，执行
		this.state = {
			
		}
	}
	componentDidMount(){
		console.log(this.props)
	}
	PlayBack(){
		this.props.playState()
	}
	render(){
		return (
			<div className="playheader">
                <div className="playBack" onClick={this.PlayBack.bind(this)}><i className="iconfont icon-fanhui"></i></div>
				<div className="playTitle">
					{/* <p>{this.props.playList[0].name}</p> */}
					<p>123</p>
				</div>
				<div className="playShare"><i className="iconfont icon-fenxiang2" style={{margin:'0 auto'}}></i></div>
            </div>
		)
	}
}