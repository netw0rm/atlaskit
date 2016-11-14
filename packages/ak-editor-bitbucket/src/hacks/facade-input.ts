/*
  Create a input field facade over a HTML element.
  This is useful when we want to integrate with legacy systems,
  where features were built with the assumption only form elements like input / textarea
  are used to capture user input.
  Example use case - for mentions and emoticons in Bitbucket we use a facade input so autocomplete popups works.
*/

type syncer = (val: string, willRemove: boolean) => void;

interface FacadeOptions {
  initialValue: string;
  classList: Array<string>;
}

export default class FacadeInput {
  public removed: boolean;

  private facade: HTMLInputElement;
  private target: HTMLElement;
  private initialValue: string;
  private classList: Array<string>;
  private prevValue: string;
  private shouldRemove: boolean;
  private syncRequest: number;
  private syncFuncs: Array<syncer>;

  constructor(target: HTMLElement, options: FacadeOptions) {
    this.facade = document.createElement('input');
    this.target = target;

    this.initialValue = options.initialValue || '';
    this.prevValue = this.initialValue;
    this.classList = options.classList || [];

    this.shouldRemove = false;
    this.removed = false;
    this.syncFuncs = [];

    this.attachToDOM();
  }

  markForRemoval() {
    this.shouldRemove = true;
  }

  set onSync(func: syncer) {
    this.syncFuncs.push(func);

    // start syncing when the first event handler is attached
    if (this.syncFuncs.length === 1) {
      this.syncRequest = window.requestAnimationFrame(this.sync.bind(this));
    }
  }

  private attachToDOM() {
    const el = this.facade;
    const target = this.target;

    if (this.classList && this.classList.length) {
      this.classList.forEach(cls => {
        el.classList.add(cls);
      });
    }

    // apply styles of the current dom node
    const computedStyles = window.getComputedStyle(target);
    for (let i = 0; i < computedStyles.length; i++) {
      const style = computedStyles[i];
      el.style[style as any] = computedStyles.getPropertyValue(style);
    }

    const fontSize: number = parseInt(computedStyles['font-size' as any], 10);

    // set positioning
    const rect = target.getBoundingClientRect();
    el.style.top = `${window.scrollY + rect.top}px`;
    el.style.left = `${window.scrollX + rect.left}px`;
    el.style.height = `${rect.height}px`;
    el.style.width = `${rect.width + fontSize * 10}px`; // give leeway to add around 10 characters att current font size
    el.style.position = 'absolute';
    el.style.zIndex = '1500'; // FIXME: Treating this as a stalker element

    // append the element to the DOM
    document.body.appendChild(el);

    // set focus and initial value
    el.focus();
    el.value = this.initialValue;

    // remove the facade wwhen the window is resized
    window.addEventListener('resize', () => {
      if (this.removed) {
        return;
      }

      this.remove();
    });
  }

  private remove(): void {
    const el = this.facade;
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }

    window.cancelAnimationFrame(this.syncRequest);
    this.removed = true;
  }

  private callSyncFuncs(value: string, willRemove: boolean) {
    this.syncFuncs.forEach(syncFunc => {
      syncFunc(value, willRemove);
    });
  }

  private sync(): void {
    // Upon entering sync, request for another animation frame.
    this.syncRequest = window.requestAnimationFrame(this.sync.bind(this));

    // If the target element is no longeri n the DOM,
    // remove the facade
    if (!this.target.parentNode) {
      return this.remove();
    }

    // If the value hasn't changed we can return early.
    // However, if the facade is marked for removal,
    // we should remove it before returning
    const curValue = this.facade.value;
    if (curValue === this.prevValue) {
      if (this.shouldRemove) {
        this.callSyncFuncs(curValue, this.shouldRemove);
        this.remove();
      }
      return;
    }

    // if marked for removal, clean up any tailning whitespaces
    const val = this.shouldRemove ? curValue.trim() : curValue;

    this.target.innerText = val;
    this.callSyncFuncs(curValue, this.shouldRemove);
    this.prevValue = val;

    if (this.shouldRemove) {
      return this.remove();
    }
  }
}