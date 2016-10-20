import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { getShadowRoot, afterMutations } from 'akutil-common-test';
import { define, vdom } from 'skatejs';

import GlobalItem from '../../src/internal/ak-navigation-global-item';
import { setupComponent, tearDownComponent } from '../_helpers';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

const Wrapper = define('x-wrapper', {
  render() {
    return (<GlobalItem>
      <slot name="foo" />
    </GlobalItem>);
  },
});

describe('ak-navigation-global-item', () => {
  let component;
  let shadowRoot;
  beforeEach(() => setupComponent(Wrapper).then((newComponent) => {
    component = newComponent;
    shadowRoot = getShadowRoot(component);
  }));
  afterEach(() => tearDownComponent(component));

  it('with assigned children, the item is rendered', (done) => {
    const div = document.createElement('div');
    div.setAttribute('slot', 'foo');
    afterMutations(
      () => component.appendChild(div),
      () => expect(getShadowRoot(shadowRoot.firstChild).children.length > 1).to.equal(true),
      done
    );
  });
});
