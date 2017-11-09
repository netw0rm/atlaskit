// @flow
/* eslint-disable max-len */
import React, { Component } from 'react';

import { type Props, DefaultProps } from '../constants';
import Wrapper from '../styledWrapper';

const svg = `<canvas height="32" width="185" aria-hidden="true"></canvas>
<svg viewBox="0 0 185 32" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
  <g stroke="none" stroke-width="1" fill-rule="evenodd" fill="inherit">
    <path d="M5.07,18.956 C5.07,20.646 4.394,21.842 2.418,21.842 C1.56,21.842 0.702,21.686 9.1038288e-15,21.4 L9.1038288e-15,23.662 C0.65,23.896 1.586,24.104 2.808,24.104 C6.032,24.104 7.41,21.946 7.41,18.8 L7.41,6.918 L5.07,6.918 L5.07,18.956 Z M10.894,7.568 C10.894,8.556 11.544,9.128 12.454,9.128 C13.364,9.128 14.014,8.556 14.014,7.568 C14.014,6.58 13.364,6.008 12.454,6.008 C11.544,6.008 10.894,6.58 10.894,7.568 Z M11.31,24 L13.546,24 L13.546,11 L11.31,11 L11.31,24 Z M16.926,24 L19.11,24 L19.11,16.33 C19.11,13.574 20.852,12.716 23.712,13.002 L23.712,10.818 C21.164,10.662 19.864,11.754 19.11,13.288 L19.11,11 L16.926,11 L16.926,24 Z M34.45,24 L34.45,21.66 C33.618,23.376 32.058,24.26 30.056,24.26 C26.598,24.26 24.856,21.322 24.856,17.5 C24.856,13.834 26.676,10.74 30.316,10.74 C32.214,10.74 33.67,11.598 34.45,13.288 L34.45,11 L36.686,11 L36.686,24 L34.45,24 Z M27.092,17.5 C27.092,20.62 28.34,22.18 30.654,22.18 C32.656,22.18 34.45,20.906 34.45,18.02 L34.45,16.98 C34.45,14.094 32.812,12.82 30.914,12.82 C28.392,12.82 27.092,14.484 27.092,17.5 Z M55.926,19.294 C55.926,16.226 53.898,15.056 50.284,14.146 C47.268,13.392 46.176,12.69 46.176,11.286 C46.176,9.726 47.502,8.946 49.738,8.946 C51.506,8.946 53.352,9.258 55.068,10.246 L55.068,7.906 C53.898,7.256 52.312,6.658 49.842,6.658 C45.864,6.658 43.836,8.634 43.836,11.286 C43.836,14.094 45.552,15.42 49.4,16.356 C52.65,17.136 53.586,17.942 53.586,19.45 C53.586,20.958 52.624,21.972 50.05,21.972 C47.788,21.972 45.344,21.374 43.758,20.542 L43.758,22.934 C45.084,23.61 46.618,24.26 49.92,24.26 C54.158,24.26 55.926,22.258 55.926,19.294 Z M68.926,23.48 C67.86,24.052 66.222,24.26 64.896,24.26 C60.034,24.26 57.902,21.452 57.902,17.474 C57.902,13.548 60.086,10.74 64.038,10.74 C68.042,10.74 69.654,13.522 69.654,17.474 L69.654,18.488 L60.164,18.488 C60.476,20.698 61.906,22.128 64.974,22.128 C66.482,22.128 67.756,21.842 68.926,21.426 L68.926,23.48 Z M63.934,12.768 C61.568,12.768 60.372,14.302 60.138,16.564 L67.392,16.564 C67.262,14.146 66.17,12.768 63.934,12.768 Z M72.306,24 L74.49,24 L74.49,16.33 C74.49,13.574 76.232,12.716 79.092,13.002 L79.092,10.818 C76.544,10.662 75.244,11.754 74.49,13.288 L74.49,11 L72.306,11 L72.306,24 Z M84.604,24 L87.594,24 L92.638,11 L90.298,11 L86.112,22.102 L81.9,11 L79.56,11 L84.604,24 Z M94.146,7.568 C94.146,8.556 94.796,9.128 95.706,9.128 C96.616,9.128 97.266,8.556 97.266,7.568 C97.266,6.58 96.616,6.008 95.706,6.008 C94.796,6.008 94.146,6.58 94.146,7.568 Z M94.562,24 L96.798,24 L96.798,11 L94.562,11 L94.562,24 Z M109.356,21.66 C108.55,21.946 107.718,22.128 106.392,22.128 C102.986,22.128 101.582,19.996 101.582,17.474 C101.582,14.952 102.96,12.82 106.34,12.82 C107.562,12.82 108.446,13.054 109.278,13.444 L109.278,11.364 C108.264,10.896 107.354,10.74 106.184,10.74 C101.556,10.74 99.398,13.548 99.398,17.474 C99.398,21.452 101.556,24.26 106.184,24.26 C107.38,24.26 108.576,24.078 109.356,23.662 L109.356,21.66 Z M122.148,23.48 C121.082,24.052 119.444,24.26 118.118,24.26 C113.256,24.26 111.124,21.452 111.124,17.474 C111.124,13.548 113.308,10.74 117.26,10.74 C121.264,10.74 122.876,13.522 122.876,17.474 L122.876,18.488 L113.386,18.488 C113.698,20.698 115.128,22.128 118.196,22.128 C119.704,22.128 120.978,21.842 122.148,21.426 L122.148,23.48 Z M117.156,12.768 C114.79,12.768 113.594,14.302 113.36,16.564 L120.614,16.564 C120.484,14.146 119.392,12.768 117.156,12.768 Z M130.572,6.918 L136.864,6.918 C142.402,6.918 145.08,10.376 145.08,15.498 C145.08,20.672 142.376,24 136.864,24 L130.572,24 L130.572,6.918 Z M136.76,9.154 L132.912,9.154 L132.912,21.764 L136.89,21.764 C140.79,21.764 142.74,19.71 142.74,15.576 C142.74,11.416 140.894,9.154 136.76,9.154 Z M158.054,23.48 C156.988,24.052 155.35,24.26 154.024,24.26 C149.162,24.26 147.03,21.452 147.03,17.474 C147.03,13.548 149.214,10.74 153.166,10.74 C157.17,10.74 158.782,13.522 158.782,17.474 L158.782,18.488 L149.292,18.488 C149.604,20.698 151.034,22.128 154.102,22.128 C155.61,22.128 156.884,21.842 158.054,21.426 L158.054,23.48 Z M153.062,12.768 C150.696,12.768 149.5,14.302 149.266,16.564 L156.52,16.564 C156.39,14.146 155.298,12.768 153.062,12.768 Z M170.404,20.464 C170.404,18.202 168.948,17.136 166.062,16.434 C163.67,15.862 163.046,15.29 163.046,14.38 C163.046,13.366 163.93,12.794 165.568,12.794 C166.946,12.794 168.22,13.21 169.78,13.99 L169.78,11.676 C168.818,11.156 167.284,10.74 165.594,10.74 C162.63,10.74 160.888,12.118 160.888,14.38 C160.888,16.512 162.11,17.63 164.996,18.332 C167.466,18.93 168.22,19.502 168.22,20.49 C168.22,21.504 167.336,22.206 165.62,22.206 C163.982,22.206 162.11,21.582 160.992,20.932 L160.992,23.298 C161.98,23.818 163.566,24.26 165.516,24.26 C169,24.26 170.404,22.622 170.404,20.464 Z M175.214,24 L175.214,17.916 L180.934,24 L183.976,24 L177.606,17.396 L183.716,11 L180.804,11 L175.214,17.084 L175.214,5.566 L172.978,5.566 L172.978,24 L175.214,24 Z"></path>
  </g>
</svg>`;

export default class JiraServiceDeskWordmark extends Component<Props> {
  static defaultProps = DefaultProps;

  render() {
    const { label } = this.props;
    return (
      <Wrapper
        aria-label={label}
        dangerouslySetInnerHTML={{ __html: svg }}
        {...this.props}
      />
    );
  }
}
