import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Description, Heading, Props } from '@atlaskit/util-readme';

import AppSwitcher from '../src';
import { name } from '../package.json';

/* eslint-disable import/first, import/no-duplicates */
import BasicUsageExample from './examples/basic-usage';
import BasicUsageExampleRaw from '!raw!./examples/basic-usage';
/* eslint-enable import/first, import/no-duplicates */

const AppSwitcherDescription = (<Description>
  <p>This component provides the app switcher used in Atlassian Cloud products.</p>
</Description>);

const propDescriptions = {
  recentContainers: 'Array of recent containers. If this array is empty the recent container section will be hidden.',
  linkedApplications: 'Map containing an array of linked applications.',
  suggestedApplication: 'Map containing which application to suggest to the user.',
  i18n: 'Mapping of i18n keys to translations.',
  isAnonymousUser: 'If set to true, the home icon, recent containers and suggested application will not display.',
  analytics: 'This function is called when the user performs certain actions in the app switcher. ' +
             'The function supplied should have the following signature: function analyics(eventName, payload) { ... }.',
};

const recentContainerPropDescriptions = [
  {
    name: 'name',
    type: 'String',
    description: 'Name of the container.',
  },
  {
    name: 'url',
    type: 'String',
    description: 'Link to the container.',
  },
  {
    name: 'iconUrl',
    type: 'String',
    description: 'Link to the container\'s icon. Should be 32px square.',
  },
  {
    name: 'type',
    type: 'String',
    description: 'Type of the container. Currently, "confluence-space" and "jira-project" are supported.',
  },
];

const linkedApplicationsPropDescriptions = [
  {
    name: 'configureLink',
    type: 'Boolean|String',
    description: 'A link to configure the applinks for this instance OR false if the user does ' +
                 'not have permission to configure applinks',
  },
  {
    name: 'apps',
    type: 'Array',
    description: 'An array of the application links to display. Each array item is a map with the following keys:',
    children: [
      {
        name: 'name',
        type: 'String',
        description: 'Display name of the application.',
      },
      {
        name: 'url',
        type: 'String',
        description: 'URL of the application.',
      },
      {
        name: 'product',
        type: 'String',
        description: 'Product - e.g. "jira", "confluence" or "custom".',
      },
    ],
  },
  {
    name: 'error',
    type: 'Boolean',
    description: 'If true the app switcher will display an error message.',
  },
];

const suggestedApplicationPropDescriptions = [
  {
    name: 'show',
    type: 'Boolean',
    description: 'Whether to show the suggested application section.',
  },
  {
    name: 'application',
    type: 'String',
    description: 'Application to suggest. "jira" and "confluence" are currently supported.',
  },
  {
    name: 'url',
    type: 'String',
    description: 'Link for the suggested application.',
  },
  {
    name: 'onDontShowAgainClick',
    type: 'Function',
    description: 'Called when the "Don\'t show this again" link is clicked.',
  },
];

const i18nPropDescriptions = [
  {
    name: 'home',
    description: 'Home',
  },
  {
    name: 'apps',
    description: 'Apps',
  },
  {
    name: 'configure',
    description: 'Configure',
  },
  {
    name: 'try.other.apps',
    description: 'Try Other Atlassian Apps',
  },
  {
    name: 'don\'t.show.this.again',
    description: 'Don’t show this again',
  },
  {
    name: 'container.confluence-space',
    description: 'Space',
  },
  {
    name: 'container.jira-project',
    description: 'Project',
  },
  {
    name: 'suggested.application.description.confluence',
    description: 'Collaboration and content sharing',
  },
  {
    name: 'suggested.application.description.jira',
    description: 'Issue & project tracking software',
  },
];

function propDescriptionList(descriptions) {
  const listItems = descriptions.map((item, index) => {
    const children = item.children ? propDescriptionList(item.children) : null;
    const type = item.type ? (<i>({item.type})</i>) : null;

    return (
      <li key={index}>
        <b>{item.name}</b> {type}: {item.description} {children}
      </li>
    );
  });

  return (
    <ul>{listItems}</ul>
  );
}

storiesOf(name, module)
  .add('AppSwitcher Readme', () => (
    <div>
      <Readme
        component={name}
        description={AppSwitcherDescription}
      >
        <Code code={BasicUsageExampleRaw}>
          {BasicUsageExample}
        </Code>
        <Props component={AppSwitcher} descriptions={propDescriptions} />
        <Description>
          <Heading type="3">recentContainers property</Heading>
          <p>
            The recentContainers property is an array containing the recent containers to display.
            Each recent container item is a map with the following keys:
          </p>
          {propDescriptionList(recentContainerPropDescriptions)}

          <Heading type="3">linkedApplications property</Heading>
          <p>
            The linkedApplications property is a map with the following format:
          </p>
          {propDescriptionList(linkedApplicationsPropDescriptions)}

          <Heading type="3">suggestedApplication property</Heading>
          <p>
            The suggestedApplication property is a map with the following format:
          </p>
          {propDescriptionList(suggestedApplicationPropDescriptions)}

          <Heading type="3">i18n property</Heading>
          <p>
            The i18n property is a mapping between translation keys and translations. It should
            contain translations for the following keys:
          </p>
          {propDescriptionList(i18nPropDescriptions)}
        </Description>
      </Readme>
    </div>
  ));
