import React, { Component } from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount, shallow } from 'enzyme';

import { name } from '../package.json';
import Icon, { size, NotImplementedError } from '../src/Icon';
import styles from '../src/styles.less';

const { expect } = chai;
chai.use(chaiEnzyme());

describe(name, () => {
  describe('Icon', () => {
    const secretContent = 'secret content';
    class MyIcon extends Icon {
      // eslint-disable-next-line class-methods-use-this
      getGlyphTemplate() {
        return () => (<div>{secretContent}</div>);
      }
    }

    describe('exports', () => {
      it('exports the React component, NotImplementedError, and size', () => {
        expect(Icon).to.not.be.undefined;
        expect(NotImplementedError).to.not.be.undefined;
        expect(size).to.not.be.undefined;

        expect(new Icon({ label: 'My icon' })).to.be.instanceOf(Component);
        expect(NotImplementedError).to.be.an.error;
        expect(Object.values(size)).to.deep.equal(['small', 'medium', 'large', 'xlarge']);
      });
    });

    it('throws an error if getGlyphTemplate is not overriden', () => {
      let error;
      try {
        shallow(<Icon label="My icon" />);
      } catch (e) {
        error = e;
      }
      expect(error).to.not.be.undefined;
      expect(error).to.be.instanceof(NotImplementedError);
    });

    it('should be possible to create an Icon via a subclass', () => {
      const myIcon = mount(<MyIcon label="My icon" />);
      expect(myIcon).to.have.text(secretContent);
    });

    it('should be able to create a component', () => {
      const wrapper = shallow(<MyIcon label="My icon" />);
      expect(wrapper).to.be.defined;
      expect(wrapper.instance()).to.be.instanceOf(Component);
    });

    describe('label property', () => {
      it('is accessed by getGlyphTemplate()', () => {
        class LabelIcon extends Icon {
          // eslint-disable-next-line class-methods-use-this
          getGlyphTemplate() {
            // eslint-disable-next-line react/prop-types
            return props => (<div>{props.label}</div>);
          }
        }
        const labelContent = 'label content';
        const wrapper = mount(<LabelIcon label={labelContent} />);
        expect(wrapper).to.have.text(labelContent);
      });
    });

    describe('size property', () => {
      Object.values(size).forEach((s) => {
        it(`with value ${s}`, () => {
          const wrapper = shallow(<MyIcon label="My icon" size={s} />);
          expect(wrapper).to.have.className(styles.locals[s]);
        });
      });
    });

    describe('onClick property', () => {
      it('should set a click handler', () => {
        const handler = sinon.spy();

        const wrapper = shallow(<MyIcon label="My icon" onClick={handler} />);
        expect(wrapper.prop('onClick')).to.equal(handler);

        wrapper.find('div').simulate('click');
        expect(handler).to.have.been.calledOnce;
      });
    });
  });
});
