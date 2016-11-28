import chai, { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

import { InlineEdit } from '../src';
import EditingView from '../src/Editing';
import ViewingView from '../src/Viewing';

chai.use(chaiEnzyme());

describe('ak-inline-edit', () => {
  describe('properties', () => {
    describe('editing', () => {
      it('should render Editing view when set', () =>
        expect(shallow(<InlineEdit isEditing />))
          .to.have.descendants(EditingView)
      );

      it('should render ViewingView view when not set', () =>
        expect(shallow(<InlineEdit />))
          .to.have.descendants(ViewingView)
      );
    });
  });
});
