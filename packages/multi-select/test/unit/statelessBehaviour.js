import React from 'react';
import { mount } from 'enzyme';

import { StatelessMultiSelect } from '../../src';

import { name } from '../../package.json';

describe(`${name} - stateless`, function test() {
  this.timeout(5000);

  const animStub = window.cancelAnimationFrame;
  beforeEach(() => {
    window.cancelAnimationFrame = () => {};
  });

  afterEach(() => {
    window.cancelAnimationFrame = animStub;
  });

  describe('behavior', () => {
    let select;
    beforeEach(() => {
      select = mount(<StatelessMultiSelect />);
    });

    describe('focus', () => {
      it('should focus the input field if shouldFocus is set to true', () => {
        const input = select.find('input');
        expect(document.activeElement).not.to.equal(input.node);
        select.setProps({ shouldFocus: true });
        expect(document.activeElement).to.equal(input.node);
      });
    });
  });
});
