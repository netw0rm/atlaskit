import { keyup, afterMutations, getShadowRoot, waitUntil } from 'akutil-common-test';
import { Component, emit, props } from 'skatejs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { name } from '../package.json';
import AkNavigation, {
  NavigationLink as AkNavigationLink,
  events as navigationEvents,
} from '../src';

const {
  open: navigationOpenEvent,
  close: navigationCloseEvent,
  searchDrawerSelected: searchDrawerSelectedEvent,
  createDrawerSelected: createDrawerSelectedEvent,
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
describe.skip('exports', () => {
  it('should export a base component', () => {
    (new AkNavigation()).should.be.an.instanceof(Component);
  });

  it('should export a navigation link component', () => {
    (new AkNavigationLink()).should.be.an.instanceof(Component);
  });

  it('should have an events export with defined events', () => {
    navigationEvents.should.be.defined;
    Object.keys(navigationEvents).should.be.deep.equal([
      'linkSelected',
      'createDrawerSelected',
      'searchDrawerSelected',
      'open',
      'close',
      'widthChanged',
      'resizeStart',
      'resizeEnd',
    ]);
  });
});
describe.skip('ak-navigation detached', () => {
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
    it(`fires an "${widthChangedEvent}" event when attached`, (done) => {
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

describe.skip('ak-navigation', () => {
  let component;
  let shadowRoot;

  beforeEach(() => setupComponent().then((newComponent) => {
    component = newComponent;
    shadowRoot = getShadowRoot(component);
  }));
  afterEach(() => tearDownComponent(component));

  it('should be possible to create a component', () => {
    expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
    expect(shadowRoot.innerHTML).to.not.equal('');
  });

  it(`fires an "${navigationOpenEvent}" event when opening`, (done) => {
    component.open = false;
    let called = false;
    component.addEventListener(navigationOpenEvent, () => {
      called = true;
    });
    component.open = true;
    afterMutations(() => {
      expect(called).to.equal(true);
    }, done);
  });

  it(`fires an "${navigationCloseEvent}" event when closing`, (done) => {
    component.open = true;
    let called = false;
    component.addEventListener(navigationCloseEvent, () => {
      called = true;
    });
    component.open = false;
    afterMutations(() => {
      expect(called).to.equal(true);
    }, done);
  });

  it(`fires an "${widthChangedEvent}" event when closing`, (done) => {
    props(component, { open: true });
    const originalWidth = component.width;
    component.addEventListener(widthChangedEvent, (e) => {
      expect(e.detail.oldWidth).to.equal(originalWidth);
      expect(e.detail.newWidth).to.equal(component.width);
      done();
    });
    props(component, { open: false });
  });

  it(`fires an "${widthChangedEvent}" event when containerHidden changes`, (done) => {
    component.open = true;
    component.containerHidden = true;
    const originalWidth = component.width;
    component.addEventListener(widthChangedEvent, (e) => {
      expect(e.detail.newWidth).to.not.equal(originalWidth);
      done();
    });
    component.containerHidden = false;
  });

  it('toggling does nothing by default while attached', (done) => {
    expect(component.open).to.equal(false);
    afterMutations(() => {
      keyup('[');
      expect(component.open).to.equal(false);
    }, done);
  });

  it('changing the open state changes the width', () => {
    props(component, { open: true });
    const originalWidth = component.width;
    props(component, { open: false });
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

  describe('resizing', () => {
    it('navigation.width can be set to a number and that is respected', (done) => {
      afterMutations(
        () => props(component, { width: 101 }),
        () => expect(component.width).to.equal(101),
        done
      );
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
    ['shiftKey', 'metaKey', 'ctrlKey', 'altKey'].forEach((key) => {
      it(`toggling does not work with ${key} held`, (done) => {
        expect(component.open).to.equal(false);
        afterMutations(() => {
          keyup('[', { eventProperties: { [key]: true } });
          expect(component.open).to.equal(false);
        }, done);
      });
    });

    ['textarea', 'input'].forEach((elementName) => {
      describe(`with an ${elementName}`, () => {
        let el;
        beforeEach(() => {
          el = document.createElement(elementName);
          document.body.appendChild(el);
        });

        afterEach(() => document.body.removeChild(el));

        it(`toggling does not work when triggered on the ${elementName}`, (done) => {
          expect(component.open).to.equal(false);
          afterMutations(() => {
            keyup('[', { target: el });
            expect(component.open).to.equal(false);
          }, done);
        });
      });
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

  it(`search drawer is toggled by the "${searchDrawerSelectedEvent}" event`, (done) => {
    afterMutations(
      () => expect(component.searchDrawerOpen).to.equal(false),
      () => emit(component, searchDrawerSelectedEvent),
      () => expect(component.searchDrawerOpen).to.equal(true),
      () => emit(component, searchDrawerSelectedEvent),
      () => expect(component.searchDrawerOpen).to.equal(false),
      done
    );
  });

  it(`create drawer is toggled by the "${createDrawerSelectedEvent}" event`, (done) => {
    afterMutations(
      () => expect(component.createDrawerOpen).to.equal(false),
      () => emit(component, createDrawerSelectedEvent),
      () => expect(component.createDrawerOpen).to.equal(true),
      () => emit(component, createDrawerSelectedEvent),
      () => expect(component.createDrawerOpen).to.equal(false),
      done
    );
  });

  describe('sidebar link items', () => {
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
        keyup('enter', { target: component.children[1] });
        expect(component.children[0].selected).to.equal(false);
        expect(component.children[1].selected).to.equal(true);
        expect(component.children[2].selected).to.equal(false);
      }, done);
    });
  });
});
