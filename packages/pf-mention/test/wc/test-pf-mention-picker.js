import { waitUntil, getShadowRoot } from 'akutil-common-test';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import mentionData, { mentionDataSize } from '../../src/support/mention-data';
import MentionResource from '../../src/support/mock-pf-mention-resource';
import MentionPicker from '../../src/wc/pf-mention-picker';
import { getMentionItems, getError, getMentionList,
  isMentionItemSelected, getMentionItemById } from '../../src/support/pf-selectors';

chai.use(chaiAsPromised);
chai.should();
// const expect = chai.expect;

const mentions = mentionData.mentions;
const testTimeout = 10000;
const step = 10;

function setupPicker() {
  const component = new MentionPicker();
  const componentHasShadowRoot = () => !!getShadowRoot(component);
  component.resourceProvider = new MentionResource({
    minWait: 0,
    maxWait: 0,
  });
  document.body.appendChild(component);
  // We return a promise here so we can do more than just the default setting up
  return waitUntil(() => componentHasShadowRoot).then(() => component, testTimeout, step);
}

function tearDownPicker(component) {
  document.body.removeChild(component);
}

function newMouseDownEvent() {
  try {
    return new MouseEvent('mousedown');
  } catch (e) {
    const event = document.createEvent('MouseEvent');
    event.initMouseEvent('mousedown', true, true, window, 1, 0, 0, 0, 0, false, false, false,
      false, 0, null);
    return event;
  }
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
    return waitUntil(defaultMentionItemsShow, testTimeout, step).should.be.fulfilled;
  });

  it('should accept limit result to starting with shae', () => {
    const defaultMentionItemsShow = () => (getMentionItems(component).length === 1);
    component.query = 'shae';
    return waitUntil(defaultMentionItemsShow, testTimeout, step).should.be.fulfilled;
  });

  it('should report error when service fails', () => {
    const defaultMentionItemsShow = () => (getMentionItems(component).length === mentionDataSize);
    const noMentionItemsShown = () => getMentionItems(component).length === 0;
    const mentionErrorShown = () => !!getError(component);

    return new Promise((resolve, reject) => {
      waitUntil(defaultMentionItemsShow, testTimeout, step).should.be.fulfilled.then(() => {
        component.query = 'nothing';
        waitUntil(noMentionItemsShown, testTimeout, step).should.be.fulfilled.then(() => {
          component.query = 'error';
          waitUntil(mentionErrorShown, testTimeout, step).should.be.fulfilled.then(() => {
            resolve();
          }, (reason) => reject(reason));
        }, (reason) => reject(reason));
      }, (reason) => reject(reason));
    });
  });

  it('should display previous mention if error straight after', () => {
    const defaultMentionItemsShow = () => (getMentionItems(component).length === mentionDataSize);
    const mentionErrorProcessed = () => {
      const mentionList = getMentionList(component);
      return mentionList && mentionList.showError;
    };

    return new Promise((resolve, reject) => {
      waitUntil(defaultMentionItemsShow, testTimeout, step).should.be.fulfilled.then(() => {
        component.query = 'error';
        waitUntil(mentionErrorProcessed, testTimeout, step).should.be.fulfilled.then(() => {
          try {
            expect(getMentionItems(component).length, 'Number of mention items')
              .to.equal(mentionDataSize);
            resolve();
          } catch (err) {
            reject(err);
          }
        }, (reason) => reject(reason));
      }, (reason) => reject(reason));
    });
  });

  it('should change selection when navigating next', () => {
    const defaultMentionItemsShow = () => (getMentionItems(component).length === mentionDataSize);
    const secondItemSelected = () => isMentionItemSelected(component, mentions[1].id);

    return new Promise((resolve, reject) => {
      waitUntil(defaultMentionItemsShow, testTimeout, step).should.be.fulfilled.then(() => {
        component.selectNext();
        waitUntil(secondItemSelected, testTimeout, step).should.be.fulfilled.then(() => {
          resolve();
        }, (reason) => reject(reason));
      }, (reason) => reject(reason));
    });
  });

  it('should change selection when navigating previous', () => {
    const defaultMentionItemsShow = () => (getMentionItems(component).length === mentionDataSize);
    const lastItemSelected = () =>
      isMentionItemSelected(component, mentions[mentions.length - 1].id);

    return new Promise((resolve, reject) => {
      waitUntil(defaultMentionItemsShow, testTimeout, step).should.be.fulfilled.then(() => {
        component.selectPrevious();
        waitUntil(lastItemSelected, testTimeout, step).should.be.fulfilled.then(() => {
          resolve();
        }, (reason) => reject(reason));
      }, (reason) => reject(reason));
    });
  });

  it('should choose current selection when chooseCurrentSelection called', () => {
    let chosenMention = null;

    const defaultMentionItemsShow = () => (getMentionItems(component).length === mentionDataSize);
    const secondItemSelected = () => isMentionItemSelected(component, mentions[1].id);
    const chooseSecondItem = () => (chosenMention && chosenMention.id === mentions[1].id);

    component.addEventListener('selected', (event) => { chosenMention = event.detail; });

    return new Promise((resolve, reject) => {
      waitUntil(defaultMentionItemsShow, testTimeout, step).should.be.fulfilled.then(() => {
        component.selectNext();
        waitUntil(secondItemSelected, testTimeout, step).should.be.fulfilled.then(() => {
          component.chooseCurrentSelection();
          waitUntil(chooseSecondItem, testTimeout, step).should.be.fulfilled.then(() => {
            resolve();
          }, (reason) => reject(reason));
        }, (reason) => reject(reason));
      }, (reason) => reject(reason));
    });
  });

  it('should choose clicked selection when item clicked', () => {
    let chosenMention = null;

    const defaultMentionItemsShow = () => (getMentionItems(component).length === mentionDataSize);
    const chooseThirdItem = () => (chosenMention && chosenMention.id === mentions[2].id);

    component.addEventListener('selected', (event) => { chosenMention = event.detail; });

    return new Promise((resolve, reject) => {
      waitUntil(defaultMentionItemsShow, testTimeout, step).should.be.fulfilled.then(() => {
        const item = getMentionItemById(component, mentions[2].id);
        item.dispatchEvent(newMouseDownEvent());
        waitUntil(chooseThirdItem, testTimeout, step).should.be.fulfilled.then(() => {
          resolve();
        }, (reason) => reject(reason));
      }, (reason) => reject(reason));
    });
  });
});
