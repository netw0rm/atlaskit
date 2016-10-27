import { action } from '@kadira/storybook';

export const handlers = {
  changeBefore(e) {
    e.preventDefault(e);
    action(`The item '${e.detail.textContent}' was selected, default behavior was prevented`)();
  },
  changeAfter(e) {
    e.preventDefault(e);
    action(`The item '${e.detail.textContent}' was selected, default behavior can't be prevented`)();
  },
  openBefore(e) {
    e.preventDefault(e);
    action('The dropdown is supposed to be open, but default behavior was prevented')();
  },
  openAfter(e) {
    e.preventDefault(e);
    action('The dropdown was open because default behavior can not be prevented')();
  },
  closeBefore(e) {
    e.preventDefault(e);
    action('The dropdown is supposed to be closed, but default behavior was prevented')();
  },
  closeAfter(e) {
    e.preventDefault(e);
    action('The dropdown was closed because default behavior can not be prevented')();
  },
};

export function removeAllTheListeners() {
  Object.entries(handlers).forEach(entry => window.removeEventListener(...entry));
}
