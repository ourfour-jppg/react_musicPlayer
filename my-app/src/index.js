import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import{ createStore }from 'redux'
import registerServiceWorker from './registerServiceWorker';

const store=createStore (fn)
// 初始化的state值
function fn() {
    return {
    	
    }
}
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
	,document.getElementById('root')
	);
registerServiceWorker();
