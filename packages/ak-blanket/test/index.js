import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import AkBlanket from '../src/index.js';
import { name } from '../package.json';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-blanket', () => {
  it('should be possible to create a component', () => {
    let component;
    expect(() => {
      component = new AkBlanket();
    }).not.to.throw(Error);
    expect(component.tagName.toLowerCase()).to.equal(name);
  });

  describe('general behaviour', () => {
    let component;

    beforeEach(() => {
      component = new AkBlanket();
    });

    it('should have all the default properties after creation', () => {
      expect(component.tinted).not.to.equal(null);
      expect(component.tinted).to.equal(false);

      expect(component.clickable).not.to.equal(null);
      expect(component.clickable).to.equal(false);
    });

    it('all the properties should be attributes', () => {
      const props = {
        tinted: { value: false, attr: 'tinted' },
        clickable: { value: false, attr: 'clickable' },
      };

      Object.keys(props).forEach((key) => {
        component[key] = props[key].value;
        expect(component[key]).not.to.equal(null);
        expect(component[key]).to.equal(props[key].value);

        const attr = component.getAttribute(props[key].attr);
        if (typeof props[key].value === 'boolean') {
          if (props[key].value === false) {
            expect(attr).to.equal(null);
          } else {
            expect(attr).to.equal('');
          }
        } else {
          expect(attr).to.equal(`${props[key].value}`);
        }
      });
    });
  });
});
