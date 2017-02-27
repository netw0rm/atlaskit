import * as React from 'react';
import { expect } from 'chai';
import * as sinon from 'sinon';
import {toHumanReadableMediaSize} from '../../src/utils/index';

describe('toHumanReadableMediaSize', () => {
  it('should return no decimal places when the media size is less than 1 MB', () => {
    const bytes = 100000; // 97.66 kB
    expect(toHumanReadableMediaSize(bytes)).to.eql('98 kB');
  });

  it('should return one decimal place when the media size is greater than or equal to 1 MB', () => {
    const bytes = 100000000; // 95.37 MB
    expect(toHumanReadableMediaSize(bytes)).to.eql('95.4 MB');
  });
});
