function hasClass(component, className) {
  return Array.prototype.slice.call(component.classList).indexOf(className) > -1;
}

export default hasClass;
