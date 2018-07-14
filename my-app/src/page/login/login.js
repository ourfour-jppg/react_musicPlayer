import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import './login.css';
import {
    Link
} from 'react-router-dom';
class App extends Component {
  constructor(props){
      super(props);
      this.state={
        skip:false
      }
    }
  click(){
    let input=$('#login ul input');
    let ts=$('#login .ts');
    let user=input.eq(0).val();
    let paswd=input.eq(1).val();
    console.log(this)
    $.post('http://192.168.191.1:1803/api/login',{ur:user,pr:paswd},(res)=>{
      if(res.state){
        console.log('登录成功',res)
        document.cookie='user_name='+res.data.user+'; Path=/;';
        document.cookie='user_id='+res.data._id+'; Path=/;';
        document.cookie='user_exp='+res.data.exp+'; Path=/;';
        document.cookie='user_gold='+res.data.gold+'; Path=/;';
        this.props.state.youlist=res.data.youlist;
        this.props.state.playList=res.data.youlist[0].data
        this.props.state.setTingRefresh()
        this.props.history.push('/home')
      }else{
        ts.text('信息核对不上,可能输入错误或没注册')
      }
    })

  }
  end(){
    this.props.history.goBack()
  }
  render() {
    console.log(this)
    return (
      <div id='login'>
          <div className='top'><i className='iconfont icon-quxiao' onClick={this.end.bind(this)}></i> <span>登录</span></div>
          <div className='yuan'>
            <span>
            </span>
          </div>
          <div className='ts'></div>
          <ul>
            <li><label><span>帐号:</span><input type="text" placeholder='用户名或手机号'/></label></li>
            <li><label><span>密码:</span><input type="password" /></label></li>
          </ul>
          <button onClick={this.click.bind(this)}>登录</button>
          <p>
            <Link to='/reg'>快速注册</Link>
            <Link to='/reg'>忘记密码</Link>
          </p>
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
