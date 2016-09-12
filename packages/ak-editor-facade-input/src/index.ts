/*
  Create a input field facade over a HTML element.
  This is useful when we want to integrate with legacy systems,
  where features were built with the assumption only form elements like input / textarea
  are used to capture user input.
  Example use case - for mentions and emoticons in Bibucket we use a facade input so autocomplete popups works.
*/

type syncer = (val: string, willRemove: boolean) => void;

interface facadeOptions {
  initialValue: string;
  classList: string[];
}

export default class FacadeInput {
  public removed: boolean;

  private facade: HTMLInputElement;
  private target: HTMLElement;
  private initialValue: string;
  private classList: string[];
  private prevValue: string;
  private shouldRemove: boolean;
  private syncInterval: number
  private syncFunc: syncer

  constructor(target: HTMLElement, options: facadeOptions) {
    this.facade = document.createElement("input");
    this.target = target;

    this.initialValue = options.initialValue || "";
    this.prevValue = this.initialValue;
    this.classList = options.classList || [];

    this.shouldRemove = false;
    this.removed = false;

    this.attachToDOM();
  }

  markForRemoval() {
    this.shouldRemove = true;
  }

  set onSync(func: syncer) {
    this.syncFunc = func;

    // start syncing
    this.syncInterval = window.setInterval(this.sync.bind(this), 50);
  }

  private attachToDOM() {
    const el = this.facade;
    const target = this.target;

    if (this.classList && this.classList.length) {
      this.classList.forEach((cls) => {
        el.classList.add(cls);
      });
    }

    // apply styles of the current dom node
    const computedStyles = window.getComputedStyle(target);
    for (let i = 0; i < computedStyles.length; i++) {
      const style = computedStyles[i];
      el.style[style as any] = computedStyles.getPropertyValue(style);
    }

    // set positioning
    const rect = target.getBoundingClientRect();
    el.style.top = (window.scrollY + rect.top) + "px";
    el.style.left = (window.scrollX + rect.left) + "px";
    el.style.height = rect.height + "px";
    el.style.width = (rect.width + 100) + "px";
    el.style.position = "absolute";
    el.style.zIndex = "1500"; // FIXME: Treating this as a stalker element (https://extranet.atlassian.com/display/FED/2011/02/11/Possible+solution+to+z-index+insanity)

    // append the element to the DOM
    document.body.appendChild(el);

    // set focus and initial value
    el.focus();
    el.value = this.initialValue;

    // remove the facade when the window is resized
    window.addEventListener('resize', () => {
      if (this.removed) return;
      this.remove();
    });
  }

  private remove() {
    const el = this.facade;
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
    window.clearInterval(this.syncInterval);
    this.removed = true;
  }

  private sync() {
    // If the target element is no longer in the DOM,
    // remove the facade.
    const target = this.target;
    if (!target.parentNode) {
      return this.remove();
    }

    // If the value hasn't changed we can return early.
    // However, if the facade is marked for removal,
    // we should remove it before returning.
    const curValue = this.facade.value;
    if (curValue === this.prevValue) {
      if (this.shouldRemove) {
        this.syncFunc(curValue, this.shouldRemove);
        return this.remove();
      }
      return;
    }

    // if marked for removal, clean up any trailing whitespaces
    const val = this.shouldRemove ? curValue.trim() : curValue;

    this.target.innerText = val;
    this.syncFunc(val, this.shouldRemove);
    this.prevValue = val;

    if (this.shouldRemove) {
      return this.remove();
    }
  }
}
