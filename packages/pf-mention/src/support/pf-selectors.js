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

function slotQuerySelector(component, selector) {
  if (component) {
    return component.querySelector(selector);
  }
  return null;
}

export function getMentionList(pfMentionPicker) {
  const dialog = shadowRootQuerySelector(pfMentionPicker, 'ak-inline-dialog');
  const resourcedMentionList = shadowRootQuerySelector(dialog || pfMentionPicker,
    'pf-resourced-mention-list');
  const mentionList = shadowRootQuerySelector(resourcedMentionList, 'pf-mention-list');
  return mentionList;
}

export function getScrollable(pfMentionPicker) {
  const mentionList = getMentionList(pfMentionPicker);
  return shadowRootQuerySelector(mentionList, 'pf-scrollable');
}

export function getMentionItems(pfMentionPicker) {
  const scrollable = getScrollable(pfMentionPicker);
  return slotQuerySelectorAll(scrollable, 'pf-mention-item');
}

export function getMentionItemById(pfMentionPicker, itemId) {
  const scrollable = getScrollable(pfMentionPicker);
  return slotQuerySelector(scrollable, `[id="${itemId}"]`);
}

export function getSelectedMentionItem(pfMentionPicker) {
  const scrollable = getScrollable(pfMentionPicker);
  const selectedItem = slotQuerySelector(scrollable, 'pf-mention-item[selected]');
  console.log('selectedItem', selectedItem && selectedItem.id);
  return selectedItem;
}

export function isMentionItemSelected(pfMentionPicker, itemId) {
  const selectedItem = getSelectedMentionItem(pfMentionPicker);
  const isSelected = selectedItem && selectedItem.id === itemId;
  console.log('isSelected', itemId, isSelected);
  return isSelected;
}

export function getError(pfMentionPicker) {
  const mentionList = getMentionList(pfMentionPicker);
  return shadowRootQuerySelector(mentionList, `.${mentionListShadowStyles.locals.mentionError}`);
}
