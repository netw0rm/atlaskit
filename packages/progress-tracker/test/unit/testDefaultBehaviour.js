import { mount } from 'enzyme';
import React from 'react';
import Page from '@atlaskit/page';
import styled from 'styled-components';

import { ProgressTracker } from '../../src/index';

const stages = [
  {
    id: 'visited-1',
    label: 'Visited Step',
    percentageComplete: 100,
    status: 'visited',
    href: '#',
  },
  {
    id: 'current-1',
    label: 'Current Step',
    percentageComplete: 0,
    status: 'current',
    href: '#',
  },
];

const stagesWithNoHrefOrOnClick = [
  {
    id: 'visited-1',
    label: 'Visited Step',
    percentageComplete: 100,
    status: 'visited',
  },
  {
    id: 'current-1',
    label: 'Current Step',
    percentageComplete: 0,
    status: 'current',
  },
];

const stagesWithOnClick = [
  {
    id: 'visited-1',
    label: 'Visited Step',
    percentageComplete: 100,
    status: 'visited',
    onClick: jest.fn(),
  },
  {
    id: 'current-1',
    label: 'Current Step',
    percentageComplete: 0,
    status: 'current',
    onClick: jest.fn(),
  },
];

describe('ak-progress-tracker/default-behaviour', () => {
  it('should render link if href property is set and step has been visited', () => {
    const wrapper = mount(
      <Page>
        <ProgressTracker stages={stages} />
      </Page>
    );
    expect(wrapper.find('DefaultProgressTrackerLink').length).toBe(1);
  });

  it('should render custom component link if href property is set and step has been visited and link component is passed', () => {
    const CustomProgressTrackerLink = styled.a``;
    CustomProgressTrackerLink.displayName = 'CustomProgressTrackerLink';

    const wrapper = mount(
      <Page>
        <ProgressTracker stages={stages} linkComponent={CustomProgressTrackerLink} />
      </Page>
    );
    expect(wrapper.find('CustomProgressTrackerLink').length).toBe(1);
  });

  it('should render link if onClick property is set and step has been visited', () => {
    const wrapper = mount(
      <Page>
        <ProgressTracker stages={stagesWithOnClick} />
      </Page>
    );
    const defaultProgressTrackerLink = wrapper.find('DefaultProgressTrackerLink');
    expect(defaultProgressTrackerLink.length).toBe(1);
  });

  it('should trigger onClick if onClick property is set and step has been visited', () => {
    stagesWithOnClick[0].onClick.mockReset();

    const wrapper = mount(
      <Page>
        <ProgressTracker stages={stagesWithOnClick} />
      </Page>
    );
    const defaultProgressTrackerLink = wrapper.find('DefaultProgressTrackerLink');
    defaultProgressTrackerLink.simulate('click');
    expect(stagesWithOnClick[0].onClick).toHaveBeenCalledTimes(1);
  });

  it('should render custom component link if onClick property is set and step has been visited and link component is passed', () => {
    const CustomProgressTrackerLink = styled.a``;
    CustomProgressTrackerLink.displayName = 'CustomProgressTrackerLink';

    const wrapper = mount(
      <Page>
        <ProgressTracker stages={stagesWithOnClick} linkComponent={CustomProgressTrackerLink} />
      </Page>
    );
    const customProgressTrackerLink = wrapper.find('CustomProgressTrackerLink');
    expect(customProgressTrackerLink.length).toBe(1);
  });

  it('should not render link if href property is not set', () => {
    const wrapper = mount(
      <Page>
        <ProgressTracker stages={stagesWithNoHrefOrOnClick} />
      </Page>
    );
    expect(wrapper.find('DefaultProgressTrackerLink').length).toBe(0);
  });
});
