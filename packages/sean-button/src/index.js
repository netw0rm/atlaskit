import './style.less'; // import our css using es6 imports
import add from './add';

// create a 'sean-button'
export default () => {
  const theButton = document.createElement('span');

  theButton.classList.add('sean-button');
  theButton.innerHTML = `1 + 4 = ${add(1, 4)}`;

  return theButton;
};

export function subtract(a, b) {
  return a - b;
}
