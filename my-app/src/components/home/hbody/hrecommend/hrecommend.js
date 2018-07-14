import React, {
	Component
} from 'react';

import './hrecommend.css';

import { Grid } from 'antd-mobile';

// const data1 = Array.from(new Array(6)).map(() => ({
//     icon: ' this.state.data[0].data.img',
// }));

export default class Hrecommend extends Component {
	constructor(props) {
        super(props);
        console.log(this.props)
		//类实例化，执行
		this.state = {	
            data:'',
            isShow:false
        }
        
	}
    end(){
        //子组件end()方法
        this.setState({
            isShow:true
        })
    }
    // name={item.data.title} list={item.data.data} end={self.end.bind(self)}
	render(){
        console.log(this.props.Block[0].data)
		return (
           <div>
                {/* {(function(){
                    return this.props.Block[0].data.map((item,idx)=>{ */}
                        {/* console.log(item.data) */}
                        {/* return */}
                        <div className="homerecommend">
                            <div className="homerecommend-title">推荐歌单<i className="iconfont icon-xiangyou"></i></div>
                                <Grid data={this.props.Block[0].data}
                                    columnNum={3}
                                    hasLine={false}
                                    itemStyle={{ height: '320px', margin:'16px 0'}}
                                    renderItem={dataItem => (
                                        <div >
                                        <img src={dataItem.img} style={{ width: '240px', height: '240px' , borderRadius:'10px'}} alt="" />
                                        <div style={{ color: '#888', fontSize: '24px', marginTop: '14px' , padding:'0 6px'}}>
                                            <span style={{display:'block', height:'54px' ,overflow:'hidden',textAlign:'left'}}>{dataItem.data.title}</span>
                                        </div>
                                        </div>
                                    )}
                                />
                        {/* <Haha name={item.data.title} list={item.data.data} end={self.end.bind(self)}/> */}
                        </div>
                    {/* })
                // })()} */}
          </div>
		)
	}
}