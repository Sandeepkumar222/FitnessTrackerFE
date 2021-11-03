import React from 'react';
import ReactDOM from 'react-dom';
// import Counter from './componentClass';
// import CounterFunctional from './componentFunctional';
import App from './app'
// import DataR from './PostApp';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'

// const test = ()=> {
//   return <h1>Hello Counter inner function</h1>;
// }

ReactDOM.render( <>
<div className = "bg">
<App />
</div>
</>,
 document.getElementById('root'));
 