import React from 'react';
import SizeDetector from '@atlaskit/size-detector';
import ResultBox from '../components/ResultBox';

export default (
  <SizeDetector>
    {
      ({ width, height }) => (
        <ResultBox>
          {width} x {height}
        </ResultBox>
      )
    }
  </SizeDetector>
);
