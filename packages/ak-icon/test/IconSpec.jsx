import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount, shallow } from 'enzyme';

import { name } from '../package.json';
import Icon, { size, NotImplementedError } from '../src/Icon';
import Content from '../src/Content';
import Root from '../src/Root';

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

        expect(Icon).to.be.a.function;
        expect(NotImplementedError).to.be.an.error;
        expect(Object.values(size)).to.deep.equal(['small', 'medium', 'large', 'xlarge']);
      });
    });

    it('throws an error if getGlyphTemplate is not overriden', () => {
      let error;
      try {
        mount(<Icon label="My icon" />);
      } catch (e) {
        error = e;
      }
      expect(error).to.not.be.undefined;
      expect(error).to.be.instanceof(NotImplementedError);
    });

    it('should be possible to create an Icon via a subclass', () => {
      const myIcon = mount(<MyIcon label="My icon" />);
      expect(myIcon).to.have.html().match(new RegExp(secretContent));
    });

    it('should be able to create a component', () => {
      const wrapper = shallow(<MyIcon label="My icon" />);
      expect(wrapper).to.be.defined;
      expect(wrapper.find(Root)).to.have.lengthOf(1);
      expect(wrapper.find(Content)).to.have.lengthOf(1);
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
        const wrapper = shallow(<LabelIcon label={labelContent} />);
        expect(wrapper).to.have.html().match(new RegExp(labelContent));
      });
    });

    describe('size property', () => {
      it('is reflected to the Root', () => {
        const iconSize = size.small;
        const wrapper = shallow(<MyIcon label="My icon" size={iconSize} />);
        expect(wrapper.find(Root)).prop('size').to.equal(iconSize);
      });
    });

    describe('onClick property', () => {
      it('is reflected to the Root', () => {
        const clickHandler = () => {};
        const wrapper = shallow(<MyIcon label="My icon" onClick={clickHandler} />);
        expect(wrapper.find(Root)).prop('onClick').to.equal(clickHandler);
      });
    });
  });
});
