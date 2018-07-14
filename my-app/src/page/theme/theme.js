import React, {
	Component
} from 'react';

import { connect } from 'react-redux';
import $ from 'jquery'

import './theme.css'
class Theme extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}
	isCrerti(e){
		if(e.target.className === 'tui_lit'){
			var a = e.target.style.background
			document.querySelector('.t_top').style.background = a
	}
	
}
	componentDidMount () {
		var li = document.getElementsByTagName('li')
		for(var i=0;i<li.length;i++){
			(function(i){
			li[i].onclick= function(t){
				 for (var j = 0; j < li.length; j++) {
                    if(j === i) {
                    	li[0].children[2].className = ''
                    	li[j].children[2].setAttribute("class","iconfont icon-xuanze-duoxuan-tianchong duo")
                    }else {
                       	li[j].children[2].setAttribute("class","")
                    }
                }
			
			}
			})(i);
		}
	}
	
	render(){
		
		return (
			<div id="box">
				<div className="t_top">
					<span className="t_tle"><a><i className="iconfont icon-fanhui flow"></i></a><i>皮肤中心</i></span>
					<span className="t_tri"><a><i>我的</i></a></span>
				</div>
				<div className="t_main" onClick={this.isCrerti.bind(this)}>
				<div className="t_tuij">
					<h1>官方推荐</h1>
					<div className="tui_p">
						<ul className="tui_ul">
							<li>
								<div className="tui_lit" style={{background:'#DF4239'}}></div>
								<h2>热情红</h2>
								<b className = 'iconfont icon-xuanze-duoxuan-tianchong duo'></b>
							</li>
							<li>
								<div className="tui_lit" style={{background:'#7FFFAA'}}></div>
								<h2>碧绿玉</h2>
								<b></b>
							</li>
							<li>
								<div className="tui_lit" style={{background:'#4169E1'}}></div>
								<h2>皇家蓝</h2>
								<b></b>
							</li>
							<li>
								<div className="tui_lit" style={{background:'skyblue'}}></div>
								<h2>纯天蓝</h2>
								<b></b>
							</li>
						</ul>
					</div>
				</div>
				<div className="t_tuij">
					<h1>热门皮肤</h1>
					<div className="tui_p">
						<ul className="tui_ul">
							<li>
								<div className="tui_lit" style={{background:'#AFEEEE'}}></div>
								<h2>苍白翡翠绿</h2>
								<b></b>
							</li>
							<li>
								<div className="tui_lit" style={{background:'#FFA500'}}></div>
								<h2>橘子色</h2>
								<b></b>
							</li>
							<li>
								<div className="tui_lit" style={{background:'#D2691E'}}></div>
								<h2>巧克力色</h2>
								<b></b>
							</li>
							<li>
								<div className="tui_lit" style={{background:'#FF7F50'}}></div>
								<h2>海洋珊瑚色</h2>
								<b></b>
							</li>
						</ul>
					</div>
				</div>
				<div className="t_tuij">
					<h1>个性皮肤</h1>
					<div className="tui_p">
						<ul className="tui_ul">
							<li>
								<div className="tui_lit" style={{background:'#FF0000'}}></div>
								<h2>火热激情</h2>
								<b></b>
							</li>
							<li>
								<div className="tui_lit" style={{background:'#FFA07A'}}></div>
								<h2>浅鲜肉(鲑鱼)色</h2>
								<b></b>
							</li>
							<li>
								<div className="tui_lit" style={{background:'#008080'}}></div>
								<h2>水鸭蓝</h2>
								<b></b>
							</li>
							<li>
								<div className="tui_lit" style={{background:'#9400D3'}}></div>
								<h2>深紫罗兰情</h2>
								<b></b>
							</li>
						</ul>
					</div>
				</div>
				<div className="t_tuij">
					<h1>潮流皮肤</h1>
					<div className="tui_p">
						<ul className="tui_ul">
							<li>
								<div className="tui_lit" style={{background:'#DB7093'}}></div>
								<h2>苍白紫罗兰</h2>
								<b></b>
							</li>
							<li>
								<div className="tui_lit" style={{background:'#F0E68C'}}></div>
								<h2>卡布其</h2>
								<b></b>
							</li>
							<li>
								<div className="tui_lit" style={{background:'#DAA520'}}></div>
								<h2>秋麒麟</h2>
								<b></b>
							</li>
							<li>
								<div className="tui_lit" style={{background:'#FF6347'}}></div>
								<h2>薄雾玫瑰</h2>
								<b></b>
							</li>
						</ul>
					</div>
				</div>
				
				</div>
			</div>
		)
	}
}

export default Theme;