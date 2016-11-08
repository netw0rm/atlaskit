import inputStyles from './input-styles';

// Get the input
function getInput(elem) {
  return elem.querySelector('input');
}

// Get the input. If it doesn't exist, generate a new one.
function getOrCreateInput(elem) {
  let input = getInput(elem);
  if (!input) {
    const wrapper = document.createElement('div');
    wrapper.slot = 'input-slot';
    input = document.createElement('input');
    wrapper.appendChild(input);
    elem.appendChild(wrapper);
  }
  return input;
}

// Update the input element.
function updateInput(elem) {
  const input = getOrCreateInput(elem);
  input.style = inputStyles;
  input.disabled = elem.disabled;
  input.name = elem.name;
  input.placeholder = elem.placeholder;
  input.type = elem.type;
  input.slot = 'input-slot';
}

export {
  getInput,
  updateInput,
};
