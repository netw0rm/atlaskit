/* tslint:disable:variable-name */
import { storiesOf } from '@kadira/storybook';
import * as React from 'react';
import {Component} from 'react';
import {tallImage, remoteImage} from '@atlaskit/media-test-helpers';
import FieldText from '@atlaskit/field-text';
import {ImageNavigator} from '../../src';
import {CoverWrapper, Image, FieldTextWrapper} from './styled';

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

const remoteImages = [
  'http://pic.templetons.com/brad/pano/midpano/center-wide.jpg',
  'https://www.easycalculation.com/area/images/big-square.gif'
];

class CoverImage extends Component<{}, {}> {
  state = {
    imageSource: remoteImages[0]
  };

  onImageSourceChange = e => {
    const imageSource = e.target.value;
    this.setState({imageSource});
  }

  toggleImage = () => {
    const {imageSource} = this.state;
    const currentIndex = remoteImages.indexOf(imageSource);
    const index = currentIndex >= remoteImages.length - 1 ? 0 : currentIndex + 1;

    this.setState({imageSource: remoteImages[index]});
  }

  render() {
    const {imageSource} = this.state;

    return (
      <div>
        <FieldTextWrapper>
          <FieldText value={imageSource} label="image source" onChange={this.onImageSourceChange} shouldFitContainer={true} />
          <button onClick={this.toggleImage}>Toggle image</button>
        </FieldTextWrapper>
        <CoverWrapper>
          <ImageNavigator allowZooming={false} mask="none" imageSource={imageSource} containerWidth="auto" onLoad={onLoad} />
        </CoverWrapper>
        <button onClick={exportImage}>Export</button>
        <Image src="" alt="" innerRef={handleImgRef} />
      </div>
    );
  }
}

storiesOf('Image navigator', {})
  .add('Local image', () => (
    <div>
      <ImageNavigator imageSource={tallImage} onLoad={onLoad} />
      <button onClick={exportImage}>Export</button>
      <Image src="" alt="" innerRef={handleImgRef} />
    </div>
  ))
  .add('Auto width => cover image use case', () => (
    <CoverImage />
  ))
  .add('Remote image', () => (
    <div>
      <ImageNavigator imageSource={remoteImage} onLoad={onLoad} />
      <button onClick={exportImage}>Export</button>
      <Image src="" alt="" innerRef={handleImgRef} />
    </div>
  ))
  .add('Uploader', () => (
    <div>
      <ImageNavigator onLoad={onLoad} />
      <button onClick={exportImage}>Export</button>
      <Image src="" alt="" innerRef={handleImgRef} />
    </div>
  ));
