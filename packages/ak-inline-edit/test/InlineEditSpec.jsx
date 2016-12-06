import chai, { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { InlineEdit } from '../src';
import EditView from '../src/Edit';
import ReadView from '../src/Read';
import ReadOnlyView from '../src/ReadOnly';

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

      it('should render ReadOnly view when no edit view is supplied', () =>
        expect(shallow(<InlineEdit {...defaultProps} editView={null} />))
          .to.have.descendants(ReadOnlyView)
      );

      it('should render ReadOnly view when no edit view is supplied when isEditing is set', () =>
        expect(shallow(<InlineEdit {...defaultProps} editView={null} isEditing />))
          .to.have.descendants(ReadOnlyView)
      );
    });
  });
});
