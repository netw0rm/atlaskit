import './src/css/style.css'; //import our css using es6 imports
import seanButton from './src/js/sean-button.js';

var body = document.querySelector('body');
body.textContent = 'I can call es6 code: ' + seanButton();