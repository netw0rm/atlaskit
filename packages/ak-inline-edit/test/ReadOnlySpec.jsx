import chai, { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import { FieldBase } from 'ak-field-base';
import { locals as classes } from '../src/styles.less';
import ReadOnlyView from '../src/ReadOnly';

chai.use(chaiEnzyme());
chai.use(sinonChai);

const defaultProps = {
  label: 'test',
  isLabelHidden: true,
  children: 'test value',
};

describe('ak-inline-edit', () => {
  describe('ReadOnly View', () => {
    describe('defaults', () =>
      it('should render FieldBase', () => {
        const wrapper = shallow(<ReadOnlyView {...defaultProps} />);
        expect(wrapper).to.have.exactly(1).descendants(FieldBase);
      })
    );

    describe('children', () =>
      it('should be rendered properly', () => {
        const Content = () => <span id="child">test</span>;
        const wrapper = shallow(
          <ReadOnlyView {...defaultProps}>
            <Content />
          </ReadOnlyView>
        );
        expect(wrapper.find(FieldBase).find(`.${classes.readViewContentWrapper}`))
          .to.have.descendants(Content);
      })
    );

    describe('label', () =>
      it('should set parameter into FieldBase', () =>
        expect(shallow(<ReadOnlyView {...defaultProps} label="test" />).find(FieldBase))
          .to.have.prop('label', 'test')
      )
    );

    describe('isLabelHidden', () =>
      it('should set both isLabelHidden and label parameter into FieldBase', () => {
        const wrapper = shallow(<ReadOnlyView {...defaultProps} label="test" isLabelHidden />);
        const fieldBase = wrapper.find(FieldBase);
        expect(fieldBase).to.have.prop('label', 'test');
        expect(fieldBase).to.have.prop('isLabelHidden', true);
      })
    );
  });
});
