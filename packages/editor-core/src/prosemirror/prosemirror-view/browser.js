// This is taken from prosemirror-view/src/browser for convenience
/* eslint-disable */
if (typeof navigator != 'undefined') {
  const ie_edge = /Edge\/(\d+)/.exec(navigator.userAgent);
  const ie_upto10 = /MSIE \d/.test(navigator.userAgent);
  const ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);

  exports.mac = /Mac/.test(navigator.platform)
  let ie = exports.ie = !!(ie_upto10 || ie_11up || ie_edge);
  exports.ie_version = ie_upto10 ? document.documentMode || 6 : ie_11up ? +ie_11up[1] : ie_edge ? +ie_edge[1] : null;
  exports.gecko = !ie && /gecko\/\d/i.test(navigator.userAgent);
  exports.chrome = !ie && /Chrome\//.test(navigator.userAgent);
  exports.ios = !ie && /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent);
  exports.webkit = !ie && 'WebkitAppearance' in document.documentElement.style;
}
