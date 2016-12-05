import chai, { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import FieldBase from 'ak-field-base';
import Icon from 'ak-icon/glyph/edit';
import { locals as classes } from '../src/styles.less';

import ReadView from '../src/Read';

chai.use(chaiEnzyme());
chai.use(sinonChai);

const noop = () => {};

const defaultProps = {
  label: 'test',
  isFocused: false,
  onEditRequested: noop,
  children: 'test value',
};

describe('ak-inline-edit', () => {
  describe('Read View', () => {
    describe('defaults', () =>
      it('should render FieldBase and Icon', () => {
        const wrapper = shallow(<ReadView {...defaultProps} />);
        expect(wrapper).to.have.exactly(1).descendants(FieldBase);
        const fieldBase = wrapper.find(FieldBase);
        expect(fieldBase).to.have.exactly(1).descendants(Icon);
      })
    );

    describe('Icon', () => {
      it('should be rendered properly', () => {
        const wrapper = shallow(<ReadView {...defaultProps} />);
        expect(wrapper.find(FieldBase).find(`.${classes.editButton}`))
          .to.have.descendants(Icon);
      });
    });

    describe('children', () =>
      it('should be rendered properly', () => {
        const Content = () => <span id="child">test</span>;
        const wrapper = shallow(
          <ReadView {...defaultProps}>
            <Content />
          </ReadView>
        );
        expect(wrapper.find(FieldBase).find(`.${classes.readViewContentWrapper}`))
          .to.have.descendants(Content);
      })
    );

    describe('label', () =>
      it('should set parameter into FieldBase', () =>
        expect(shallow(<ReadView {...defaultProps} label="test" />).find(FieldBase))
          .to.have.prop('label', 'test')
      )
    );

    describe('isLabelHidden', () =>
      it('should set both hideLabel and label parameter into FieldBase', () => {
        const wrapper = shallow(<ReadView {...defaultProps} label="test" isLabelHidden />);
        const fieldBase = wrapper.find(FieldBase);
        expect(fieldBase).to.have.prop('label', 'test');
        expect(fieldBase).to.have.prop('hideLabel', true);
      })
    );

    describe('onEditRequested', () =>
      it('should be called when ReadView is clicked', () => {
        const spy = sinon.spy();
        const wrapper = shallow(
          <ReadView
            {...defaultProps}
            onEditRequested={spy}
          />
        );
        wrapper.find(`.${classes.readViewWrapper}`).simulate('click');
        expect(spy).to.have.been.calledOnce;
      })
    );
  });
});
