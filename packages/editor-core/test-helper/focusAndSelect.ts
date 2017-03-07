export default function focusAndSelect(element: HTMLElement) {
  const range = document.createRange();
  const selection = window.getSelection();

  range.selectNodeContents(element);
  selection.removeAllRanges();
  selection.addRange(range);

  element.focus();
}
