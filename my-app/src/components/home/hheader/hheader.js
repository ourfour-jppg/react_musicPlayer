import React, {
	Component
} from 'react';
import {Link} from 'react-router-dom'

import './hheader.css'

import { Flex } from 'antd-mobile';


export default class Hheader extends Component {
	constructor(props) {
		super(props);
		//类实例化，执行
		this.state = {
			
		}
	}
	render(){
		return (
			<div className="homeHeader">
                <div className="flex-container" style={{heighy:'100%'}}>
                    <Flex>
                        <Flex.Item>
                            <Link to="/home/home__menu"><i className="iconfont icon-icon-test"></i></Link>
                        </Flex.Item>
                        <Flex.Item>
                        </Flex.Item>
                        <Flex.Item>
                            <Link to="/home/userSongsMenu"><i className="iconfont icon-yinyue"></i></Link>
                        </Flex.Item>                           
                        <Flex.Item>
                            <Link to="/home/song_menu"><i className="iconfont icon-iconset04100"></i></Link>
                        </Flex.Item>
                        <Flex.Item>    
                            <Link to="/home/none_menu"><i className="iconfont icon-shipinbofangyingpian"></i></Link>
                        </Flex.Item>
                        <Flex.Item>
                        </Flex.Item>
                        <Flex.Item>
                            <Link to="/search">
                                <i className="iconfont icon-sousuo"></i>
                            </Link>
                        </Flex.Item>
                    </Flex>
                </div>
            </div>
		)
	}
}