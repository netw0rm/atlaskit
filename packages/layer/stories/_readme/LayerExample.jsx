import React from 'react';
import Layer from '@atlaskit/layer';

const style = {
  content: {
    background: 'palevioletred',
    color: 'papayawhip',
    padding: '5px 10px',
  },
  target: {
    background: 'papayawhip',
    color: 'palevioletred',
    display: 'inline-block',
    marginLeft: '200px',
    padding: '30px',
    position: 'relative',
  },
};

const content = <div style={style.content}>Layer Content</div>;

export default (
  <Layer content={content}>
    <div style={style.target}>Target</div>
  </Layer>
);
