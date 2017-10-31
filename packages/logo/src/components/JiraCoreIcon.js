import React from 'react';
import uid from 'uid';

import LogoBase from './LogoBase';
import Wrapper from '../styled/Wrapper';

const svg = ({ iconGradientStart, iconGradientStop }) => {
  const id = uid();
  return `<canvas height="32" width="32"></canvas>
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient x1="17.1933086%" y1="20.0326493%" x2="88.2434944%" y2="53.9179104%" id="${id}">
        <stop stop-color="${iconGradientStart}" ${(iconGradientStart === 'inherit') ? 'stop-opacity="0.4"' : ''} offset="17%"></stop>
        <stop stop-color="${iconGradientStop}" offset="100%"></stop>
      </linearGradient>
    </defs>
    <g stroke="none" stroke-width="1" fill-rule="nonzero">
      <path d="M18.2102727,20.1745455 C18.2102727,24.4964247 21.8014375,28 26.2313636,28 L26.2313636,28 L26.2313636,12.4072727 L18.2102727,17.7672727 L18.2102727,20.1745455 Z" fill="url(#${id})"></path>
      <path d="M26.2313636,12.4072727 L26.2313636,5.16727273 C26.2305706,4.73654063 25.9859584,4.34146943 25.5955373,4.14035499 C25.2051163,3.93924054 24.7327587,3.96498483 24.3677273,4.20727273 L5.75,16.6072727 C8.24141839,20.1791399 13.2284911,21.1053472 16.8908182,18.6763636 L26.2313636,12.4072727 Z" fill="currentColor"></path>
    </g>
  </svg>`;
};

export default class AtlassianIcon extends LogoBase {
  render() {
    const { label, size, ...props } = this.props;
    return (
      <Wrapper
        aria-label={label}
        size={size}
        dangerouslySetInnerHTML={{ __html: svg(props) }}
        {...props}
      />
    );
  }
}
