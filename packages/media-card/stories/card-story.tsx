import * as React from 'react';
import { Component } from 'react';
import { storiesOf } from '@kadira/storybook';
import { StoryList, Matrix, createStorybookContext, defaultCollectionName as collectionName } from '@atlaskit/media-test-helpers';
import { Card, UrlPreviewIdentifier, MediaIdentifier } from '../src';

const context = createStorybookContext();

storiesOf('Card', {})
  .add('Live preview', () => {
    const inputStyles = {
      display: 'inline-block',
      margin: '0 20px 20px',
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
        const identifier: UrlPreviewIdentifier = {
          mediaItemType: 'link',
          url: this.state.link
        };

        return <div style={{margin: '20px'}}>
          <input style={inputStyles} type="text" autoFocus={true} placeholder="Paste some url..." defaultValue={this.state.link} onInput={this.onInputChange} />
          <button onClick={this.onAddLink}>Add link</button>
          {loading}
          <Card
            identifier={identifier}
            onLoadingChange={this.onLoadingChange}
            context={context}
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
        context.addLinkItem(link, collectionName);
      }
    }

    return <LiveUrlConverter />;
  }).add('Appearence matrix', () => {
    const genericUrlIdentifier: UrlPreviewIdentifier = {
      mediaItemType: 'link',
      url: 'https://atlassian.com'
    };

    const fileIdentifier: MediaIdentifier = {
      mediaItemType: 'file',
      id: '2dfcc12d-04d7-46e7-9fdf-3715ff00ba40',
      collectionName
    };

    // file cards
    const smallFileCard = <Card context={context} identifier={fileIdentifier} appearance="small" />;
    const imageFileCard = <Card context={context} identifier={fileIdentifier} />;

    // link cards
    const smallLinkCard = <Card context={context} identifier={genericUrlIdentifier} appearance="small" dimensions={{width: '200px'}} />;
    const linkCardImage = <Card context={context} identifier={genericUrlIdentifier} appearance="image" />;
    const horizontalLinkCard = <Card context={context} identifier={genericUrlIdentifier} />;
    const squareLinkCard = <Card context={context} identifier={genericUrlIdentifier} appearance="square" />;

    return (
      <div style={{margin: '40px'}}>
        <h1>Appearence matrix</h1>
        <Matrix>
            <thead>
              <tr>
                <td />
                <td>small</td>
                <td>image</td>
                <td>horizontal</td>
                <td>square</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>File Cards</td>
                <td>
                  <div>{smallFileCard}</div>
                </td>
                <td>
                  <div>{imageFileCard}</div>
                </td>
                <td>No design implemented</td>
                <td>No design implemented</td>
              </tr>
              <tr>
                <td><div>Link Cards</div></td>
                <td><div>{smallLinkCard}</div></td>
                <td><div>{linkCardImage}</div></td>
                <td>
                  <div>{horizontalLinkCard}</div>
                </td>
                <td>
                  <div>{squareLinkCard}</div>
                </td>
              </tr>
            </tbody>
        </Matrix>
      </div>
    );
  }).add('Media type matrix', () => {
    const videoUrlIdentifier: UrlPreviewIdentifier = {
      mediaItemType: 'link',
      url: 'https://www.youtube.com/watch?v=4OkP5_1qb7Y'
    };

    const imageUrlIdentifier: UrlPreviewIdentifier = {
      mediaItemType: 'link',
      url: 'https://i.ytimg.com/vi/iLbyjaF8Cyc/maxresdefault.jpg'
    };

    const audioUrlIdentifier: UrlPreviewIdentifier = {
      mediaItemType: 'link',
      url: 'https://devchat.cachefly.net/javascriptjabber/JSJ243_Immutable.js_with_Lee_Byron.mp3'
    };

    const docUrlIdentifier: UrlPreviewIdentifier = {
      mediaItemType: 'link',
      url: 'https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf'
    };

    const unknownLinkIdentifier: UrlPreviewIdentifier = {
      mediaItemType: 'link',
      url: 'https://www.reddit.com/r/javascript/'
    };

    const videoFileIdentifier: MediaIdentifier = {
      mediaItemType: 'file',
      id: '1b01a476-83b4-4f44-8192-f83b2d00913a', // mp4 video
      collectionName
    };

    const imageFileIdentifier: MediaIdentifier = {
      mediaItemType: 'file',
      id: '5556346b-b081-482b-bc4a-4faca8ecd2de', // jpg image
      collectionName
    };

    const docFileIdentifier: MediaIdentifier = {
      mediaItemType: 'file',
      id: '71cd7e7d-4e86-4b89-a0b4-7f6ffe013c94',
      collectionName
    };

    const unknownFileIdentifier: MediaIdentifier = {
      mediaItemType: 'file',
      id: 'e0652e68-c596-4800-8a91-1920e6b8a585',
      collectionName
    };

    // file cards
    const videoLinkCard = <Card context={context} identifier={videoUrlIdentifier} />;
    const imageLinkCard = <Card context={context} identifier={imageUrlIdentifier} />;
    const audioLinkCard = <Card context={context} identifier={audioUrlIdentifier} />;
    const docLinkCard = <Card context={context} identifier={docUrlIdentifier} />;
    const unknownLinkCard = <Card context={context} identifier={unknownLinkIdentifier} />;

    // link cards
    const videoFileCard = <Card context={context} identifier={videoFileIdentifier} />;
    const imageFileCard = <Card context={context} identifier={imageFileIdentifier} />;
    const docFileCard = <Card context={context} identifier={docFileIdentifier} />;
    const unknownFileCard = <Card context={context} identifier={unknownFileIdentifier} />;

    return (
      <div style={{margin: '40px'}}>
        <h1>Media type matrix</h1>
        <Matrix>
            <thead>
              <tr>
                <td />
                <td>File Cards</td>
                <td>Link Cards</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>video</td>
                <td><div>{videoFileCard}</div></td>
                <td><div>{videoLinkCard}</div></td>
              </tr>
              <tr>
                <td>image</td>
                <td><div>{imageFileCard}</div></td>
                <td><div>{imageLinkCard}</div></td>
              </tr>
              <tr>
                <td>audio</td>
                <td />
                <td><div>{audioLinkCard}</div></td>
              </tr>
              <tr>
                <td>doc</td>
                <td><div>{docFileCard}</div></td>
                <td><div>{docLinkCard}</div></td>
              </tr>
              <tr>
                <td>unknown</td>
                <td><div>{unknownFileCard}</div></td>
                <td><div>{unknownLinkCard}</div></td>
              </tr>
            </tbody>
        </Matrix>
      </div>
    );
  }).add('Thumbnail not available', () => {
    const fileThumbnailNotAvailableId = '64204867-bfa6-4e16-a163-a6477d0f0112';

    const identifier: MediaIdentifier = {
      mediaItemType: 'file',
      id: fileThumbnailNotAvailableId,
      collectionName: collectionName
    };

    const stories = [
      {
        title: 'File card, appearance="image"',
        content: <Card identifier={identifier} context={context} appearance="image" />
      }, {
        title: 'File card, Appearence="small"',
        content: <Card identifier={identifier} context={context} appearance="small" />
      }
    ];

    return <StoryList>{stories}</StoryList>;
  }).add('Selectable card', () => {
    const successfulFileId = '2dfcc12d-04d7-46e7-9fdf-3715ff00ba40';

    const identifier: MediaIdentifier = {
      mediaItemType: 'file',
      id: successfulFileId,
      collectionName: collectionName
    };

    const stories = [
      {
        title: 'File card, not selected',
        content: <Card identifier={identifier} context={context} appearance="image" selectable selected={false} />
      }, {
        title: 'File card, selected',
        content: <Card identifier={identifier} context={context} appearance="image" selectable selected />
      }
    ];

    return <StoryList>{stories}</StoryList>;
  })
  .add('Fatal error', () => {
    const wrongFileId = 'wrong-file-id';

    const identifier: MediaIdentifier = {
      mediaItemType: 'file',
      id: wrongFileId,
      collectionName: collectionName
    };

    const stories = [
      {
        title: 'File card, not selected',
        content: <Card identifier={identifier} context={context} appearance="image" selectable selected={false} />
      }, {
        title: 'File card, selected',
        content: <Card identifier={identifier} context={context} appearance="small" selectable selected />
      }
    ];

    return <StoryList>{stories}</StoryList>;
  }).add('Links', () => {
    const storedLinkIdentifier: MediaIdentifier = {
      mediaItemType: 'link',
      id: 'e2365f30-1e08-4259-9372-56247303d1ec',
      collectionName
    };

    const storedLinkCards = [
      {
        title: 'AirBnB',
        content: <Card identifier={storedLinkIdentifier} context={context} />
      }
    ];

    const youtubeIdentifier: UrlPreviewIdentifier = {
      mediaItemType: 'link',
      url: 'https://www.youtube.com/watch?v=zso6jskUaS8'
    };

    const spotifyIdentifier: UrlPreviewIdentifier = {
      mediaItemType: 'link',
      url: 'https://play.spotify.com/track/2Foc5Q5nqNiosCNqttzHof'
    };

    const soundcloudIdentifier: UrlPreviewIdentifier = {
      mediaItemType: 'link',
      url: 'https://soundcloud.com/kodak-black/tunnel-vision-1'
    };

    const playerCards = [
      {
        title: 'YouTube',
        content: <Card identifier={youtubeIdentifier} context={context} />
      }, {
        title: 'Spotify',
        content: <Card identifier={spotifyIdentifier} context={context} />
      }, {
        title: 'Sound Cloud',
        content: <Card identifier={soundcloudIdentifier} context={context} />
      }
    ];

    const publicTrelloBoardIdentifier: UrlPreviewIdentifier = {
      mediaItemType: 'link',
      url: 'https://trello.com/b/rq2mYJNn/public-trello-boards'
    };

    const privateTrelloBoardIdentifier: UrlPreviewIdentifier = {
      mediaItemType: 'link',
      url: 'https://trello.com/b/hlo7gRqs/shpxxxviii-60'
    };

    const trelloCards = [
      {
        title: 'Public board',
        content: <Card identifier={publicTrelloBoardIdentifier} context={context} />
      }, {
        title: 'Private board',
        content: <Card identifier={privateTrelloBoardIdentifier} context={context} />
      }
    ];

    return (
      <div>
        <StoryList>{storedLinkCards}</StoryList>
        <StoryList>{playerCards}</StoryList>
        <StoryList>{trelloCards}</StoryList>
      </div>
    );
  });
