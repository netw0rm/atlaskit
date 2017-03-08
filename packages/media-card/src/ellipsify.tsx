/* tslint:disable:variable-name */
import * as React from 'react';

export interface EllipsifyProps {
  text: string;
  lines: number;
  endLength?: number;
}

export const Ellipsify = (props: EllipsifyProps) : JSX.Element => {
  return <div className="ellipsed-text" ref={setEllipsis(props)} aria-label={props.text}>
           {props.text}
         </div>;
};

const setEllipsis = (props: EllipsifyProps) => (element: HTMLElement) => {
  if (!element) { return; }

  const maximumLines = props.lines;
  const height = element.getBoundingClientRect().height;
  const text = element.textContent as string;
  element.textContent = 'a';
  const lineHeight = element.getBoundingClientRect().height;
  const lineCount = height / lineHeight;
  const maximumHeight = lineHeight * maximumLines;

  if (lineCount <= maximumLines) {
    element.textContent = text;
    return;
  }

  let textContent = text;
  const endLength = typeof props.endLength === 'number' && props.endLength >= 0 ? props.endLength : 8;
  const beginningText = text.substr(0, text.length * maximumLines / lineCount - endLength);
  const endText = text.substr(text.length - endLength, endLength);
  element.textContent = textContent = `${beginningText}...${endText}`;
  const finalHeight = element.getBoundingClientRect().height;

  if (finalHeight > maximumHeight) {
    const adjustedBeginningText = beginningText.substr(0, beginningText.length - ((beginningText.length / maximumLines) * 0.25));
    textContent = `${adjustedBeginningText}...${endText}`;
  }

  delayRun(() => element.textContent = textContent);
};

const timeout = (fn) => window.setTimeout(fn, 1);
const delayRun = window.requestAnimationFrame || timeout;

export default Ellipsify;
