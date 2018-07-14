import React ,{Component} from 'react'
import './menuTop.css'
export default class MenuTop extends Component{
	render(){
		return(
//			const closeList = this.props.end()点击icon-flow的时候关闭歌单列表
			<div id="menuTop">
				<i className="iconfont icon-flow" onClick={()=>this.props.onClicked({showList: false})}></i>
				<span>歌单</span>
				<i className="iconfont icon-sousuo"></i>
				<i className="iconfont icon-gengduoxiao"></i>
			</div>
		)
	}
}