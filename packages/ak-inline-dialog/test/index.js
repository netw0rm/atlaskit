import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import AkInlineDialog, { events } from '../src';
const { afterOpen: afterOpenEvent, afterClose: afterCloseEvent } = events;
import 'custom-event-polyfill';
import { name } from '../package.json';
import { events as blanketEvents } from 'ak-blanket';
const { activate: activateBlanketEvent } = blanketEvents;
import { afterMutations, getShadowRoot, checkVisibility, checkInvisibility }
  from 'akutil-common-test';
import { Component } from 'skatejs';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;
const defaultPosition = 'right middle';

describe('ak-inline-dialog', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      (new AkInlineDialog()).should.be.an.instanceof(Component);
    });

    it('should have an events export with defined events', () => {
      events.should.be.defined;
      Object.keys(events).should.be.deep.equal(['afterOpen', 'afterClose']);
    });
  });

  it('should be possible to create a component', () => {
    const component = new AkInlineDialog();
    expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
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
      document.body.appendChild(button);
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
        borderColor: { value: 'red', attr: 'border-color' },
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

    beforeEach((done) => {
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
      expect(checkInvisibility(component.childNodes[0])).to.equal(true);
    });

    it('should be open when property `open` is set to true', (done) => {
      component.open = true;
      setTimeout(() => {
        expect(checkVisibility(component.childNodes[0])).to.equal(true);
      });
      setTimeout(done);
    });

    describe('if open', () => {
      beforeEach((done) => {
        component.open = true;
        setTimeout(done);
      });

      it('should be closed when property `open` is set to false', (done) => {
        setTimeout(() => expect(checkVisibility(component.childNodes[0])).to.equal(true));
        setTimeout(() => (component.open = false));
        setTimeout(() => expect(checkInvisibility(component.childNodes[0])).to.equal(true));
        setTimeout(done);
      });
    });

    describe('eventing', () => {
      it('should be possible to close the dialog with a blanket activation', (done) => {
        let blanket;
        afterMutations(
          () => (component.hasBlanket = true),
          () => (component.open = true),
          () => {
            blanket = getShadowRoot(component).firstChild.firstChild;
          },
          () => {
            const event = new CustomEvent(activateBlanketEvent);
            blanket.dispatchEvent(event);
          },
          () => {
            expect(component.open).to.be.false;
          },
          done
        );
      });

      it(`should be possible to subscribe to the '${afterOpenEvent}' event`, (done) => {
        afterMutations(
          () => component.addEventListener(afterOpenEvent, () => done()),
          () => (component.open = true)
        );
      });

      it(`should be possible to subscribe to the '${afterCloseEvent}' event`, (done) => {
        afterMutations(
          () => (component.open = true),
          () => component.addEventListener(afterCloseEvent, () => done()),
          () => (component.open = false)
        );
      });
    });
  });
});
