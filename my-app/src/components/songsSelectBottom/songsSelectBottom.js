import React , {Component} from 'react'
import './songsSelectBottom.css'
export default class SongsSelectBottom extends Component{
	render(){
		return(
			<div id="SongsSelectBottom">
				<ul>
                    <li><i class="iconfont icon-xiayiqu101"></i><span>下一首播放</span></li>
                    <li><i class="iconfont icon-tianjia"></i><span>加入歌单</span></li>
                    <li><i class="iconfont icon-xiazai1"></i><span>下载</span></li>
                    <li><i class="iconfont icon-shanchu"></i><span>删除</span></li>
                </ul>
			</div>
		)
	}
}