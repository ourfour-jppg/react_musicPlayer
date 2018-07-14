import React, { Component } from 'react';
import { connect } from 'react-redux';
import  './Settings.css';
import {
    Link
} from 'react-router-dom';
class App extends Component {
  constructor(props){
      super(props);
      this.state={
        login:false,
        user:''
      }
      // 将一键回弹放到redux上共设置页调用
        this.props.state.setTingRefresh=this.setTingRefresh.bind(this)
        // 将退出登录放到redux上共其他页调用
        this.props.state.endLogin=this.endLogin.bind(this)
        //页面跳转
        this.props.state.history=this.props.history

        this.props.state.playList=[]
        this.props.state.youlist=[]
    }
    // 刷新登录状态
  setTingRefresh(){
    console.log(document.cookie.indexOf('user_name='))
    if(document.cookie.indexOf('user_name=')>=0){
      var user=document.cookie.split('user_name=')[1].split('; ')[0]
        this.setState({
          login:true,
          user:user
        })
    }else {
        this.setState({
          login:false,
          user:''
        })
    }
    
  }
  // 链接被单击
  click(e){
    var target=e.target
    console.log(target.tagName)
    if(target.tagName!=='DIV' && target.tagName!=='UL'){
       console.log(target.tagName)
      this.props.state.settingBack()
    }
  }
  //触摸链接时
  touchstart(e){
    var target=e.target
    console.log(target.tagName)
    if(target.tagName!=='DIV' && target.tagName!=='UL'){
       console.log(target.parentNode)
      target.classList.add('active')
      setTimeout(()=>{
        target.classList.remove('active')
      },200)
    }
  }
  endLogin(){
    document.cookie='user_name=""; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    document.cookie='user_id=""; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie='user_exp=""; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie='user_gold=""; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    this.setTingRefresh()
  }
  render() {
     setTimeout(()=>{this.props.state.aa=0},1000)
    return (
        <div  id='setting' onClick={this.click.bind(this)}>
        <div className='login'>
        <span>
        </span>
        {
          this.state.login?
            <Link to='/me'> <i>{this.state.user}</i></Link>
          :
            <Link to='/login'> <i>登录或注册</i></Link>
        }
          </div>
          <ul onTouchStart={this.touchstart.bind(this)}>
            <Link to='/404'><i className='iconfont icon-youxiang'></i>消息中心 <em></em> </Link>
            <Link to='/theme'><i className='iconfont icon-yifu'></i>皮肤中心<em></em> </Link>
            <Link to='/me'><i className='iconfont icon-huiyuan'></i>会员中心<em></em> </Link>
            <Link to='/404'><i className='iconfont icon-yingyongshezhi'></i>音效配置<em></em> </Link>
            <Link to='/404'><i className='iconfont icon-gongju'></i>音乐工具<em></em> </Link>
            <Link to='/404'><i className='iconfont icon-icon--'></i>炫酷铃声<em></em> </Link>
            <Link to='/404'><i className='iconfont icon-naozhong'></i>定时关闭<em></em> </Link>
            <Link to='/404'><i className='iconfont icon-xiazai'></i>下载设置<em></em> </Link>
            <Link to='/404'><i className='iconfont icon-libao'></i>礼物领取<em></em> </Link>
          </ul>
          <div className='floor'>
            <Link to='/404'><i  className='iconfont icon-shezhi'></i>设置</Link>
            <Link to='/home' onClick={this.endLogin.bind(this)}><i className='iconfont icon-exit'></i>退出</Link>
          </div>
        </div>
    );
  }
}

export default connect(
  (state)=>{
    return {
        state: state
    }
}
)(App);
