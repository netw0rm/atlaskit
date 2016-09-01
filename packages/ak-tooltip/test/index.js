import { getShadowRoot, waitUntil } from 'akutil-common-test';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import Tooltip from '../src';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

const expect = chai.expect; // eslint-disable-line no-unused-vars

function setupComponent() {
  const component = new Tooltip();
  const componentHasShadowRoot = () => (getShadowRoot(component) || null);

  document.body.appendChild(component);

  return waitUntil(componentHasShadowRoot).then(() => component);
}

function tearDownComponent(component) {
  document.body.removeChild(component);
}

describe('ak-tooltip', () => {
  let component;
  let shadowRoot; // eslint-disable-line no-unused-vars

  beforeEach(() => setupComponent().then(newComponent => {
    component = newComponent;
    shadowRoot = getShadowRoot(component);
  }));
  afterEach(() => tearDownComponent(component));
});
