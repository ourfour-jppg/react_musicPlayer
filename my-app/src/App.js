import React, {Component} from 'react';
import {connect} from 'react-redux'
import load from './page/load';
import Settings from './page/Settings';
import home from './page/home';
import './App.css';
import {
    BrowserRouter,
    Route,
} from 'react-router-dom';

class App extends Component {
    render() {
        var fl = {float: 'left', width: window.innerWidth + 'px', height: '100%'}
        var setTings = {
            float: 'left',
            width: window.innerWidth + 'px'
        }
        var ul = {
            width: window.innerWidth * 3 + 'px',
            height: window.innerHeight + 'px',
            position: 'relative',
            left: -window.innerWidth + 'px',
            top: 0,
        }
        var div = {
            overflow: 'hidden',
            width: '100%',
            height: '100%',
        }
        // console.log(this.state.getState())
        return (
            <BrowserRouter>
                <div style={div}>
                    <ul style={ul} className='#ul'>
                        <li style={setTings} className='#setTings'>
                            <Route path="/" component={Settings}/>
                        </li>
                        <li style={fl}>
                            <Route path="/" component={home}/>
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