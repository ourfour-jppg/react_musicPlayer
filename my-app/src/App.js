import React, {Component} from 'react';
import {connect} from 'react-redux'
import load from './page/load';
import Settings from './page/Settings';
import home from './page/home';
import A404 from './page/404/404';
import login from './page/login/login';
import reg from './page/reg/reg';
import me from './components/me/me';
import search from './page/search/search';
import theme from './page/theme/theme';
import $ from 'jquery';
import './App.css';
import {
    BrowserRouter,
    Redirect,
    Route,
} from 'react-router-dom';

class App extends Component {
      constructor(props){
        $('body').css({background:'#013A89'})
        super(props)
        var href=window.location.href
        console.log(href.split('/').length)
        var a=href.split('/')
        if(a.length==4 && a[a.length-1]==''){
            window.location.href='./home'
        }
        this.state={
          setTings_width:window.innerWidth*0.7,
          ban:true
        }
        
      }
      //挂载完成
      componentDidMount(){
        this.setState({
            ul:$('#ul')
        })
        // 将一键回弹放到redux上共设置页调用
        this.props.state.settingBack=this.settingBack.bind(this)
        // 将一键开启放到redux上共设置页调用
        this.props.state.settingOpen=this.settingOpen.bind(this)
        // 将一键关闭放到redux上共设置页调用
        this.props.state.ui_mover=this.ui_mover.bind(this)


      }
      ui_mover(bl){
        this.setState({
            ban:bl
        },()=>{
            console.log(bl,this.state.ban)
        })

      }
      //手指按下
      touchstart (e,a,b){
        if(this.state.ban){
            var ul=this.state.ul
            this.setState({
                p:{
                left:ul.offset().left,
                x:e.nativeEvent.targetTouches[0].clientX,
                y:e.nativeEvent.targetTouches[0].clientY,
                },
                ul_home:$('#ul_home >div')
            })
            e.target.ontouchmove=this.touchmove.bind(this)
            e.target.ontouchend=this.touchend.bind(this)
        }
      }
      //手指移动
      touchmove(e,n){
        if(!n){
            // 移动后坐标减去之前按下坐标
            var _x=e.changedTouches[0].clientX-this.state.p.x;
            var _y=e.changedTouches[0].clientY-this.state.p.y
        }else{
            _x=n.x;
            _y=n.y;
        }
        // 如果移动的x距离大于y距离那么确定手势为打开设置页面
        // console.log('移动修正',Math.abs(_x),(this.state.setTings_width/5))
        if(Math.abs(_x)>Math.abs(_y) && Math.abs(_x)>(this.state.setTings_width/10)){
            var left=this.state.p.left+_x
            //左边界
            if(left>0 ){
                left=0
            }
            //右边界
            if(left<=-this.state.setTings_width){
                left=-this.state.setTings_width
            }
            // 移动ul
            this.state.ul.offset({left:left})
            // 中间页面缩放倍数计算
           var bs=Math.abs(left)/(this.state.setTings_width/2)/10+0.8
           this.state.ul_home.css({transform:'scale('+bs+')',float:'left'})
        }
      }
      // 手指松开
      touchend (e){
        // 清除事件
        e.target.ontouchmove=null
        e.target.ontouchend=null
        // 自动完成
        // console.log(e)
        var _x=e.changedTouches[0].clientX-this.state.p.x;
        var _y=e.changedTouches[0].clientY-this.state.p.y;
        if(Math.abs(_x)>Math.abs(_y) && Math.abs(_x)>(this.state.setTings_width/10)){
            if(_x>0){
                this.touchmove('',{x:_x+999,y:_y})
            }else{
                this.touchmove('',{x:_x-999,y:_y})
            }
        }
        
      }
      // 一键关闭
      settingBack(){
            this.state.ul_home.css({transform:''})
            this.state.ul.css({left:-this.state.setTings_width + 'px'})
      }
      // 一键打开
      settingOpen(){
            this.state.ul_home.css({transform:'scale(0.8)',float:'left'})
            this.state.ul.css({left:0+ 'px'})
      }
    render() {
        var fl = {
            float: 'left', 
            width: window.innerWidth + 'px', 
            height: '100%',
            position : 'relative'
        }
        var setTings = {
            float: 'left',
            width: this.state.setTings_width + 'px',
            height:'100%'   
        }
        var ul = {
            width: window.innerWidth * 3 + 'px',
            height: window.innerHeight + 'px',
            position: 'relative',
            left: -this.state.setTings_width + 'px',
            top: 0,
        }
        var div = {
            overflow: 'hidden',
            width: '100%',
            height: '100%',
        }
        return (
            <BrowserRouter>
                <div style={div}>
                    <ul style={ul} id='ul' onTouchStart={this.touchstart.bind(this)} >
                        <li style={setTings} className='setTings'>
                            <Route path="/" component={Settings}/>
                        </li>
                        <li style={fl} id='ul_home'>
                            <Route path="/home" component={home}/>
                            <Route path="/login" component={login}/>
                            <Route path="/404" component={A404}/>
                            <Route path="/me" component={me}/>
                            <Route path="/404" component={A404}/>
                            <Route path="/reg" component={reg}/>
                            <Route path="/search" component={search}/>
                            <Route path="/theme" component={theme}/>
                        </li>
                        <li style={fl}>
                            <Route path="/" component={load}/>
                        </li>
                    </ul>
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(
    (state) => {
        return {
            state: state
        }
    }
)(App);