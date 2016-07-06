module.exports = (kind, storyName, base = '') => {
  const eKind = encodeURIComponent(kind);
  const eStory = encodeURIComponent(storyName);
  return `${base}/iframe.html?selectedKind=${eKind}&selectedStory=${eStory}&dataId=x`;
};
