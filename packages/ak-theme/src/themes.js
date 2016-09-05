export default {};
export const tagName = e => e.tagName.toLowerCase();
export const themeName = str => {
  const split = str.split('-');
  return split.pop().match(/^[a-z0-9]{8}/) ? split.join('-') : str;
};
export const themeNameFromNode = e => themeName(tagName(e));
