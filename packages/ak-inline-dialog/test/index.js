import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'custom-event-polyfill';
import { events as blanketEvents } from 'ak-blanket';
import { afterMutations, getShadowRoot, checkVisibility, checkInvisibility }
  from 'akutil-common-test';
import { Component } from 'skatejs';

import AkInlineDialog, { events } from '../src';
import { name } from '../package.json';


const { activate: activateBlanketEvent } = blanketEvents;
const { afterOpen: afterOpenEvent, afterClose: afterCloseEvent } = events;
chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

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
      document.body.appendChild(component);
    });

    afterEach(() => {
      document.body.removeChild(component);
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
