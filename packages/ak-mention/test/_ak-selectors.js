/* Component structure:
  ak-mention-picker
   > ak-popup (optional)
     > ak-resourced-mention-list
       > ak-mention-list
         > ak-scrollable
           > ak-mention-item (0..n)
 */

export function getMentionItemById(mentionPicker, itemId) {
  return mentionPicker.findWhere(n => n.name() === 'MentionItem' && n.prop('id') === itemId);
}

export function getSelectedMentionItem(mentionPicker) {
  return mentionPicker.findWhere(n => n.name() === 'MentionItem' && n.prop('selected'));
}

export function isMentionItemSelected(mentionPicker, itemId) {
  const selectedItem = getSelectedMentionItem(mentionPicker);
  return selectedItem.length && selectedItem.prop('id') === itemId;
}
