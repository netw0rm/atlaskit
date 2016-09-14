import { waitUntil, getShadowRoot } from 'akutil-common-test';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { mentionDataSize } from '../../src/support/mention-data';
import MentionResource from '../../src/support/mock-pf-mention-resource';
import MentionPicker from '../../src/wc/pf-mention-picker';
import { getMentionItems } from '../../src/support/pf-selectors';

chai.use(chaiAsPromised);
chai.should();
// const expect = chai.expect;

function setupPicker() {
  const component = new MentionPicker();
  const componentHasShadowRoot = () => !!getShadowRoot(component);
  component.resourceProvider = new MentionResource({
    minWait: 0,
    maxWait: 0,
  });
  document.body.appendChild(component);
  // We return a promise here so we can do more than just the default setting up
  return waitUntil(() => componentHasShadowRoot).then(() => component);
}

function tearDownPicker(component) {
  document.body.removeChild(component);
}

describe('pf-mention-picker', () => {
  let component;

  beforeEach(() => setupPicker().then(newComponent => (component = newComponent)));
  afterEach(() => tearDownPicker(component));

  it('should accept all mention names by default', () => {
    const defaultMentionItemsShow = () => (getMentionItems(component).length === mentionDataSize);
    return waitUntil(defaultMentionItemsShow).should.be.fulfilled;
  });

  it('should accept limit result to starting with s', () => {
    const defaultMentionItemsShow = () => (getMentionItems(component).length === 4);
    component.query = 's';
    return waitUntil(defaultMentionItemsShow).should.be.fulfilled;
  });

  it('should accept limit result to starting with shae', () => {
    const defaultMentionItemsShow = () => (getMentionItems(component).length === 1);
    component.query = 'shae';
    return waitUntil(defaultMentionItemsShow).should.be.fulfilled;
  });
});
