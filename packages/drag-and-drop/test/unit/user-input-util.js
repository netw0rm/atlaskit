import { ReactWrapper } from 'enzyme';

const primaryButton: number = 0;

export const dispatchWindowMouseEvent = (
  eventName: string,
  pageX?: number = 0,
  pageY?: number = 0,
  button?: number = primaryButton,
): MouseEvent => {
  const event = new window.MouseEvent(eventName, {
    bubbles: true,
    cancelable: true,
    view: window,
    pageX,
    pageY,
    button,
  });
  window.dispatchEvent(event);
  return event;
};

export const dispatchWindowKeyDownEvent = (
  key: string,
): KeyboardEvent => {
  const event = new window.KeyboardEvent('keydown', {
    bubbles: true,
    cancelable: true,
    key,
  });
  window.dispatchEvent(event);
  return event;
};

export const mouseEvent = (
  eventName: string,
  wrapper: ReactWrapper<any>,
  pageX?: number = 0,
  pageY?: number = 0,
  button?: number = primaryButton,
  options?: Object = {},
): void => {
  console.log('pageX', pageX, 'pageY', pageY);
  return wrapper.simulate(eventName, { button, pageX, pageY, test: pageX, clientX: 10, clientY: 10, ...options });
};

export const liftWithMouse = (
  wrapper: ReactWrapper<any>,
  pageX?: number = 0,
  pageY?: number = 0,
  button?: number = primaryButton,
  options?: Object = {},
): void =>
  wrapper.simulate('mousedown', { button, pageX, pageY, ...options });

export const withKeyboard = (key: string): Function =>
  (wrapper: ReactWrapper<any>, options?: Object = {}) =>
    wrapper.simulate('keydown', { key, ...options });
