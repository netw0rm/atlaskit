export const CONFLUENCE_REDIRECT = '/wiki/';

export default () => {
  window.top.location.href = CONFLUENCE_REDIRECT;
};
