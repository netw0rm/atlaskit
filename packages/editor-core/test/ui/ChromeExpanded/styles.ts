import { expect } from 'chai';

import { createNestedListStyles } from '../../../src/ui/ChromeExpanded/styles';

describe('@atlaskit/editor-core/ui/ChromeExpanded/styles/createNestedListStyles', () => {

  it('should return not-null object for nested ordered list styles', () => {
    const nestedOrderedListStyle = createNestedListStyles();
    expect(nestedOrderedListStyle).to.not.be.null;
  });

  it('should return not-null object for nested ordered list styles', () => {
    const nestedOrderedListStyle = createNestedListStyles();
    expect(Object.keys(nestedOrderedListStyle).length).to.eq(9);
  });

  it('should return correct values in the object', () => {
    const nestedOrderedListStyle = createNestedListStyles();
    expect(Object.keys(nestedOrderedListStyle[' > li'])).not.to.be.undefined;
    expect(Object.keys(nestedOrderedListStyle[' > li > ol > li'])).not.to.be.undefined;
    expect(Object.keys(nestedOrderedListStyle[' > li > ol > li > ol > li'])).not.to.be.undefined;
    expect(Object.keys(nestedOrderedListStyle[' > li > ol > li > ol > li > ol > li'])).not.to.be.undefined;
  });

  it('should return correct styles for list items', () => {
    const nestedOrderedListStyle = createNestedListStyles();
    expect(Object.keys(nestedOrderedListStyle[' > li'].listStyleType)).not.equal('decimal');
    expect(Object.keys(nestedOrderedListStyle[' > li > ol > li'].listStyleType)).not.equal('lower-alpha');
    expect(Object.keys(nestedOrderedListStyle[' > li > ol > li > ol > li'].listStyleType)).not.equal('lower-roman');
  });
});
