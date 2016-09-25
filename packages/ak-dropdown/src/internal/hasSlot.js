export default function hasSlot(list, slotName) {
  return [...list].some(el => (el.getAttribute && el.getAttribute('slot') === slotName));
}
