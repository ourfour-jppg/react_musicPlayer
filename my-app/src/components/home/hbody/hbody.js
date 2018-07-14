import React, {
	Component
} from 'react';

import $ from 'jquery'

import './hbody.css'
import Hbanner from './hbanner/hbanner'
import Hrecommend from './hrecommend/hrecommend'
import Hclassify from './hclassify/hclassify'


export default class Hbody extends Component {
	constructor(props) {
		super(props);
		//类实例化，执行
		this.state = {	
			banner:[],
			Block:'123'
			
		}
	}
	componentDidMount(){
		$.get('http://192.168.191.1:1803/api/home',{},(res)=>{
			console.log(res.Block)
			var data = res;
			
			this.setState({
				banner:data.banner,
				Block:data.Block
			},()=>{
				console.log(this.state)
			})
			// console.log('原本',this.state.playList)
		})
		console.log(this.state)
	}

	render(){
		return (
			<div className="homebody">
                <Hbanner banner={this.state.banner}/>
                <Hclassify />
				<Hrecommend Block={this.state.Block}/>
			</div>
		)
	}

}