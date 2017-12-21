/* eslint-disable import/prefer-default-export */

export function getStorybookURL(component, version) {
  const v = version || component.version;
  return `https://s3.ap-southeast-2.amazonaws.com/atlaskit-storybooks/${component.packageName}/${v}/index.html`;
}
