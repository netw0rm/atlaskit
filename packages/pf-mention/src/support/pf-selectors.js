import { getShadowRoot } from 'akutil-common-test';


/* WC structure:
  pf-mention-picker
   > ak-inline-dialog (optional)
     > pf-resourced-mention-list
       > pf-mention-list
         > pf-scrollable
           > pf-mention-item (0..n)
 */

export function getMentionItems(pfMentionPicker) {
  const dialog = getShadowRoot(pfMentionPicker).querySelector('ak-inline-dialog');
  const resourcedMentionList = getShadowRoot(dialog || pfMentionPicker)
    .querySelector('pf-resourced-mention-list');
  const mentionList = resourcedMentionList && getShadowRoot(resourcedMentionList)
    .querySelector('pf-mention-list');
  const scrollable = mentionList && getShadowRoot(mentionList).querySelector('pf-scrollable');
  return scrollable && scrollable.querySelectorAll('pf-mention-item') || [];
}
