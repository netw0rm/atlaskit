export default (name, attribute = 'content') => {
  const meta = document.querySelector(`meta[name="${name}"]`);
  return meta ? meta.getAttribute(attribute) : null;
};
