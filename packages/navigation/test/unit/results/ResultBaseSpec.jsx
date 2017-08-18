import React from 'react';
import { ResultBase } from '../../../src/components/js/results';
import { mountWithRootTheme } from '../_theme-util';

describe('Result Base', () => {
  let resultWrapper;
  beforeEach(() => {
    resultWrapper = mountWithRootTheme(
      <ResultBase resultId="testResult" type="base" name="test" />
    );
  });

  it('should pass `resultId` and `type` to onClick handler', () => {
    const spy = jest.fn();
    resultWrapper.setProps({ onClick: spy });
    resultWrapper.simulate('click');
    expect(spy).toBeCalledWith({ resultId: 'testResult', type: 'base' });
  });

  it('should pass `resultId` and `type` to onMouseEnter handler', () => {
    const spy = jest.fn();
    resultWrapper.setProps({ onMouseEnter: spy });
    resultWrapper.simulate('mouseenter');
    expect(spy).toBeCalledWith({ resultId: 'testResult', type: 'base' });
  });
});
