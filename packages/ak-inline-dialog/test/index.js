import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import AkInlineDialog from '../src/index.js';
import { name } from '../package.json';
import { symbols } from 'skatejs';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;
const defaultPosition = 'right middle';

describe('ak-inline-dialog', () => {
  it('should be possible to create a component', () => {
    let component;
    expect(() => {
      component = new AkInlineDialog();
    }).not.to.throw(Error);
    expect(component.getAttribute('defined')).not.to.equal(null);
    expect(component.tagName.toLowerCase()).to.equal(name);
  });

  describe('general behaviour', () => {
    let component;

    beforeEach(() => {
      component = new AkInlineDialog();
    });

    it('should be possible to set content to a component', () => {
      const textContent = 'some text inside inline dialog';
      const htmlContent = '<div><h1>title</h1><p>Some text</p></div>';

      component.textContent = textContent;
      expect(component.textContent).to.equal(textContent);
      expect(component.innerHTML).to.equal(textContent);

      component.innerHTML = htmlContent;
      expect(component.innerHTML).to.equal(htmlContent);
    });

    it('event handlers inside a component should work', () => {
      const button = document.createElement('button');
      let clicked = false;
      const event = new CustomEvent('click', {});

      button.addEventListener('click', () => {
        clicked = true;
      });

      component.appendChild(button);
      button.dispatchEvent(event);
      expect(clicked).to.equal(true);
    });

    it('should have all the default properties after creation', () => {
      expect(component.position).not.to.equal(null);
      expect(component.position).to.equal(defaultPosition);

      expect(component.constrain).not.to.equal(null);
      expect(component.constrain).to.equal('window');

      expect(component.open).not.to.equal(null);
      expect(component.open).to.equal(false);
    });

    it('all the properties should be attributes', () => {
      const props = {
        position: { value: 'top left', attr: 'position' },
        open: { value: true, attr: 'open' },
        target: { value: '#test', attr: 'target' },
        constrain: { value: 'scrollParent', attr: 'constrain' },
        boxShadow: { value: 'none', attr: 'box-shadow' },
        borderRadius: { value: '2px', attr: 'border-radius' },
        padding: { value: '2px', attr: 'padding' },
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
          expect(attr).to.equal(props[key].value);
        }
      });
    });

    it('first child in the shadow dom should be layer component', () => {
      expect(component[symbols.shadowRoot]).not.to.equal(null);
      expect(component[symbols.shadowRoot].firstChild).not.to.equal(null);
      expect(component[symbols.shadowRoot].firstChild.tagName.toLowerCase()).to.equal('ak-layer');
    });
  });

  describe('visibility', () => {
    let inlineDialogContainer;
    let component;

    function checkInvisibility(elem) {
      expect(elem.getBoundingClientRect().width).to.equal(0);
      expect(elem.getBoundingClientRect().height).to.equal(0);
      expect(elem.offsetParent).to.equal(null);
    }

    function checkVisibility(elem) {
      expect(elem.getBoundingClientRect().width > 0).to.equal(true);
      expect(elem.getBoundingClientRect().height > 0).to.equal(true);
      expect(elem.offsetParent).not.to.equal(null);
    }

    beforeEach(() => {
      inlineDialogContainer = document.createElement('div');
      component = new AkInlineDialog();
      inlineDialogContainer.appendChild(component);
      document.body.appendChild(inlineDialogContainer);
    });

    afterEach(() => {
      document.body.removeChild(inlineDialogContainer);
    });

    it('should be closed by default', () => {
      expect(component.open).to.equal(false);
      expect(component.getAttribute('open')).not.to.equal(true);
      checkInvisibility(component);
    });

    it('should be open when property `open` is set to true', () => {
      component.open = true;
      checkVisibility(component);
    });

    it('should be open when attribute `open` is set to true', () => {
      component.setAttribute('open', true);
      checkVisibility(component);
    });

    it('should be closed when property `open` is set to false', () => {
      // should be open first before attempts to close it
      component.open = true;

      component.open = false;
      checkInvisibility(component);
    });

    it('should be closed when attribute `open` is removed', () => {
      // should be open first before attempts to close it
      component.open = true;

      component.removeAttribute('open');
      checkInvisibility(component);
    });

    it('attribute `open` and property `open` should be in sync', () => {
      component.open = true;
      expect(component.open).to.equal(true);
      expect(component.getAttribute('open')).to.equal('');

      component.open = false;
      expect(component.open).to.equal(false);
      expect(component.getAttribute('open')).to.equal(null);
    });
  });
});
