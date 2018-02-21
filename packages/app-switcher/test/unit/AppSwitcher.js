/* eslint-disable no-console */
import { shallow, mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import { DropdownMenuStateless } from '@atlaskit/dropdown-menu';
import Lozenge from '@atlaskit/lozenge';
import { Link } from '../../src/styled';
import AppSwitcher from '../../src';
import { name } from '../../package.json';

const data = {
  recentContainers: [
    {
      content: '',
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
    'don\'t.show.this.again': 'Don’t show this again',
    'container.confluence-space': 'Space',
    'container.jira-project': 'Project',
    'try.lozenge': 'try',
  },
  isDropdownOpenInitially: false,
  trigger: () => {},
};

describe(name, () => {
  beforeEach(() => {
    sinon.stub(console, 'error');
  });

  afterEach(() => {
    console.error.restore();
  });
  it('should pass dropdown options to StatelessDropdown', () => {
    const wrapper = shallow(
      <AppSwitcher {...data} dropdownOptions={{ items: [{ items: [{ content: 'test' }] }] }} />
    );
    expect(wrapper.find(DropdownMenuStateless).prop('items')[0].items[0].content).toBe('test');
  });

  it('should pass isLoading to StatelessDropdown', () => {
    expect(shallow(
      <AppSwitcher
        {...data}
        isLoading
        dropdownOptions={{ items: [{ items: [{ content: 'test' }] }] }}
      />).find(DropdownMenuStateless).prop('isLoading')
    ).toBe(true);

    expect(shallow(
      <AppSwitcher
        {...data}
        isLoading={false}
        dropdownOptions={{ items: [{ items: [{ content: 'test' }] }] }}
      />).find(DropdownMenuStateless).prop('isLoading')
    ).toBe(false);
  });

  it('should invoke the open callback when it opens', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <AppSwitcher
        {...data}
        dropdownOptions={{ items: [{ items: [{ content: 'test' }] }] }}
        onAppSwitcherOpen={spy}
      />
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
      items: [{ items: [{ content: 'test' }] }],
      suggested: [{
        name: 'Confluence',
        product: 'confluence',
        onClick: spy,
      }],
    };
    const wrapper = mount(
      <AppSwitcher
        {...data}
        isDropdownOpenInitially
        linkedApplications={linkedApplications}
      />
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
        dropdownOptions={{ items: [{ items: [{ content: 'test' }] }] }}
        linkedApplications={linkedApplications}
      />
    );
    expect(wrapper.find('.app-switcher-suggested-application')).toHaveLength(0);
  });

  it('should show linked application labels', () => {
    const label = '7 Days Left';
    const linkedApplications = {
      ...data.linkedApplications,
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
          label,
        },
      ],
    };
    const wrapper = mount(
      <AppSwitcher
        {...data}
        isDropdownOpenInitially
        linkedApplications={linkedApplications}
      />
    );
    const labelLozenge = wrapper.find(Lozenge);
    expect(labelLozenge).toHaveLength(1);
    expect(labelLozenge.text()).toBe(label);
  });

  it('should show links', () => {
    const links = [{
      text: 'Add payment details',
      url: 'https://google.com/',
    }, {
      text: 'Request a trial extension...',
      url: 'https://example.com/',
      ref: 'xyz',
    }];
    const wrapper = mount(
      <AppSwitcher
        {...data}
        isDropdownOpenInitially
        links={links}
      />
    );
    links.forEach(({ text }) => {
      const link = wrapper.find(Link).filterWhere(l => l.text() === text);
      expect(link).toHaveLength(1);
    });
  });

  it('should not render any links when it is empty', () => {
    const wrapper = mount(
      <AppSwitcher
        {...data}
        recentContainers={[]}
        linkedApplications={{
          configureLink: 'https://www.atlassian.com',
          apps: [],
          error: false,
        }}
      />
    );
    expect(wrapper.find(Link)).toHaveLength(0);
  });
});
