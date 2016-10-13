import Group from '../index.group';
import Item from '../index.item';

export default (nodeList) => {
  let result = [... nodeList];
  result.forEach((node) => {
    // weird hack for the tests, so far unavoidable
    if (node.tagName === 'AK-DROPDOWN-GROUP' || node instanceof Group) {
      result = result.concat([...node.childNodes]);
    }
  });

  return result.filter((node) => (node instanceof Item));
};
