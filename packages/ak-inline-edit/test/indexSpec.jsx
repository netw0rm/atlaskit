import chai, { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

import { InlineEdit } from '../src';
import EditView from '../src/Edit';
import ReadView from '../src/Read';

chai.use(chaiEnzyme());

describe('ak-inline-edit', () => {
  describe('properties', () => {
    describe('editing', () => {
      it('should render Edit view when set', () =>
        expect(shallow(<InlineEdit isEditing />))
          .to.have.descendants(EditView)
      );

      it('should render Read view when not set', () =>
        expect(shallow(<InlineEdit />))
          .to.have.descendants(ReadView)
      );
    });
  });
});
