import { ReactWrapper } from 'enzyme';

const primaryButton: number = 0;

export const dispatchWindowMouseEvent = (
  eventName: string,
  clientX?: number = 0,
  clientY?: number = 0,
  button?: number = primaryButton,
) => {
  const event = new window.MouseEvent(eventName, {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX,
    clientY,
    button,
  });
  window.dispatchEvent(event);
};

export const liftWithMouse = (wrapper: ReactWrapper<any>,
  clientX?: number = 0,
  clientY?: number = 0,
  button?: number = primaryButton,
  options?: Object = {},
): void =>
  wrapper.simulate('mousedown', { button, clientX, clientY, ...options });
