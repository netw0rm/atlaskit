/* tslint:disable:variable-name */
import * as React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@kadira/storybook';
import {StoryList} from '@atlaskit/media-test-helpers';

import { MediaImage } from '../src';
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
      }]}
    </StoryList>
  ));
