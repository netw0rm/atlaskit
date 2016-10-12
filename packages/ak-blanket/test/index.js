import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import AkBlanket, { events } from '../src';
import { name } from '../package.json';
import { Component } from 'skatejs';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-blanket', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      (new AkBlanket()).should.be.an.instanceof(Component);
    });

    it('should have an events export with defined events', () => {
      events.should.be.defined;
      Object.keys(events).should.be.deep.equal([
        'activate',
      ]);
    });
  });

  it('should be possible to create a component', () => {
    let component;
    expect(() => {
      component = new AkBlanket();
    }).not.to.throw(Error);
    expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
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
