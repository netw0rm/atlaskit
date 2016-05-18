import './style.less'; // import our css using es6 imports
import seanButton, {subtract} from 'sean-button';

// create a 'joschable-header'
export default () => {
  const header = document.createElement('div');
  const button1 = seanButton(2, 3);
  const button2 = seanButton(9000, 1);

  header.classList.add('joschable-header');

  header.innerHTML += "header v1.0.0";
  header.appendChild(button1);
  header.appendChild(button2);

  return header;
};
