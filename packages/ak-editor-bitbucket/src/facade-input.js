/* eslint-disable */
// Create a input field facade over a HTML element.
// This is useful when we want to integrate with legacy systems,
// where features were built with the assumption only form elements like input / textarea
// are used to capture user input.
// Example use case - for mentions and emoticons in Bibucket we use a facade input so autocomplete popups works.
export class FacadeInput {
  constructor(elem, options = {}) {
    // create an facade text field
    this.facade = document.createElement("input");

    // this is the element being facaded.
    this._elem = elem;

    this.initialValue = options.initialValue || "";
    this.prevValue = this.initialValue;
    this.classList = options.classList || [];

    this.shouldRemove = false;
    this.removed = false;

    this._attachToDOM();
  }

  _attachToDOM() {
    const el = this.facade;
    const elem = this._elem;

    if (this.classList && this.classList.length) {
      this.classList.forEach((cls) => {
        el.classList.add(cls);
      });
    }

    // apply styles of the current dom node
    const computedStyles = window.getComputedStyle(elem);
    for (let i = 0; i < computedStyles.length; i++) {
      const style = computedStyles[i];
      el.style[style] = computedStyles.getPropertyValue(style);
    }

    // set positioning
    const rect = elem.getBoundingClientRect();
    el.style.top = (window.scrollY + rect.top) + "px";
    el.style.left = (window.scrollX + rect.left) + "px";
    el.style.height = rect.height + "px";
    el.style.width = (rect.width + 100) + "px";
    el.style.position = "absolute";
    el.style.zIndex = "2000"; // FIXME: Should compute this, instead of hard-coding

    // append the element to the DOM
    document.body.appendChild(el);

    // set focus and initial value
    el.focus();
    el.value = this.initialValue;

    // remove the facade when the window is resized
    // FIXME: revisit positioning and resizing behavior
    window.addEventListener('resize', () => {
      if (this.removed) return;
      this._remove();
    });
  }

  _remove() {
    const el = this.facade;
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
    window.clearInterval(this._syncInterval);
    this.removed = true;
  }

  set sync(func) {
    if (typeof func !== "function") {
      throw 'sync should be a function';
    }

    this._syncFunc = func;

    // start syncing
    this._syncInterval = window.setInterval(this._sync.bind(this), 50);
  }

  _sync() {
    // if the facaded element is still no longer in the DOM,
    // remove the facade.
    const elem = this._elem;
    if (!elem.parentNode) {
      return this._remove();
    }

    // if the value hasn't changed we can return early.
    // However, if the facade is marked for removal,
    // remove it and end the business.
    const curValue = this.facade.value;
    if (curValue === this.prevValue) {
      if (this.shouldRemove) return this._remove();
      return;
    }

    // when marked for removal, we should clean up the trailing whitespaces
    const val = this.shouldRemove ? curValue.trim() : curValue;

    this._syncFunc(val);
    this.prevValue = val;

    if (this.shouldRemove) return this._remove();
  }
}
