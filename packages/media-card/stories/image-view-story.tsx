/* tslint:disable:variable-name */
import * as React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@kadira/storybook';
import {StoryList} from '@atlaskit/media-test-helpers';

import { ImageView } from '../src/imageView';
import {tallImage, wideImage, wideTransparentImage, smallImage, smallTransparentImage} from './images';

const ImageWrapper = styled.div`
  border: 3px solid #ccc;
  background-color: #ccc;
  width: 300px;
  height: 150px;
`;

storiesOf('ImageView', {})
  .add('Default', () => (
    <StoryList>
      {[{
        title: 'Tall image inside small wrapper',
        content: <ImageWrapper><ImageView dataURI={tallImage} /></ImageWrapper>
      }, {
        title: 'Wide image inside small wrapper',
        content: <ImageWrapper><ImageView dataURI={wideImage} /></ImageWrapper>
      }, {
        title: 'Small image inside small wrapper',
        content: <ImageWrapper><ImageView dataURI={smallImage} /></ImageWrapper>
      }, {
        title: 'Small transparent image inside small wrapper',
        content: <ImageWrapper><ImageView dataURI={smallTransparentImage} /></ImageWrapper>
      }, {
        title: 'Big transparent image inside small wrapper',
        content: <ImageWrapper><ImageView dataURI={wideTransparentImage} /></ImageWrapper>
      }, {
        title: 'No background',
        content: <ImageWrapper><ImageView dataURI={wideTransparentImage} transparentFallback={false} /></ImageWrapper>
      }, {
        title: 'No cropping',
        content: <ImageWrapper><ImageView dataURI={tallImage} crop={false} /></ImageWrapper>
      }, {
        title: 'No animation',
        content: <ImageWrapper><ImageView dataURI={tallImage} fadeIn={false} /></ImageWrapper>
      }, {
        title: 'Custom pixel dimensions: 100x50',
        content: <ImageWrapper><ImageView dataURI={tallImage} width={'100px'} height={'50px'} /></ImageWrapper>
      }, {
        title: 'Custom percentage dimensions: 80%x40%',
        content: <ImageWrapper><ImageView dataURI={tallImage} width={'80%'} height={'40%'} /></ImageWrapper>
      }, {
        title: 'Border radius',
        content: <ImageWrapper style={{borderRadius: '10px'}}><ImageView dataURI={tallImage} /></ImageWrapper>
      }]}
    </StoryList>
  ));
