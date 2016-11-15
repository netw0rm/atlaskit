import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { props } from 'skatejs';
import 'custom-event-polyfill';
import { waitUntil, getShadowRoot } from 'akutil-common-test';

import { name } from '../package.json';
import Group from '../src/index.group';
import shadowGroupStyles from '../src/less/shadow-group.less';


chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

function setupComponent() {
  const component = new Group();
  component.innerHTML = `
    <ak-dropdown-item>124</ak-dropdown-item>
    <ak-dropdown-item>444</ak-dropdown-item>
  `;
  const componentHasShadowRoot = () => !!getShadowRoot(component);

  document.body.appendChild(component);

  return waitUntil(componentHasShadowRoot).then(() => component);
}

function tearDownComponent(component) {
  document.body.removeChild(component);
}

describe.skip(name, () => {
  describe('general behavior', () => {
    let component;

    beforeEach(() => setupComponent().then((newComponent) => {
      component = newComponent;
    }));
    afterEach(() => tearDownComponent(component));

    it('should be possible to create a component', () => {
      // testing to see that skate did its job as expected
      // (in case some breaking changes in it that affect rendering)
      expect(getShadowRoot(component)).to.be.defined;
      expect(getShadowRoot(component).firstChild).to.be.defined;
    });

    it('should have headings', () => {
      const headingText = 'test heading';
      props(component, { heading: headingText });
      const heading = getShadowRoot(component).querySelector(`.${shadowGroupStyles.locals.heading}`);
      expect(heading.innerHTML).to.equal(headingText);
    });

    it('should have correct aria and role attributes', () => {
      const headingText = 'test heading';
      props(component, { heading: headingText });
      const heading = getShadowRoot(component).querySelector(`.${shadowGroupStyles.locals.heading}`);
      expect(heading.getAttribute('aria-hidden')).to.equal('true');
      expect(getShadowRoot(component).firstChild.getAttribute('role')).to.equal('group');
      expect(getShadowRoot(component).firstChild.getAttribute('aria-label')).to.equal(headingText);
    });
  });
});
