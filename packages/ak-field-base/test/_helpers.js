const createDefinition = dom => ({
  render() {
    return dom;
  },
});

// Creates a light DOM input, slots it into a components input-slot slot and returns the reference
// to the input
const insertLightDomInput = (component) => {
  const inputChild = document.createElement('input');
  inputChild.type = 'text';
  inputChild.slot = 'input-slot';
  component.appendChild(inputChild);

  return inputChild;
};

export { createDefinition, insertLightDomInput };
