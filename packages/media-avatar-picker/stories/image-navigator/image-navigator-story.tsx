/* tslint:disable:variable-name */
import { storiesOf } from '@kadira/storybook';
import * as React from 'react';
import {tallImage} from '@atlaskit/media-test-helpers';
import {ImageNavigator} from '../../src';

let onLoadParams;
let imageElement;

const onLoad = (params) => {
  onLoadParams = params;
};
const exportImage = () => {
  const imageData = onLoadParams.export();

  imageElement.src = imageData;
};

storiesOf('Image navigator', {})
  .add('default', () => {
    return <div>
            <ImageNavigator imageSource={tallImage} onLoad={onLoad} />
            <button onClick={exportImage}>Export</button>
            <img style={{position: 'absolute', top: 0, left: '300px'}} src="" alt="" ref={(image) => imageElement = image} />
           </div>;
  });
