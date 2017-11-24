import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { name } from '../package.json';
import AudioCircleIcon from '@atlaskit/icon/glyph/audio-circle';
import { AnalyticsListener } from '@atlaskit/analytics';

import BasicNavigation from './components/BasicNavigation';
import BasicQuickSearch from './components/BasicQuickSearch';
import { AkNavigationItemGroup, quickSearchResultTypes } from '../src';
import { WithRootTheme } from '../src/theme/util';
import * as presets from '../src/theme/presets';
import QuickSearchWithCustomResults from './examples/quicksearch/SupplyingCustomResultsToApi';
import { ConfluenceSpaceResult, JiraProjectResult, RoomResult } from './examples/quicksearch/ExtendingResultTypes';

const noOpInteractionProps = {
  isSelected: false,
  onClick: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  resultId: 'default_result_id',
};

const {
  ContainerResult,
  ObjectResult,
  PersonResult,
  ResultBase,
} = quickSearchResultTypes;

import sampleAvatars from './examples/90-sample-avatars';

const withRootTheme = children => (
  <WithRootTheme provided={presets.container}>
    {children}
  </WithRootTheme>
);

const getPersonAvatarUrl = identity => `http://api.adorable.io/avatar/32/${identity}`;
const getContainerAvatarUrl = idx => `http://lorempixel.com/32/32/nature/${idx}`;

storiesOf(`${name}/QuickSearch`, module)
  .add('Example implementation', () => withRootTheme(
    <BasicNavigation
      openDrawer="search"
      searchDrawerContent={<BasicQuickSearch />}
    />
  ))
  .add('Example with search latency', () => withRootTheme(
    <BasicNavigation
      openDrawer="search"
      searchDrawerContent={<BasicQuickSearch fakeNetworkLatency={500} />}
    />
  ))
  .add('Example with custom result types', () => withRootTheme(
    QuickSearchWithCustomResults
  ))
  .add('Example that logs analytics', () => withRootTheme(
    <AnalyticsListener onEvent={(...e) => { console.log('Public event', e); }}>
      <AnalyticsListener matchPrivate onEvent={(...e) => { console.log('Private event', e); }}>
        <BasicNavigation
          openDrawer="search"
          searchDrawerContent={<BasicQuickSearch />}
        />
      </AnalyticsListener>
    </AnalyticsListener>
  ))
  .add('Example results', () => withRootTheme(
    <div style={{ padding: '32px', maxWidth: '640px', textAlign: 'justify' }}>
      <h3>People</h3>
      People results have circular avatar and a name.
      They can optionally display a mention handle and presence.
      <AkNavigationItemGroup title="People examples" key="People examples">
        <PersonResult
          {...noOpInteractionProps}
          avatarUrl={getPersonAvatarUrl('owkenobi')}
          mentionName="BenKen"
          name="Obi Wan Kenobi"
          presenceState="online"
        />
        <PersonResult
          {...noOpInteractionProps}
          avatarUrl={getPersonAvatarUrl('qgjinn')}
          mentionName="MasterQ"
          name="Qui-Gon Jinn"
          presenceMessage="On-call"
          presenceState="offline"
        />
        <PersonResult
          {...noOpInteractionProps}
          avatarUrl={getPersonAvatarUrl('sidious')}
          mentionName="TheEmperor"
          mentionPrefix="#"
          name="Palpatine"
          presenceMessage="Custom mention prefix"
          presenceState="busy"
        />
        <PersonResult {...noOpInteractionProps} key="4" name="Minimum detail person" />
      </AkNavigationItemGroup>
      <h3>Containers</h3>
      Containers have square avatars, can be marked as private and have a name and subText fields.
      <AkNavigationItemGroup title="Container examples" key="Container examples">
        <ContainerResult
          {...noOpInteractionProps}
          avatarUrl={getContainerAvatarUrl(3)}
          name="Cargo boxes"
          subText="They're big!"
          type="container"
        />
        <ContainerResult
          {...noOpInteractionProps}
          isPrivate
          name="Private container"
        />
        <ContainerResult {...noOpInteractionProps} key="3" name="Minimum detail container" />
      </AkNavigationItemGroup>
      <AkNavigationItemGroup title="Confluence space example" key="Confluence space example">
        <ConfluenceSpaceResult
          {...noOpInteractionProps}
          avatarUrl={getContainerAvatarUrl(4)}
          isPrivate
          name="Phillip Jacobs' personal space"
          spaceType="Space"
        />
      </AkNavigationItemGroup>
      <AkNavigationItemGroup title="Jira project example" key="Jira project example">
        <JiraProjectResult
          {...noOpInteractionProps}
          avatarUrl={getContainerAvatarUrl(5)}
          name="Atlaskit"
          projectType="Software project"
        />
      </AkNavigationItemGroup>
      <AkNavigationItemGroup title="HipChat room example" key="HipChat room example">
        <RoomResult
          {...noOpInteractionProps}
          avatarUrl={getContainerAvatarUrl(1)}
          isPrivate
          name="No Homers"
          topic="We're allowed one"
        />
      </AkNavigationItemGroup>

      <h3>Objects</h3>
      Like containers, objects have square avatars and a name and can be marked as private,
      however, instead of a free subText field, they display the name of their containing
      entity.  They can optionally display an object key.
      <AkNavigationItemGroup title="Object examples" key="Object examples">
        <ObjectResult
          {...noOpInteractionProps}
          avatarUrl={sampleAvatars.jiraIssueBug}
          name="Too much awesomeness in one repo"
          objectKey="AK-9001"
          containerName="Atlaskit"
        />
        <ObjectResult
          {...noOpInteractionProps}
          avatarUrl={sampleAvatars.confluenceBlog}
          name="Yeah, I cut my dev loop in half, but you'll never guess what happened next!"
          containerName="Buzzfluence"
        />
        <ObjectResult
          {...noOpInteractionProps}
          avatarUrl={sampleAvatars.confluencePage}
          name="Prank schedule: April 2017"
          containerName="The Scream Team"
          isPrivate
        />
      </AkNavigationItemGroup>

      <h3>Miscellaneous</h3>
      If the preset result types do not support the shape required, ResultBase can be used
      directly or composed to help create QuickSearch compatible results. Fully custom result
      types can be created from scratch and still be QuickSearch compatible as long as they
      implement the required props
      <AkNavigationItemGroup title="Miscellaneous examples" key="Miscellaneous examples">
        <ResultBase
          {...noOpInteractionProps}
          text="I don't even have an icon or subText"
        />
        <ResultBase
          {...noOpInteractionProps}
          caption="#ReSuLtsUNl3a$h3d!"
          icon={<AudioCircleIcon label="a" size="large" primaryColor="#FFEBE5" secondaryColor="RebeccaPurple" />}
          text="Cronenberg result"
          subText="Anything goes!"
        />
      </AkNavigationItemGroup>
    </div>
  ))
;
