import inlineDialog from '../src/index';
const dialog = document.querySelector('ak-inline-dialog');
const button = document.querySelector('#button');

inlineDialog();

dialog.target = '#target';
dialog.position = 'right top';
// dialog.open = true;

button.addEventListener('click', () => {
  dialog.open = !dialog.open;
});
