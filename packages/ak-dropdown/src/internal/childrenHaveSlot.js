export default function childrenHaveSlot(list, slotName) {
  return [...list].some(el => (el.getAttribute && el.getAttribute('slot') === slotName));
}
