import './src/less/style.less'; //import our css using es6 imports
import seanButton, {subtract} from './src/js/sean-button.js';

export default function(){
	var body = document.querySelector('body');

	var button = seanButton();
	body.appendChild(button);

	body.innerHTML += ' <--This is a Sean-Button<br><br><span class="blue">This should be styled from less!</span>' + subtract(2, 1);
}
