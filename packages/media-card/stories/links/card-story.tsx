import * as React from 'react';
import {Component} from 'react';
import { storiesOf } from '@kadira/storybook';
import { ContextFactory } from '@atlaskit/media-core';
import { LinkCard } from '../../src';
import { StoryList, createStorybookContext, defaultCollectionName } from '@atlaskit/media-test-helpers';

const context = createStorybookContext();

storiesOf('LinkCard', {})
  .add('Live preview', () => {
    const inputStyles = {
      display: 'block',
      marginBottom: '20px',
      width: '300px'
    };

    interface LiveUrlConverterState {
      link: string;
      loading: boolean;
    }

    class LiveUrlConverter extends Component<{}, LiveUrlConverterState> {
      interval: number;

      constructor(props) {
        super(props);
        this.state = {link: 'https://www.atlassian.com', loading: false};
      }

      render() {
        const loading = this.state.loading ? <div>Loading...</div> : null;

        return <div style={{margin: '20px'}}>
          <input style={inputStyles} type="text" autoFocus={true} placeholder="Paste some url..." defaultValue={this.state.link} onInput={this.onInputChange} />
          <button onClick={this.onAddLink}>Add link</button>
          {loading}
          <LinkCard
            context={context}
            link={this.state.link}
            onLoadingChange={this.onLoadingChange}
          />
        </div>;
      }

      onLoadingChange = state => {
        state && this.setState({loading: state.loading});
      }

      onInputChange = (e) => {
        const link = e.target.value;
        this.setState({link});
      }

      onAddLink = () => {
        const {link} = this.state;
        context.addLinkItem(link, defaultCollectionName);
      }

    }

    return <LiveUrlConverter />;
  })
  .add('From url string', () => {
    const linkCardViewHorizontals = [
      {
        title: 'Only required props',
        content: (
          <LinkCard
            context={context}
            link="https://atlassian.com"
          />
        )
      }
    ];

    return <StoryList>{linkCardViewHorizontals}</StoryList>;
  })
  .add('From link and collection id', () => {
    const linkFromId = { id: 'e2365f30-1e08-4259-9372-56247303d1ec', collection: defaultCollectionName };

    const linkCardViewHorizontals = [
      {
        title: 'Only required props',
        content: (
          <LinkCard
            context={context}
            link={linkFromId}
          />
        )
      }
    ];

    return <StoryList>{linkCardViewHorizontals}</StoryList>;
  })
  .add('From playable url string', () => {
    return <StoryList>{[
      {
        title: 'Youtube',
        content: (
          <LinkCard
            context={context}
            link="https://www.youtube.com/watch?v=zso6jskUaS8"
          />
        )
      },
      {
        title: 'Spotify',
        content: (
          <LinkCard
            context={context}
            link="https://play.spotify.com/track/2Foc5Q5nqNiosCNqttzHof"
          />
        )
      },
      {
        title: 'Soundcloud',
        content: (
          <LinkCard
            context={context}
            link="https://soundcloud.com/kodak-black/tunnel-vision-1"
          />
        )
      }
    ]}</StoryList>;
  })
  .add('From trello board url', () => {
    return <StoryList>{[
      {
        title: 'Public Board',
        content: (
          <LinkCard
            context={context}
            link="https://trello.com/b/rq2mYJNn/public-trello-boards"
          />
        )
      },
      {
        title: 'Private Board',
        content: (
          <LinkCard
            context={context}
            link="https://trello.com/b/hlo7gRqs/shpxxxviii-60"
          />
        )
      }
    ]}</StoryList>;
  });
