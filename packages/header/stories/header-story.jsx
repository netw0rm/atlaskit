import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Tabs from '@atlaskit/tabs';
import Readme, { Code, Props } from '@atlaskit/util-readme';
import { Header } from '../src';

/* eslint-disable import/first, import/no-duplicates */
import ReadmeExample from './examples/readme';
import ReadmeExampleRaw from '!raw!./examples/readme';
/* eslint-enable import/first, import/no-duplicates */

storiesOf('Header', module)
  .add('README', () => {
    const description = 'A React component that renders the header.';

    // We can't use Header.propTypes since they use `isRequired` which <Props> can't resolve.
    const propTypes = {
      logoHref: 'string',
      title: 'string',
      titleHref: 'string',
    };

    const propDescriptions = {
      logoHref: 'The href that the Atlassian logo should link to.',
      title: 'The page title.',
      titleHref: 'The href the page title should link to.',
      primaryLinks: 'The links to render next to the title. At least one item should be marked "selected".',
      secondaryLinks: 'Links not currently rendered in desktop. Used for global navigation in mobile view. ' +
      'Link items may optionally include an "onExpand" handler.',
    };

    return (
      <Readme component="Header" description={description}>
        <Code code={ReadmeExampleRaw}>
          {ReadmeExample}
        </Code>
        <Props component={Header} descriptions={propDescriptions} types={propTypes} />
      </Readme>
    );
  })
  .add('Standalone header without links', () => (
    <Header
      logoHref="#home"
      title="JIRA Service Desk Cloud"
      titleHref="#jsdcloud"
    />
  ))
  .add('Standalone header', () => ReadmeExample)
  .add('Header with @atlaskit/tabs', () => (
    <div>
      {ReadmeExample}
      <div className="row" style={{ marginTop: '24px' }}>
        <div className="column large-12">
          <Tabs
            tabs={[
              { defaultSelected: true, label: 'REST API' },
              { label: 'Modules' },
              { label: 'JavaScript API' },
            ]}
          />
        </div>
      </div>
    </div>
  ));
