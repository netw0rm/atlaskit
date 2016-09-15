import { getShadowRoot } from 'akutil-common-test';
import mentionListShadowStyles from '../../src/wc/pf-mention-list-shadow.less';


/* WC structure:
  pf-mention-picker
   > ak-inline-dialog (optional)
     > pf-resourced-mention-list
       > pf-mention-list
         > pf-scrollable
           > pf-mention-item (0..n)
 */

function shadowRootQuerySelector(component, selector) {
  if (component) {
    const shadowRoot = getShadowRoot(component);
    if (shadowRoot) {
      return shadowRoot.querySelector(selector);
    }
  }
  return null;
}

function slotQuerySelectorAll(component, selector) {
  if (component) {
    return component.querySelectorAll(selector);
  }
  return [];
}

export function getMentionList(pfMentionPicker) {
  const dialog = shadowRootQuerySelector(pfMentionPicker, 'ak-inline-dialog');
  const resourcedMentionList = shadowRootQuerySelector(dialog || pfMentionPicker,
    'pf-resourced-mention-list');
  const mentionList = shadowRootQuerySelector(resourcedMentionList, 'pf-mention-list');
  return mentionList;
}

export function getMentionItems(pfMentionPicker) {
  const mentionList = getMentionList(pfMentionPicker);
  const scrollable = shadowRootQuerySelector(mentionList, 'pf-scrollable');
  return slotQuerySelectorAll(scrollable, 'pf-mention-item');
}

export function getError(pfMentionPicker) {
  const mentionList = getMentionList(pfMentionPicker);
  return shadowRootQuerySelector(mentionList, `.${mentionListShadowStyles.locals.mentionError}`);
}
