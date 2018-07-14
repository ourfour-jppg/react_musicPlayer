import React, {
	Component
} from 'react';
import { connect } from 'react-redux';
import{ createStore }from 'redux'
import $ from 'jquery'

import Lpopup from '../../components/Lpopup/Lpopup'

import './search.css'
class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowmain: true,
			newarr:[],
			newar1:[],
			song:[],
			aj:[]
		}
	}
	

	//点击标签进行搜索
	getText(num, e) {
		
		var a = e.target.innerText;
		document.querySelector('input').value = a;
		
		var ts = this
		$.ajax({
			type:"Get",
			url:"http://192.168.191.1:1803/api/search?ss="+a,
			data:{
				state:1,
			},
			success:function(data){
				var songdata = data.data;
				
				if(songdata.length === 0){
					alert("抱歉暂时没有数据")
				}else{
					if($.trim(a)){
					ts.state.newarr = songdata.filter(function(item,idx) {
                        //只要满足条件就返回
                        return item
                 	})
					console.log(ts.state.newarr)
					ts.setState({
						isShowmain:false
					})
//					ts.state.isShowmain = false
			
					var th = ts
					document.querySelector('.flow').onclick = function(){
						th.state.isShowmain = true
					}
				}
				}
			}
			
		})
		
		
	}
	
	//模糊搜索列表
	getInput(){
			var text = ''
			var se = this.state
			
				text = $('input').val();
				
				
				$.ajax({
					type:"get",
					url:"http://10.3.134.239:1803/api/search?ss="+text,
					async:true,
					state:1,
					data:{
						name:text
					},
					success:function(data){
						var songdata = data.data;
						
                		if(songdata.length === 0){
							document.querySelector('.s_suo').innerHTML = ''
						}else{
							if($.trim(text)){
							var html = songdata.filter(function(item) {
                        			//只要满足条件就返回
                        			return Object.keys(item).some(function(key) {
                            			return String(item[key]).toLowerCase().indexOf(text) > -1
                        			})
                  			})
							 document.querySelector('.s_suo').innerHTML = html.map(function(item){
            					return `<li><a>
            								<i class="iconfont icon-sousuo s_suole"></i><i class="s_suori">${item.name.split("-")[1]} ${item.name.split("-")[0]}</i>
            							</a></li>`
            								}).join('')
                				}else{
                					document.querySelector('.s_suo').innerHTML = ''
                				}
						}
					}
						
					
				})
			
		
			}
	//点击列表进行搜索
	getLitx(num, e){
			//初始化数组
			this.state.newar1.length = 0
			this.state.newarr.length = 0
			//获取列表中的关键字
			var text = e.target.innerText
			document.querySelector('input').value = text
			var tear = text.split(' ')[1]
			console.log(tear)
			
			var ts = this
			$.ajax({
			type:"Get",
			url:"http://192.168.191.1:1803/api/search?ss="+tear,
			data:{
				state:1,
			},
			success:function(data){
				var songdata = data.data;				
				if(songdata.length === 0){
					alert("抱歉暂时没有数据")
				}else{
					if($.trim(tear)){
					ts.state.newar1 = songdata.filter(function(item,idx) {
                        //只要满足条件就返回
                       return Object.keys(item).some(function(key) {
                            return String(item[key]).toLowerCase().indexOf(tear) > -1
                        })
                 	})
					
					document.querySelector('.s_song1').style.display = "block"
//					document.querySelector('.s_main').style.display = "none"
					ts.setState({
						isShowmain:false
					})
					document.querySelector('.s_suo').innerHTML = ''
					
					var th = ts
					document.querySelector('.flow').onclick = function(){
						document.querySelector('.s_song1').style.display = "none"
//						document.querySelector('.s_main').style.display = "block"
						
						ts.setState({
							isShowmain:true
						})
						document.querySelector('input').value = ''
					}
					songdata.length = 0;
				}
				}
				
			}
			
		})
			
	}
	componentDidMount () {
    		this.input.focus()
    		
    		this.props.state.isShowLpopup = this.state.isShowLpopup;
  	}
	getSgequ(e){
			
			if(e.target.className === "iconfont icon-gengduoxiao"){
				var name = e.target.parentNode.parentNode.children[0].children[0].innerText
				var sing = e.target.parentNode.parentNode.children[0].children[1].children[1].innerText
				var albu = e.target.parentNode.parentNode.children[0].children[1].children[0].innerText
			
				var song = {
					name:name,
					sing:sing,
					albu:albu
				}
				this.setState({
					isShowLpopup:true
				})
			}else{
				this.setState({
					isShowLpopup:false
				})
				song = {
					name:name,
					sing:sing,
					albu:albu
				}
			}
			this.state.song = song
			console.log(this.state.song)
			
		
	}
	end(){
		this.setState({
				isShowLpopup:false
			})
	}
	seeSong(){
		this.setState({
			isSong:this.state.song
		})
	}
	isPlay(e){
		console.log(e.target.tagName)
		if(e.target.tagName == "A"){
			var idx = e.target.parentNode.getAttribute("dataUrl")
			// console.log('this',this)
			this.props.state.playList.push(this.state.newarr[idx])
			this.props.state.setPlay(this.props.state.playList.length-1);
		}
		
	}
	render() {
		return(
			<div id='box'>
		<div className="s_top clearfix">
            <a className="s_top_l" href="#" onClick={()=>{this.props.state.history.push('/home')}}>
                <i className="iconfont icon-flow flow"></i>
            </a>
            <div className="s_top_r">
                <input type="text" ref={(input) => this.input = input} placeholder="给你推荐 Willow" onInput={this.getInput.bind(this)}/>
            </div>
            <div className="s_sou">
            	<ul className="s_suo" onClick={this.getLitx.bind(this,1)}>
            		
            	</ul>
            </div>
        </div>
			<div className="s_singer">
            	<a><i  className="iconfont icon-geshou ren"></i><i className="ics">歌手分类</i><i className="iconfont icon-xiangyou"></i></a>
        	</div>
        	<div className="s_main" style={{display:this.state.isShowmain?'block':'none'}}>
            	<h1>热门搜索</h1>
            	<ul className="s_selist" onClick={this.getText.bind(this,1)}>
                	<li><a href="#">镇魂</a></li>
                	<li><a href="#">周杰伦</a></li>
                	<li><a href="#">薛之谦</a></li>
                	<li><a href="#">毛不易</a></li>
                	<li><a href="#">乐华七子NEXT</a></li>
                	<li><a href="#">张学友</a></li>
                	<li><a href="#">退后</a></li>
                	<li><a href="#">走马</a></li>
                	<li><a href="#">陈奕迅</a></li>
                	<li><a href="#">Lady Gaga</a></li>
            	</ul>
        	</div>
        	<div className="s_song" style={{display:!this.state.isShowmain?'block':'none'}}>
        		<ul className="s_so">
        			{(function(self){
        				return self.state.newarr.map(function(item,idx){
        					return <li dataUrl={idx}  onClick={self.isPlay.bind(self)}><a>
        								<div className="s_sole">
        									<h2>{item.name.split("-")[0]}</h2>
        									<h3><i>{item.name.split("-")[0]}</i> - <i>{item.name.split("-")[1]}</i></h3>
        								</div>
        								<div className="s_sori" onClick={self.getSgequ.bind(self)}>
        									<i className="iconfont icon-gengduoxiao"></i>
        								</div>
        							</a></li>
        				})
        			})(this)}
        		</ul>
        	</div>
        	<div className="s_song1">
        		<ul className="s_so1">
        			{(function(self){
        				return self.state.newar1.map(function(item,idx){
        					return <li dataUrl={idx} onClick={self.isPlay.bind(self)}><a>
        								<div className="s_sole">
        									<h2>{item.name.split("-")[0]}</h2>
        									<h3><i>{item.name.split("-")[0]}</i> - <i>{item.name.split("-")[1]}</i></h3>
        								</div>
        								<div className="s_sori" onClick={self.getSgequ.bind(self)}>
        									<i className="iconfont icon-gengduoxiao"></i>
        								</div>
        					</a></li>
        				})
        			})(this)}
        		</ul>
        	</div>
        	{this.state.isShowLpopup?<Lpopup end={this.end.bind(this)} list={this.state.song}/>:''} }
			
		</div>
		)
	}
}

export default connect((state) => {
	//他把store的state全部放到该组件的props里面
	return {
		state:state
	}
})(Search);