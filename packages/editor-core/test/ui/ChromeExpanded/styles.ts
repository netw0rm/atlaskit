import { expect } from 'chai';

import { createNestedListStyles } from '../../../src/ui/ChromeExpanded/styles';

describe('@atlaskit/editor-core/ui/ChromeExpanded/styles/createNestedListStyles', () => {

  it('should return not-null object for nested ordered list styles', () => {
    const nestedOrderedListStyle = createNestedListStyles();
    expect(nestedOrderedListStyle).to.not.be.null;
  });

  it('should return not-null object for nested ordered list styles', () => {
    const nestedOrderedListStyle = createNestedListStyles();
    expect(Object.keys(nestedOrderedListStyle).length).to.eq(18);
  });

  it('should return correct values in the object', () => {
    const nestedOrderedListStyle = createNestedListStyles();
    expect(Object.keys(nestedOrderedListStyle.li)).not.to.be.undefined;
    expect(Object.keys(nestedOrderedListStyle['ol li'])).not.to.be.undefined;
    expect(Object.keys(nestedOrderedListStyle['ol ol li'])).not.to.be.undefined;
    expect(Object.keys(nestedOrderedListStyle['ol ol ol li'])).not.to.be.undefined;
  });

  it('should return correct styles for list items', () => {
    const nestedOrderedListStyle = createNestedListStyles();
    expect(Object.keys(nestedOrderedListStyle.li.listStyleType)).not.equal('decimal');
  });
});
