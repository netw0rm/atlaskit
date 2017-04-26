import * as React from 'react';
import { Component } from 'react';
import { storiesOf, action } from '@kadira/storybook';
import {
  StoryList,
  Matrix,
  createStorybookContext,
  defaultCollectionName as collectionName,
  videoUrlPreviewId,
  audioUrlPreviewId,
  imageUrlPreviewId,
  docUrlPreviewId,
  unknownUrlPreviewId,
  genericUrlPreviewId,
  youTubeUrlPreviewId,
  spotifyUrlPreviewId,
  soundcloudUrlPreviewId,
  publicTrelloBoardUrlPreviewId,
  privateTrelloBoardUrlPreviewId,
  errorLinkId,
  videoFileId,
  audioFileId,
  imageFileId,
  docFileId,
  unknownFileId,
  errorFileId
} from '@atlaskit/media-test-helpers';
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
      id: 'fd4c4672-323a-4b6c-8326-223169e2a13e',
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
    // file cards
    const videoLinkCard = <Card context={context} identifier={videoUrlPreviewId} />;
    const imageLinkCard = <Card context={context} identifier={imageUrlPreviewId} />;
    const audioLinkCard = <Card context={context} identifier={audioUrlPreviewId} />;
    const docLinkCard = <Card context={context} identifier={docUrlPreviewId} />;
    const unknownLinkCard = <Card context={context} identifier={unknownUrlPreviewId} />;

    // link cards
    const videoFileCard = <Card context={context} identifier={videoFileId} />;
    const imageFileCard = <Card context={context} identifier={imageFileId} />;
    const audioFileCard = <Card context={context} identifier={audioFileId} />;
    const docFileCard = <Card context={context} identifier={docFileId} />;
    const unknownFileCard = <Card context={context} identifier={unknownFileId} />;

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
                <td><div>{audioFileCard}</div></td>
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
  })
  .add('Files', () => {
    // standard
    const successIdentifier: MediaIdentifier = imageFileId;
    const standardCards = [
      {
        title: 'Small',
        content: <Card identifier={successIdentifier} context={context} appearance="small" />
      }, {
        title: 'Image',
        content: <Card identifier={successIdentifier} context={context} appearance="image" />
      }
    ];

    // errors
    const errorCards = [
      {
        title: 'Small',
        content: <Card identifier={errorFileId} context={context} appearance="small" />
      }, {
        title: 'Image',
        content: <Card identifier={errorFileId} context={context} appearance="image" />
      }
    ];

    // menu
    const menuActions = [
      {label: 'Open', handler: () => { action('open')(); }},
      {label: 'Close', handler: () => { action('close')(); }}
    ];
    const menuCards = [
      {
        title: 'Small',
        content: <Card identifier={successIdentifier} context={context} appearance="small" actions={menuActions} />
      }, {
        title: 'Image',
        content: <Card identifier={successIdentifier} context={context} appearance="image" actions={menuActions} />
      }
    ];

    // selectable
    const selectableCards = [
      {
        title: 'image - Not selected',
        content: <Card identifier={successIdentifier} context={context} appearance="image" selectable />
      }, {
        title: 'image - Selected',
        content: <Card identifier={successIdentifier} context={context} appearance="image" selectable selected />
      }
    ];

    // no thumbnail
    const noThumbnailCards = [
      {
        title: 'Small',
        content: <Card identifier={unknownFileId} context={context} appearance="small" />
      }, {
        title: 'Image',
        content: <Card identifier={unknownFileId} context={context} appearance="image" />
      }
    ];

    return (
      <div>
        <h1 style={{margin: '10px 20px'}}>File cards</h1>
        <div style={{margin: '20px 40px'}}>
          <h3>Standard</h3>
          <StoryList>{standardCards}</StoryList>

          <h3>Error</h3>
          <StoryList>{errorCards}</StoryList>

          <h3>Menu</h3>
          <StoryList>{menuCards}</StoryList>

          <h3>Seletable</h3>
          <StoryList>{selectableCards}</StoryList>

          <h3>Thumbnail not available</h3>
          <StoryList>{noThumbnailCards}</StoryList>
        </div>
      </div>
    );
  }).add('Links', () => {
    // standard
    const standardCards = [
      {
        title: 'Small',
        content: <Card identifier={genericUrlPreviewId} context={context} appearance="small" />
      }, {
        title: 'Image',
        content: <Card identifier={genericUrlPreviewId} context={context} appearance="image" />
      }, {
        title: 'Horizontal',
        content: <Card identifier={genericUrlPreviewId} context={context} appearance="horizontal" />
      }, {
        title: 'Square',
        content: <Card identifier={genericUrlPreviewId} context={context} appearance="square" />
      }
    ];

    // errors
    const errorCards = [
      {
        title: 'Small',
        content: <Card identifier={errorLinkId} context={context} appearance="small" />
      }, {
        title: 'Image',
        content: <Card identifier={errorLinkId} context={context} appearance="image" />
      }, {
        title: 'Horizontal',
        content: <Card identifier={errorLinkId} context={context} appearance="horizontal" />
      }, {
        title: 'Square',
        content: <Card identifier={errorLinkId} context={context} appearance="square" />
      }
    ];

    const playerCards = [
      {
        title: 'YouTube',
        content: <Card identifier={youTubeUrlPreviewId} context={context} />
      }, {
        title: 'Spotify',
        content: <Card identifier={spotifyUrlPreviewId} context={context} />
      }, {
        title: 'Sound Cloud',
        content: <Card identifier={soundcloudUrlPreviewId} context={context} />
      }
    ];

    const trelloCards = [
      {
        title: 'Public board',
        content: <Card identifier={publicTrelloBoardUrlPreviewId} context={context} />
      }, {
        title: 'Private board',
        content: <Card identifier={privateTrelloBoardUrlPreviewId} context={context} />
      }
    ];

    return (
      <div>
        <h1 style={{margin: '10px 20px'}}>Link cards</h1>
        <div style={{margin: '20px 40px'}}>
          <h3>Standard</h3>
          <StoryList>{standardCards}</StoryList>

          <h3>Error</h3>
          <StoryList>{errorCards}</StoryList>

          <h3>Player cards</h3>
          <StoryList>{playerCards}</StoryList>

          <h3>Trello cards</h3>
          <StoryList>{trelloCards}</StoryList>
        </div>
      </div>
    );
  });
