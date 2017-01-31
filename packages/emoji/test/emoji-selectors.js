export function getEmojiTypeAheadItemById(emojiTypeAhead, itemKey) {
  return emojiTypeAhead.findWhere(n => n.name() === 'EmojiTypeAheadItem' && n.key() === itemKey);
}

export function getSelectedEmojiTypeAheadItem(emojiTypeAhead) {
  return emojiTypeAhead.findWhere(n => n.name() === 'EmojiTypeAheadItem' && n.prop('selected'));
}

export function isEmojiTypeAheadItemSelected(emojiTypeAhead, itemKey) {
  const selectedItem = getSelectedEmojiTypeAheadItem(emojiTypeAhead);
  return selectedItem.length && selectedItem.key() === itemKey;
}
