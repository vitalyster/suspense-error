import React from 'react';
import ReactDOM from 'react-dom';

import Main from './Main';

let container = document.createElement('div');
ReactDOM.render(<Main />, container);
let app = document.getElementById('app');
app.appendChild(container);
let renderedHeader = container.querySelector('#header');
app.querySelector('#header').replaceWith(renderedHeader);
app.querySelector('#wrapper').replaceWith(container.querySelector('#wrapper'));
