import { name } from '../package.json';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Component from '../src/index.js';
import { events as navigationEvents } from 'ak-navigation';
const {
  widthChanged: widthChangedEvent,
} = navigationEvents;

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-page', () => {
  it('should be possible to create a component', () => {
    const component = new Component();
    expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
  });
  describe('after the navigation\'s initial width change', () => {
    let div;
    let eventFired;
    beforeEach((done) => {
      div = document.createElement('div');
      div.innerHTML = `
        <div>
          <ak-navigation/>
        </div>
      `;
      eventFired = () => {
        div.removeEventListener(widthChangedEvent, eventFired);
        done();
      };
      div.addEventListener(widthChangedEvent, eventFired);
      document.body.appendChild(div);
    });
    afterEach(() => {
      document.body.removeChild(div);
    });
    it('creating a page with a navigation in it sets the navigation-width on the page', (done) => {
      div.firstElementChild.outerHTML = `<ak-page>${div.firstElementChild.innerHTML}</ak-page>`;
      setTimeout(() => {
        expect(div.firstElementChild.navigationWidth).to.not.equal(undefined);
        expect(div.firstElementChild.navigationWidth).to.not.equal(0);
        done();
      });
    });
  });
});
