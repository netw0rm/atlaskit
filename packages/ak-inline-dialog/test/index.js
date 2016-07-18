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
    let component;
    expect(() => {
      component = new AkInlineDialog();
    }).not.to.throw(Error);
    expect(component.getAttribute('defined')).not.to.equal(null);
    expect(component.tagName.toLowerCase()).to.equal(name);
  });

  it('should be possible to set content to a component', () => {
    const component = new AkInlineDialog();
    const textContent = 'some text inside inline dialog';
    const htmlConent = '<div><h1>title</h1><p>Some text</p></div>';

    component.textContent = textContent;
    expect(component.textContent).to.equal(textContent);
    expect(component.innerHTML).to.equal(textContent);

    component.innerHTML = htmlConent;
    expect(component.innerHTML).to.equal(htmlConent);
  });

  it('event handlers inside a component should work', () => {
    const component = new AkInlineDialog();
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
    const component = new AkInlineDialog();

    expect(component.position).not.to.equal(null);
    expect(component.position).to.equal(defaultPosition);

    expect(component.attachment).not.to.equal(null);
    expect(component.attachment).to.equal('window');

    expect(component.open).not.to.equal(null);
    expect(component.open).to.equal(false);
  });

  it('all the properties should be attributes', () => {
    const props = {
      position: { value: 'top left', attr: 'position' },
      open: { value: true, attr: 'open' },
      target: { value: '#test', attr: 'target' },
      attachment: { value: 'scrollParent', attr: 'attachment' },
      renderElementTo: { value: 'body', attr: 'render-element-to' },
      boxShadow: { value: 'none', attr: 'box-shadow' },
      borderRadius: { value: '2px', attr: 'border-radius' },
      padding: { value: '2px', attr: 'padding' },
    };
    const component = new AkInlineDialog();

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

  describe('visibility', () => {
    let inlineDialogContainer;
    let component;

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
      expect(component.getBoundingClientRect().width).to.equal(0);
      expect(component.getBoundingClientRect().height).to.equal(0);
      expect(component.offsetParent).to.equal(null);
    });

    it('should be open when property `open` is set to true', () => {
      component.open = true;
      expect(component.getBoundingClientRect().width > 0).to.equal(true);
      expect(component.getBoundingClientRect().height > 0).to.equal(true);
      expect(component.offsetParent).not.to.equal(null);
    });

    it('should be open when attribute `open` is set to true', () => {
      component.setAttribute('open', true);
      expect(component.getBoundingClientRect().width > 0).to.equal(true);
      expect(component.getBoundingClientRect().height > 0).to.equal(true);
      expect(component.offsetParent).not.to.equal(null);
    });

    it('should be closed when property `open` is set to false', () => {
      // should be open first before attempts to close it
      component.open = true;

      component.open = false;
      expect(component.getBoundingClientRect().width).to.equal(0);
      expect(component.getBoundingClientRect().height).to.equal(0);
      expect(component.offsetParent).to.equal(null);
    });

    it('should be closed when attribute `open` is removed', () => {
      // should be open first before attempts to close it
      component.open = true;

      component.removeAttribute('open');
      expect(component.getBoundingClientRect().width).to.equal(0);
      expect(component.getBoundingClientRect().height).to.equal(0);
      expect(component.offsetParent).to.equal(null);
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
