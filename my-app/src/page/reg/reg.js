import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import './reg.css';

class App extends Component {
  constructor(props){
    console.log(document.cookie)
      super(props);
      this.state={
        cc:11
      }
    }
  click(){
    let input=$('#reg ul input');
    let ts=$('#reg .ts')
    let phone=input.eq(0).val();
    let pr1=input.eq(1).val();
    let pr2=input.eq(2).val();
    if(!phone.match(/^1[1,2,3,7,8,5][\d]{9}$/ig)){
      ts.text('这个手机号打不通...Ծ‸ Ծ')
    }else if(!pr1.match(/^[\w]{6,16}$/ig)){
      ts.text('这个密码不符合要求换一个把Ծ‸ Ծ')
    }else if(pr1!==pr2){
      ts.text('哎呀!两个不一样的密码,晕了晕了(@﹏@)')
    }else{
      $.post('http://192.168.191.1:1803/api/reg',{phone:phone,pr:pr2},(res)=>{
        if(res.state){
        this.props.state.youlist=res.data.youlist;
        this.props.state.playList=res.data.youlist[0].data;
        this.props.state.playIndex=0
        console.log(res)
        document.cookie='user_name='+res.data.user+'; Path=/;';
        document.cookie='user_id='+res.data._id+'; Path=/;';
        document.cookie='user_exp='+res.data.exp+'; Path=/;';
        document.cookie='user_gold='+res.data.gold+'; Path=/;';
        this.props.state.youlist=res.data.youlist;
        this.props.state.playList=res.data.youlist[0].data
        this.props.state.setTingRefresh()
        this.props.history.push('/home')
          
        }else{
          ts.text('这个手机号已经在里面了可以直接登录哦^_^')
        }
      })
    }
  }
  end(){
    this.props.history.goBack()
  }
  Touchstart(){
    $('#reg ul input').eq(1).attr('type','text')
  }
  Touchend(){
    $('#reg ul input').eq(1).attr('type','password')
  }
  render() {
    return (
      <div id='reg'>
          <div className='top'><i className='iconfont icon-quxiao' onClick={this.end.bind(this)}></i> <span>手机号注册</span></div>
          <div className='ts'></div>
          <ul>
            <li><label><span>手机号</span><input type="text" placeholder='请输入手机号'/></label></li>
            <li><label><span>密码</span><input type="password" placeholder='6-16位字母/数字/符号'/><i className='iconfont icon-eye' onTouchStart={this.Touchstart} onTouchEnd={this.Touchend}></i></label></li>
            <li><label><span>确认密码</span><input type="password" placeholder='请再次输入密码'/></label></li>
          </ul>
          <button onClick={(this.click).bind(this)}>下一步</button>
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
