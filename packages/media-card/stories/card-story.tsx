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
                <td>No design implemented</td>
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

    // file cards
    const videoLinkCard = <Card context={context} identifier={videoUrlIdentifier} />;
    const imageLinkCard = <Card context={context} identifier={imageUrlIdentifier} />;

    // link cards
    const videoFileCard = <Card context={context} identifier={videoFileIdentifier} />;
    const imageFileCard = <Card context={context} identifier={imageFileIdentifier} />;

    return (
      <div style={{margin: '40px'}}>
        <h1>Media type matrix</h1>
        <Matrix>
            <thead>
              <tr>
                <td />
                <td>video</td>
                <td>image</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>File Cards</td>
                <td><div>{videoFileCard}</div></td>
                <td><div>{imageFileCard}</div></td>
              </tr>
              <tr>
                <td>Link Cards</td>
                <td><div>{videoLinkCard}</div></td>
                <td><div>{imageLinkCard}</div></td>
              </tr>
            </tbody>
        </Matrix>
      </div>
    );
  });

