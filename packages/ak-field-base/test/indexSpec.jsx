import chai, { expect } from 'chai';
import React from 'react';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import { shallow, mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { FieldBase } from '../src';
import Content from '../src/Content';
import Label from '../src/Label';
import styles from '../src/styles.less';
import { compact, subtle } from '../src/internal/appearances';

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.use(chaiEnzyme());

describe('ak-field-base', () => {
  describe('by default', () =>
    it('should render a field base', () => {
      const wrapper = shallow(<FieldBase />);
      expect(wrapper).to.have.exactly(1).descendants(Label);
      expect(wrapper).to.have.exactly(1).descendants(Content);
      expect(wrapper.find(`.${styles.locals.root}`)).to.be.present();
    })
  );

  describe('properties', () => {
    [
      { prop: 'label', value: 'new label', element: Label },
      { prop: 'shouldHideLabel', value: true, element: Label },
      { prop: 'isInvalid', value: true, element: Content },
      { prop: 'isDisabled', value: true, element: Content },
      { prop: 'isRequired', value: true, element: Label },
      { prop: 'isFocused', value: true, element: Content },
      { prop: 'appearance', value: compact, element: Content },
      { prop: 'appearance', value: subtle, element: Content },
    ].forEach(setup =>
      describe(`${setup.prop} prop`, () =>
        it('should be reflected', () => {
          const wrapper = shallow(<FieldBase {...{ [setup.prop]: setup.value }} />);
          expect(wrapper.find(setup.element)).to.have.prop(setup.prop, setup.value);
        })
      )
    );
  });

  describe('children', () => {
    it('should render children inside Content', () => {
      const wrapper = shallow(<FieldBase><div id="child">test</div></FieldBase>);
      const content = wrapper.find(Content);
      expect(content).to.have.exactly(1).descendants('#child');
    });
  });

  describe('focus behaviour', () => {
    let wrapper;
    let content;

    beforeEach(() => {
      wrapper = mount(<FieldBase />);
      content = wrapper.find(Content);
      content.find(`.${styles.locals.content}`).simulate('focus');
    });

    it('should call onFocusCallback', () => {
      const spy = sinon.spy();
      wrapper = mount(<FieldBase onFocusCallback={spy} />);
      content = wrapper.find(Content);
      content.find(`.${styles.locals.content}`).simulate('focus');
      expect(spy).to.have.been.calledOnce;
    });

    it('should call onFocusCallback', () => {
      const spy = sinon.spy();
      wrapper = mount(<FieldBase onFocusCallback={spy} />);
      content = wrapper.find(Content);
      content.find(`.${styles.locals.content}`).simulate('focus');
      expect(spy).to.have.been.calledOnce;
    });

    it('should call onBlurCallback', () => {
      const spy = sinon.spy();
      wrapper = mount(<FieldBase onBlurCallback={spy} />);
      content = wrapper.find(Content);
      content.find(`.${styles.locals.content}`).simulate('blur');
      expect(spy).to.have.been.calledOnce;
    });
  });

  describe('labelClick event', () =>
    it('should call labelClick callback when the label span is clicked', () => {
      const spy = sinon.spy();
      const wrapper = mount(<FieldBase label="test" onLabelClick={spy} />);
      const label = wrapper.find(Label);
      label.find('span').simulate('click');
      expect(spy).to.have.been.calledOnce;
    })
  );
});
