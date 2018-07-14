import React ,{Component} from 'react'
import './me.css'
import { List } from 'antd-mobile';
import { connect } from 'react-redux';
import {HashRouter as Router,Route,Link} from 'react-router-dom';
const Item = List.Item;
const Brief = Item.Brief;
class Me extends Component{
	constructor(props){
		super(props);
		this.state = {
			picture:require('../../img/menu1.png'),
			isShowExit:false,
			userName:'',
			userId:'',
			userLevel:'',
			isLogin:false
		}
	}
	componentWillMount(){
		//"user_name=123; user_id=5b487009d7e22b35b850bf88; user_exp=0; user_gold=0"
		var userData = document.cookie;
		if(userData){
			var userName =userData.split("; ")[0].split("=")[1];
			var userId = userData.split("; ")[1].split("=")[1];//获取用户id
			var userLevel =userData.split("; ")[2].split("=")[1];
			this.setState({
				userName:userName,
				userId:userId,
				userLevel:userLevel,
				isLogin:true
			})
		}
	}
	exitConfirm(){
		this.setState({
			isShowExit:true
		})
	}
	cancel(){//取消
		this.setState({
			isShowExit:false
		})
	}
	exit(){//确定退出

		// var expires = new Date();
        // expires.setTime(expires.getTime() - 1000); //当前时间减去一秒,相当于立即过期(可以增减)
        // document.cookie = "user_id='';path=/;expires=" + expires.toGMTString() + ""; //expires是对应过期时间的
        // document.cookie = "user_name='';path=/;expires=" + expires.toGMTString() + "";
        // document.cookie = "user_exp='';path=/;expires=" + expires.toGMTString() + "";
        // document.cookie = "user_gold='';path=/;expires=" + expires.toGMTString() + "";
		this.setState({
			isShowExit:false,
			userName:'',
			userId:'',
			userLevel:'',
		})
		// 调用redux上的方法退出帐号
		this.props.state.endLogin()
		this.props.history.push('/home')
		
	}
	
	render(){
		return(
			<div id="me">
				<div>
					<div id="top">
						<Link to="/home"><i className="iconfont icon-fanhui" style={{color:'#fff'}}></i></Link>
						<span>账号设置</span>
						<i className="iconfont icon-tianjiahaoyou"></i>
					</div>
					<div id="aboutMe">
						<div className="aboutMe_l">
							<img src={this.state.picture}/>
						</div>
						<div className="aboutMe_r">
							<p>{this.state.userName}</p>
							<p>MusicID:{this.state.userId}</p>
							<p>LV.{this.state.userLevel}</p>
						</div>
					</div>
					<div id="main">
						<div><i className="icon1 iconfont icon-tongxunlu"></i><p><span>匹配通讯录</span><span className="right"><i className="toRightIcon icon-xiangyou iconfont"></i></span></p></div>
						<div><i className="icon1 iconfont icon-tongxunlu"></i><p><span>匹配通讯录</span><span className="right"><i className="toRightIcon icon-xiangyou iconfont"></i></span></p></div>
						<div><i className="icon1 iconfont icon-jinbi"></i><p><span>我的金币</span><span className="right"><i className="toRightIcon icon-xiangyou iconfont"></i></span></p></div>
						<div><i className="icon1 iconfont icon-huiyuan"></i><p><span>会员中心</span><span className="right"><i className="toRightIcon icon-xiangyou iconfont"></i></span></p></div>
						<div><i className="icon1 iconfont icon-shangchuan"></i><p><span>上传音乐作品</span><span className="right"><i className="toRightIcon icon-xiangyou iconfont"></i></span></p></div>
						<div><i className="icon1 iconfont icon-zidingyibiaodan"></i><p><span>已发布的歌单</span><span className="right"><i className="toRightIcon icon-xiangyou iconfont"></i></span></p></div>
						<div style={{height:'22px',background:'#F3F3F3'}}></div>
						<div><i className="icon1 iconfont icon-yinsi"></i><p><span>隐私设置</span><span className="right"><i className="toRightIcon icon-xiangyou iconfont"></i></span></p></div>
						<div><i className="icon1 iconfont icon-navicon-zhgnsz"></i><p><span>账号和绑定设置</span><span className="right"><i className="toRightIcon icon-xiangyou iconfont"></i></span></p></div>
					</div>
					<div id="bottom" onClick={this.exitConfirm.bind(this)}>退出账号</div>
					{this.state.isShowExit?<div id="exitWarning">
						<div className="exitWarningBox">
							<p>确定要退出当前账号?</p>
							<div className="confirm">
								<div onClick={this.cancel.bind(this)}>取消</div>
								<div onClick={this.exit.bind(this)}>确定</div>
							</div>
						</div>
					</div>:null}
				</div>
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
)(Me);
