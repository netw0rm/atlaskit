import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';

import { name } from '../package.json';
import Icon, { NotImplementedError } from '../src/Icon';

const { expect } = chai;
chai.use(chaiEnzyme());

describe(name, () => {
  describe('Icon', () => {
    it('should be a React component definition', () => {
      expect(Icon).to.be.a.function;
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
      const secret = 'secret';
      class MyIcon extends Icon {
        // eslint-disable-next-line class-methods-use-this
        getGlyphTemplate() {
          return () => (<div>{secret}</div>);
        }
      }

      const tempComponent = mount(<MyIcon label="My icon" />);
      expect(tempComponent).to.have.html().match(new RegExp(secret));
    });
  });
});
