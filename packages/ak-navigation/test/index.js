import { keyup, afterMutations, getShadowRoot } from 'akutil-common-test';
import { Component, emit, props } from 'skatejs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { name } from '../package.json';
import AkNavigation, {
  NavigationLink as AkNavigationLink,
  events as navigationEvents,
} from '../src';
import calculateCollapseProperties from '../src/internal/collapse-properties';
import { setupComponent, tearDownComponent } from './_helpers';

const {
  open: navigationOpenEvent,
  close: navigationCloseEvent,
  searchDrawerSelected: searchDrawerSelectedEvent,
  createDrawerSelected: createDrawerSelectedEvent,
} = navigationEvents;

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

function getWidth(component) {
  return calculateCollapseProperties(component).visibleWidth;
}

describe('exports', () => {
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
      'resizeStart',
      'resizeEnd',
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
});

describe('ak-navigation', () => {
  let component;
  let shadowRoot;

  beforeEach(() => setupComponent(AkNavigation).then((newComponent) => {
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

  it('toggling does nothing by default while attached', (done) => {
    expect(component.open).to.equal(false);
    afterMutations(() => {
      keyup('[');
      expect(component.open).to.equal(false);
    }, done);
  });

  it('changing the open state changes the width', () => {
    props(component, { open: true });
    const originalWidth = getWidth(component);
    props(component, { open: false });
    expect(getWidth(component)).to.not.equal(originalWidth);
  });

  describe('width containerHidden set', () => {
    beforeEach(() => {
      component.containerHidden = true;
    });
    it('changing the open state does not change the width', () => {
      component.open = true;
      const originalWidth = getWidth(component);
      component.open = false;
      expect(getWidth(component)).to.equal(originalWidth);
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
        keyup('enter', component.children[1]);
        expect(component.children[0].selected).to.equal(false);
        expect(component.children[1].selected).to.equal(true);
        expect(component.children[2].selected).to.equal(false);
      }, done);
    });
  });
});
