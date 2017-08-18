import React from 'react';
import { AtlassianContainerResult, JiraProjectResult } from '../../../src/components/js/results';
import { mountWithRootTheme } from '../_theme-util';

describe('Jira Project Result', () => {
  let resultWrapper;
  beforeEach(() => {
    resultWrapper = mountWithRootTheme(<JiraProjectResult resultId="testProject" type="jira-project" name="test" />);
  });

  it('should contain an AtlassianContainerResult', () => {
    expect(resultWrapper.find(AtlassianContainerResult).exists()).toBe(true);
  });

  it('should render the `projectType` prop', () => {
    resultWrapper.setProps({ projectType: 'Service desk' });
    expect(resultWrapper.text()).toEqual(expect.stringContaining('Service desk'));
  });
});
