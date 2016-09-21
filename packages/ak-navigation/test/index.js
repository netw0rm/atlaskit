import { name } from '../package.json';
import { keyup, afterMutations, getShadowRoot, waitUntil } from 'akutil-common-test';
import { Component } from 'skatejs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import AkNavigation, { events as navigationEvents } from '../src';
const {
  open: navigationOpenEvent,
  close: navigationCloseEvent,
  widthChanged: widthChangedEvent,
} = navigationEvents;

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

function setupComponent() {
  const component = new AkNavigation();
  const componentHasShadowRoot = () => !!getShadowRoot(component);

  document.body.appendChild(component);

  return waitUntil(componentHasShadowRoot).then(() => component);
}

function tearDownComponent(component) {
  document.body.removeChild(component);
}
describe('exports', () => {
  it('should export a base component', () => {
    (new AkNavigation).should.be.an.instanceof(Component);
  });

  it('should have an events export with defined events', () => {
    navigationEvents.should.be.defined;
    Object.keys(navigationEvents).should.be.deep.equal([
      'linkSelected',
      'createDrawerOpen',
      'searchDrawerOpen',
      'open',
      'close',
      'widthChanged',
      'openStateChanged',
    ]);
  });
});
describe('ak-navigation detached', () => {
  it('toggling does not work before attached', (done) => {
    const component = new AkNavigation();
    expect(component.open).to.equal(false);
    afterMutations(() => {
      keyup('[');
      expect(component.open).to.equal(false);
    }, done);
  });
  describe('when it becomes attached', () => {
    const component = new AkNavigation();
    it('fires an "${navigationOpenEvent}" event when attached', (done) => {
      let called = false;
      component.addEventListener(widthChangedEvent, (e) => {
        expect(e.detail.oldWidth).to.equal(null);
        expect(e.detail.newWidth).to.equal(component.width);
        called = true;
      });
      document.body.appendChild(component);
      afterMutations(() => {
        expect(called).to.equal(true);
      }, done);
    });

    afterEach(() => {
      document.body.removeChild(component);
    });
  });
});

describe('ak-navigation', () => {
  let component;
  let shadowRoot;

  beforeEach(() => setupComponent().then(newComponent => {
    component = newComponent;
    shadowRoot = getShadowRoot(component);
  }));
  afterEach(() => tearDownComponent(component));

  it('should be possible to create a component', () => {
    expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
    expect(shadowRoot.innerHTML).to.not.equal('');
  });

  it(`fires an "${navigationOpenEvent}" event when opening`, () => {
    component.open = false;
    let called = false;
    component.addEventListener(navigationOpenEvent, () => {
      called = true;
    });
    component.open = true;
    expect(called).to.equal(true);
  });

  it(`fires an "${navigationCloseEvent}" event when closing`, (done) => {
    component.open = true;
    const originalWidth = component.width;
    component.addEventListener(widthChangedEvent, (e) => {
      expect(e.detail.oldWidth).to.equal(originalWidth);
      expect(e.detail.newWidth).to.equal(component.width);
      done();
    });
    component.open = false;
  });

  it('toggling does nothing by default while attached', (done) => {
    expect(component.open).to.equal(false);
    afterMutations(() => {
      keyup('[');
      expect(component.open).to.equal(false);
    }, done);
  });

  it('changing the open state changes the width', () => {
    component.open = true;
    const originalWidth = component.width;
    component.open = false;
    expect(component.width).to.not.equal(originalWidth);
  });

  describe('width containerHidden set', () => {
    beforeEach(() => {
      component.containerHidden = true;
    });
    it('changing the open state does not change the width', () => {
      component.open = true;
      const originalWidth = component.width;
      component.open = false;
      expect(component.width).to.equal(originalWidth);
    });
  });

  describe('with collapsible set', () => {
    beforeEach(() => {
      component.collapsible = true;
    });
    it('toggling works while attached', (done) => {
      expect(component.open).to.equal(false);
      afterMutations(() => {
        keyup('[');
        expect(component.open).to.equal(true);
      }, done);
    });

    it('toggling does not work after detached', (done) => {
      afterMutations(
        () => document.body.removeChild(component),
        () => expect(component.open).to.equal(false),
        () => keyup('['),
        () => expect(component.open).to.equal(false),
        () => document.body.appendChild(component),
        done
      );
    });
  });

  describe('sidebar link items', () => {
    afterEach(() => {
      window.location.hash = '';
    });
    it('are mutually exclusively selectable via enter', (done) => {
      component.innerHTML = `
        <ak-navigation-link selected></ak-navigation-link>
        <ak-navigation-link></ak-navigation-link>
        <ak-navigation-link></ak-navigation-link>
      `;
      afterMutations(() => {
        expect(component.children[0].selected).to.equal(true);
        expect(component.children[1].selected).to.equal(false);
        expect(component.children[2].selected).to.equal(false);
        keyup('enter', component.children[1]);
        expect(component.children[0].selected).to.equal(false);
        expect(component.children[1].selected).to.equal(true);
        expect(component.children[2].selected).to.equal(false);
      }, done);
    });
    it('selecting an item activates the link', (done) => {
      component.innerHTML = `
        <ak-navigation-link href="#link"></ak-navigation-link>
      `;
      afterMutations(
        () => keyup('enter', component.children[0]),
        () => expect(window.location.hash).to.equal('#link'),
        done
      );
    });
  });
});
