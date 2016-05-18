import './style.less'; // import our css using es6 imports
import times from './add';

// create a 'sean-button'
export default (a, b) => {
  const theButton = document.createElement('span');

  theButton.classList.add('sean-button');
  theButton.innerHTML = `v3.2 ${a} x ${b} = ${times(a, b)}`;

  return theButton;
};

export function subtract(a, b) {
  return a - b;
}
