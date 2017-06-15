export function isCellSelected (cell: Element) {
  return (cell.className || '').indexOf('selectedCell') > -1;
}
