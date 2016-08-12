import React from 'react';
import {render} from 'react-dom';
import App from './app';

require('./styles/main.scss');

render(<App />, document.getElementById('container'));
