export default function getScrollDistance(el) {
  let scrollX = 0;
  let scrollY = 0;

  while (el) {
    // deal with browser quirks with body/window/document and page scroll
    if (el.tagName === 'BODY') {
      scrollX += el.scrollLeft || document.documentElement.scrollLeft;
      scrollY += el.scrollTop || document.documentElement.scrollTop;
    // for all other non-BODY elements
    } else {
      scrollX += el.scrollLeft;
      scrollY += el.scrollTop;
    }

    // eslint-disable-next-line no-param-reassign
    el = el.offsetParent;
  }

  return { scrollX, scrollY };
}
