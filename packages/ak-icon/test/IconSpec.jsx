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
      const icon = shallow(<MyIcon label="My icon" />);
      expect(icon).to.be.defined;
      expect(icon.find(Root)).to.have.lengthOf(1);
      expect(icon.find(Content)).to.have.lengthOf(1);
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
        const icon = shallow(<LabelIcon label={labelContent} />);
        expect(icon).to.have.html().match(new RegExp(labelContent));
      });
    });

    describe('size property', () => {
      it('is reflected to the Root', () => {
        const iconSize = size.small;
        const icon = shallow(<MyIcon label="My icon" size={iconSize} />);
        expect(icon.find(Root)).prop('size').to.equal(iconSize);
      });
    });

    describe('onClick property', () => {
      it('is reflected to the Root', () => {
        const clickHandler = () => {};
        const icon = shallow(<MyIcon label="My icon" onClick={clickHandler} />);
        expect(icon.find(Root)).prop('onClick').to.equal(clickHandler);
      });
    });
  });
});
