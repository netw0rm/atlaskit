import { name } from '../package.json';
import { keydown, keyup, afterMutations } from 'akutil-common-test';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import AkNavigation from '../src/index.js';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-navigation', () => {
  it('should be possible to create a component', () => {
    const component = new AkNavigation();
    expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
  });

  it('fires an ak-navigation-open event when opening', () => {
    const component = new AkNavigation();
    component.open = false;
    let called = false;
    component.addEventListener('ak-navigation-open', () => {
      called = true;
    });
    component.open = true;
    expect(called).to.equal(true);
  });

  it('fires an ak-navigation-open event when closing', () => {
    const component = new AkNavigation();
    component.open = true;
    let called = false;
    component.addEventListener('ak-navigation-close', () => {
      called = true;
    });
    component.open = false;
    expect(called).to.equal(true);
  });

  it('toggling does not work before attached', () => {
    const component = new AkNavigation();
    expect(component.open).to.equal(false);
    afterMutations(() => {
      keydown('[');
      expect(component.open).to.equal(false);
    });
  });

  it('toggling works while attached', () => {
    const component = new AkNavigation();
    document.body.appendChild(component);
    expect(component.open).to.equal(false);
    afterMutations(() => {
      keydown('[');
      expect(component.open).to.equal(true);
    });
  });

  it('toggling does not work after deteached', () => {
    const component = new AkNavigation();
    document.body.appendChild(component);
    expect(component.open).to.equal(false);
    afterMutations(() => {
      keydown('[');
      expect(component.open).to.equal(false);
    });
  });

  it('sidebar link items are mutually exclusively selectable via enter', () => {
    const component = new AkNavigation();
    component.innerHTML = `
      <ak-navigation-link selected></ak-navigation-link>
      <ak-navigation-link></ak-navigation-link>
      <ak-navigation-link></ak-navigation-link>
    `;
    afterMutations(() => {
      expect(component.children[0].selected).to.equal(true);
      expect(component.children[1].selected).to.equal(false);
      expect(component.children[2].selected).to.equal(false);
      keyup('enter', component.childNodes[1]);
      expect(component.children[0].selected).to.equal(false);
      expect(component.children[1].selected).to.equal(true);
      expect(component.children[2].selected).to.equal(false);
    });
  });
});
