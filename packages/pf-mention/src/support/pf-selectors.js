import { getShadowRoot } from 'akutil-common-test';


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

function shadowRootQuerySelectorAll(component, selector) {
  if (component) {
    const shadowRoot = getShadowRoot(component);
    if (shadowRoot) {
      return shadowRoot.querySelectorAll(selector);
    }
  }
  return [];
}

export function getMentionItems(pfMentionPicker) {
  const dialog = shadowRootQuerySelector(pfMentionPicker, 'ak-inline-dialog');
  const resourcedMentionList = shadowRootQuerySelector(dialog || pfMentionPicker,
    'pf-resourced-mention-list');
  const mentionList = shadowRootQuerySelector(resourcedMentionList, 'pf-mention-list');
  const scrollable = shadowRootQuerySelector(mentionList, 'pf-scrollable');
  return shadowRootQuerySelectorAll(scrollable, 'pf-mention-item') || [];
}
