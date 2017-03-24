import * as React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { MediaItem, CardDelete, CardClick } from '@atlaskit/media-core';
import { Matrix, createStorybookContext, defaultCollectionName as collectionName } from '@atlaskit/media-test-helpers';
import { Card, UrlPreviewIdentifier, MediaIdentifier } from '../src';

const context = createStorybookContext();

storiesOf('Card', {})
  .add('Appearence matrix', () => {
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
                <td>{smallLinkCard}</td>
                <td>No design implemented</td>
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
  });

