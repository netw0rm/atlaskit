import { shallow, mount } from 'enzyme';
import React from 'react';
import { DropdownMenuStateless } from '@atlaskit/dropdown-menu';
import AppSwitcher from '../../src';
import { name } from '../../package.json';

const data = {
  recentContainers: [
    {
      name: 'Recent container',
      url: 'https://instance.atlassian.net/view/container',
      iconUrl: '',
      type: 'confluence-space',
    },
  ],
  linkedApplications: {
    configureLink: 'https://www.atlassian.com',
    apps: [
      {
        name: 'JIRA',
        url: 'https://instance.atlassian.net/',
        product: 'jira',
      },
      {
        name: 'Confluence',
        url: 'https://instance.atlassian.net/wiki',
        product: 'confluence',
      },
    ],
    error: false,
  },
  isAnonymousUser: false,
  i18n: {
    home: 'Home',
    apps: 'Apps',
    'applinks.error': 'Applinks error',
    configure: 'Configure',
    recent: 'Recent',
    'try.other.apps': 'Try Other Atlassian Apps',
    'don\'t.show.this.again': 'Don’t show this again',
    'container.confluence-space': 'Space',
    'container.jira-project': 'Project',
    'try.lozenge': 'try',
  },
  isDropdownOpenInitially: false,
  trigger: () => {},
};

describe(name, () => {
  it('should pass dropdown options to StatelessDropdown', () => {
    const wrapper = shallow(
      <AppSwitcher {...data} dropdownOptions={{ test: 'test' }} />
    );

    expect(wrapper.find(DropdownMenuStateless).prop('test')).toBe('test');
  });

  it('should pass isLoading to StatelessDropdown', () => {
    expect(shallow(
      <AppSwitcher
        {...data}
        isLoading
      />).find(DropdownMenuStateless).prop('isLoading')
    ).toBe(true);

    expect(shallow(
      <AppSwitcher
        {...data}
        isLoading={false}
      />).find(DropdownMenuStateless).prop('isLoading')
    ).toBe(false);
  });

  it('should invoke the open callback when it opens', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <AppSwitcher {...data} onAppSwitcherOpen={spy} />
    );
    expect(spy).toHaveBeenCalledTimes(0);

    wrapper.instance().onOpenChange({
      isOpen: true,
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should invoke the suggested application callback when the appropriate item is clicked', () => {
    jest.useFakeTimers();
    const spy = jest.fn();
    const linkedApplications = {
      ...data.linkedApplications,
      suggested: [{
        name: 'Confluence',
        product: 'confluence',
        onClick: spy,
      }],
    };
    const wrapper = mount(
      <AppSwitcher {...data} isDropdownOpenInitially linkedApplications={linkedApplications} />
    );
    expect(wrapper.find('.app-switcher-suggested-application')).toHaveLength(1);
    wrapper.find('.app-switcher-suggested-application').simulate('click');
    jest.runAllTimers();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should not show any suggested applications if the user is anonymous', () => {
    const linkedApplications = {
      ...data.linkedApplications,
      suggested: [{
        name: 'Confluence',
        product: 'confluence',
        onClick: () => {},
      }],
    };
    const wrapper = mount(
      <AppSwitcher
        {...data}
        isDropdownOpenInitially
        isAnonymousUser
        linkedApplications={linkedApplications}
      />
    );
    expect(wrapper.find('.app-switcher-suggested-application')).toHaveLength(0);
  });
});
