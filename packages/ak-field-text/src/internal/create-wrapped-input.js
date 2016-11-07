import inputStyles from './input-styles';
import getInput from './get-input';

export default (elem) => {
  let input = getInput(elem);
  if (!input) {
    const wrapper = document.createElement('div');
    wrapper.slot = 'input-slot';
    input = document.createElement('input');
    wrapper.appendChild(input);
    elem.appendChild(wrapper);
  }
  input.style = inputStyles;
  input.disabled = elem.disabled;
  input.name = elem.name;
  input.placeholder = elem.placeholder;
  input.type = elem.type;
  input.slot = 'input-slot';
};
