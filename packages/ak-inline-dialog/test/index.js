import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import AkInlineDialog from '../src/index.js';
import { name } from '../package.json';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;
const defaultPosition = 'right middle';

describe('ak-inline-dialog', () => {
  it('should be possible to create a component', () => {
    const component = new AkInlineDialog();
    expect(component.tagName.toLowerCase()).to.equal(name);
  });

  describe('general behaviour', () => {
    let component;

    beforeEach(() => {
      component = new AkInlineDialog();
    });

    // TODO consider changing as this is overlapping quite a bit with Skate
    // behaviour that is already tested. In fact, this isn't testing what
    // it's supposed to be testing. Here it's testing standard DOM
    // behaviour because the component won't even have a shadow root yet.
    it('should be possible to set content to a component', () => {
      const textContent = 'some text inside inline dialog';
      const htmlContent = '<div><h1>title</h1><p>Some text</p></div>';

      component.textContent = textContent;
      expect(component.textContent).to.equal(textContent);
      expect(component.innerHTML).to.equal(textContent);

      component.innerHTML = htmlContent;
      expect(component.innerHTML).to.equal(htmlContent);
    });

    // TODO consider changing as this is overlapping quite a bit with Skate
    // behaviour that is already tested and with standard DOM behaviour.
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

    // TODO consider changing as this is overlapping quite a bit with Skate
    // behaviour that is already tested.
    it('should have all the default properties after creation', () => {
      expect(component.position).not.to.equal(null);
      expect(component.position).to.equal(defaultPosition);

      expect(component.constrain).not.to.equal(null);
      expect(component.constrain).to.equal('window');

      expect(component.open).not.to.equal(null);
      expect(component.open).to.equal(false);
    });

    // TODO consider changing as this is overlapping quite a bit with Skate
    // behaviour that is already tested.
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
  });

  describe('visibility', () => {
    let inlineDialogContainer;
    let component;
    let target;

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

    beforeEach(done => {
      target = document.createElement('div');
      target.setAttribute('id', 'target');
      target.style.width = '100px';
      target.style.height = '100px';
      inlineDialogContainer = document.createElement('div');
      component = new AkInlineDialog();
      inlineDialogContainer.appendChild(target);
      inlineDialogContainer.appendChild(component);
      document.body.appendChild(inlineDialogContainer);
      component.target = '#target';
      component.innerHTML = '<div><h1>title</h1><p>Some text</p></div>';
      setTimeout(done);
    });

    afterEach(() => {
      document.body.removeChild(inlineDialogContainer);
    });

    it('should be closed by default', () => {
      expect(component.open).to.equal(false);
      expect(component.hasAttribute('open')).to.equal(false);
      checkInvisibility(component.childNodes[0]);
    });

    it('should be open when property `open` is set to true', done => {
      component.open = true;
      setTimeout(() => {
        checkVisibility(component.childNodes[0]);
      });
      setTimeout(done);
    });

    it('should be open when attribute `open` is set to true', done => {
      component.setAttribute('open', '');
      setTimeout(() => checkVisibility(component.childNodes[0]));
      setTimeout(done);
    });

    describe('if open', () => {
      beforeEach(done => {
        component.open = true;
        setTimeout(done);
      });

      it('should be closed when property `open` is set to false', done => {
        setTimeout(() => checkVisibility(component.childNodes[0]));
        setTimeout(() => (component.open = false));
        setTimeout(() => checkInvisibility(component.childNodes[0]));
        setTimeout(done);
      });

      it('should be closed when attribute `open` is removed', done => {
        component.removeAttribute('open');
        setTimeout(() => checkInvisibility(component.childNodes[0]));
        setTimeout(done);
      });
    });

    // Consider removing as this is testing 100% skate behaviour. If we want to
    // ensure that an attribute is linked, we should test that we've correctly
    // declared the property on the component constructor.
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
