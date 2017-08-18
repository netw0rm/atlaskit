import React from 'react';
import { AtlassianContainerResult, ConfluenceSpaceResult } from '../../../src/components/js/results';
import { mountWithRootTheme } from '../_theme-util';

describe('Confluence Space Result', () => {
  let resultWrapper;
  beforeEach(() => {
    resultWrapper = mountWithRootTheme(<ConfluenceSpaceResult resultId="testSpace" type="confluence-space" name="test" />);
  });

  it('should contain an AtlassianContainerResult', () => {
    expect(resultWrapper.find(AtlassianContainerResult).exists()).toBe(true);
  });

  it('should render the `spaceType` prop', () => {
    resultWrapper.setProps({ spaceType: 'Space' });
    expect(resultWrapper.text()).toEqual(expect.stringContaining('Space'));
  });
});
