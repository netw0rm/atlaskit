/* tslint:disable:variable-name */
import { storiesOf } from '@kadira/storybook';
import * as React from 'react';
import {tallImage, wideImage, remoteImage} from '@atlaskit/media-test-helpers';
import {ImageNavigator} from '../../src';
import {CoverWrapper, Image} from './styled';

let onLoadParams;
let imageElement;

const onLoad = (params) => {
  onLoadParams = params;
};

const exportImage = () => {
  const imageData = onLoadParams.export();

  imageElement.src = imageData;
};

const handleImgRef = (img) => {
  imageElement = img;
};

storiesOf('Image navigator', {})
  .add('Local image', () => (
    <div>
      <ImageNavigator imageSource={tallImage} onLoad={onLoad} />
      <button onClick={exportImage}>Export</button>
      <Image src="" alt="" ref={handleImgRef} />
    </div>
  ))
  .add('Auto width => cover image use case', () => (
    <div>
      <CoverWrapper>
        <ImageNavigator imageSource={wideImage} containerWidth="auto" onLoad={onLoad} />
      </CoverWrapper>
      <button onClick={exportImage}>Export</button>
      <Image src="" alt="" ref={handleImgRef} />
    </div>
  ))
  .add('Remote image', () => (
    <div>
      <ImageNavigator imageSource={remoteImage} onLoad={onLoad} />
      <button onClick={exportImage}>Export</button>
      <Image src="" alt="" ref={handleImgRef} />
    </div>
  ))
  .add('Uploader', () => (
    <div>
      <ImageNavigator onLoad={onLoad} />
      <button onClick={exportImage}>Export</button>
      <Image src="" alt="" ref={handleImgRef} />
    </div>
  ));
