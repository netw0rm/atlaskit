/* tslint:disable:variable-name */
import * as React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@kadira/storybook';
import {StoryList} from '@atlaskit/media-test-helpers';

import { MediaImage } from '../src/utils/mediaImage';
import {tallImage, wideImage, wideTransparentImage, smallImage, smallTransparentImage} from '@atlaskit/media-test-helpers';

const ImageWrapper = styled.div`
  border: 3px solid #ccc;
  background-color: #ccc;
  width: 300px;
  height: 150px;
`;

storiesOf('MediaImage', {})
  .add('Default', () => (
    <StoryList>
      {[{
        title: 'Tall image inside small wrapper',
        content: <ImageWrapper><MediaImage dataURI={tallImage} /></ImageWrapper>
      }, {
        title: 'Wide image inside small wrapper',
        content: <ImageWrapper><MediaImage dataURI={wideImage} /></ImageWrapper>
      }, {
        title: 'Small image inside small wrapper',
        content: <ImageWrapper><MediaImage dataURI={smallImage} /></ImageWrapper>
      }, {
        title: 'Small transparent image inside small wrapper',
        content: <ImageWrapper><MediaImage dataURI={smallTransparentImage} /></ImageWrapper>
      }, {
        title: 'Big transparent image inside small wrapper',
        content: <ImageWrapper><MediaImage dataURI={wideTransparentImage} /></ImageWrapper>
      }, {
        title: 'No background',
        content: <ImageWrapper><MediaImage dataURI={wideTransparentImage} transparentFallback={false} /></ImageWrapper>
      }, {
        title: 'No cropping',
        content: <ImageWrapper><MediaImage dataURI={tallImage} crop={false} /></ImageWrapper>
      }, {
        title: 'No animation',
        content: <ImageWrapper><MediaImage dataURI={tallImage} fadeIn={false} /></ImageWrapper>
      }, {
        title: 'Custom pixel dimensions: 100x50',
        content: <ImageWrapper><MediaImage dataURI={tallImage} width={'100px'} height={'50px'} /></ImageWrapper>
      }, {
        title: 'Custom percentage dimensions: 80%x40%',
        content: <ImageWrapper><MediaImage dataURI={tallImage} width={'80%'} height={'40%'} /></ImageWrapper>
      }, {
        title: 'Border radius',
        content: <ImageWrapper style={{borderRadius: '10px'}}><MediaImage dataURI={tallImage} /></ImageWrapper>
      }, {
        title: 'Charlie square 115x115',
        content: (
          <ImageWrapper style={{width: '115px', height: '115px'}}>
            <MediaImage dataURI="https://wac-cdn-a.atlassian.com/dam/jcr:89e146b4-642e-41fc-8e65-7848337d7bdd/atlassian_charlie_square.png" />
          </ImageWrapper>
        )
      }, {
        title: 'Charlie 300x180',
        content: (
          <ImageWrapper style={{width: '300px', height: '180px'}}>
            <MediaImage dataURI="https://wac-cdn-a.atlassian.com/dam/jcr:89e146b4-642e-41fc-8e65-7848337d7bdd/atlassian_charlie_square.png" />
          </ImageWrapper>
        )
      }, {
        title: 'Flexbox wrapper',
        content: (
          <div style={{width: '430px', height: '116px', display: 'flex', background: '#eee', border: '1px solid black'}}>
            <MediaImage dataURI="https://wac-cdn-a.atlassian.com/dam/jcr:89e146b4-642e-41fc-8e65-7848337d7bdd/atlassian_charlie_square.png" />
            <div style={{minWidth: '320px'}} />
          </div>
        )
      }]}
    </StoryList>
  ));
