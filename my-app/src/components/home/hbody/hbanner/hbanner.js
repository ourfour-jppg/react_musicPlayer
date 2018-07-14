import React, {
	Component
} from 'react';

import  './hbanner.css';

import { Carousel, WingBlank } from 'antd-mobile';


export default class Hbody extends Component {
	constructor(props) {
		super(props);
		//类实例化，执行
		this.state = {
            data: [],
            imgHeight: 284
        }

	}

	componentDidUpdate(){
        // this.setState({
        //         data: this.props.banner
        //     });
    }
    componentDidMount() {
        // simulate img loading
        // console.log(this.props)
            // 
    }
    render() {
        return (
            <div className="homebanner">
                <WingBlank>
                    <Carousel
                        autoplay={true}
                        infinite
                    >
                        {this.props.banner.map(val => (
                        <a
                            key={val}
                            href=""
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                            src={`${val}`}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                                this.setState({ imgHeight: 'auto' });
                            }}
                            />
                        </a>
                        ))}
                    </Carousel>
                </WingBlank>
            </div>
        );
    }
}