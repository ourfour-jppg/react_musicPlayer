import React, {
	Component
} from 'react';

import './hclassify.css'

export default class Hclassify extends Component {
	constructor(props) {
		super(props);
		//类实例化，执行
		this.state = {
            arr:[{
                className:'iconfont icon-icon--1',
                title:'私人FM'
            },{
                className:'iconfont icon-rili',
                title:'每日推荐'
            },{
                className:'iconfont icon-liebiao',
                title:'歌单'
            },{
                className:'iconfont icon-paixingbang',
                title:'排行榜'
            }]
		}
	}

	render(){
		return (
			<div className="homeclassify" style={{display:'flex'}}>
                {(function(self) {
                    // 遍历state对象中的arr
                    return self.state.arr.map((item,index)=>{
                        return <div className="homeclassify-item" key={index} style={{flex:1}}>
                            <div className="homeclassify-item-logo"><i className={item.className}></i></div>
                            <p className="homeclassify-item-title">{item.title}</p>
                        </div>
                    })
                })(this)}
            </div>
		)
	}
}
