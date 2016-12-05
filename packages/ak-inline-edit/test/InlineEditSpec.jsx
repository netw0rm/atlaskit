import chai, { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { InlineEdit } from '../src';
import EditView from '../src/Edit';
import ReadView from '../src/Read';

chai.use(chaiEnzyme());

const noop = () => {};

const defaultProps = {
  label: 'test',
  isLabelHidden: true,
  isEditing: false,
  onEditRequested: noop,
  readView: 'test',
  editView: 'test',
};

describe('ak-inline-edit', () => {
  describe('properties', () => {
    describe('isEditing', () => {
      it('should render Edit view when set', () =>
        expect(shallow(<InlineEdit {...defaultProps} isEditing />))
          .to.have.descendants(EditView)
      );

      it('should render Read view when not set', () =>
        expect(shallow(<InlineEdit {...defaultProps} />))
          .to.have.descendants(ReadView)
      );
    });
  });
});
