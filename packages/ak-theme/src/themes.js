export const tagName = e => e.tagName.toLowerCase();
export const themeHandlers = new WeakMap();
export const themeNameFromNode = e => tagName(e);
