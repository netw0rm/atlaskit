import chai, { expect } from 'chai';
import React from 'react';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import Label from '../src/Label';
import { shallow } from 'enzyme';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());

describe('ak-field-base', () =>
  describe('Label', () => {
    describe('by default', () => {
      it('should render a label element', () =>
        expect(shallow(<Label />)).to.have.descendants('label')
      );
    });
  })
);
