import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Display from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Display />, document.getElementById('root'));
registerServiceWorker();
