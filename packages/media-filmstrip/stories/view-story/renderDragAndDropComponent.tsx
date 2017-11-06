/* tslint:disable: variable-name */
import * as React from 'react';
import {Component} from 'react';
import styled from 'styled-components';
import {CardViewProps} from '@atlaskit/media-card';
import {imageFileDetails, smallImage, createStorybookContext, genericFileId, imageFileId, smallImageFileId, audioFileDetails, docFileDetails, unknownFileDetails, videoFileDetails, wideImage, smallTransparentImage, tallImage, audioFileId, videoFileId, wideImageFileId, docFileId} from '@atlaskit/media-test-helpers';
import {Filmstrip} from '../../src/filmstrip';
import {FakeDroppable} from '../../src/fake-droppable/index';

export interface StoryProps {
  dropzoneElement: Element;
}

export interface StoryState {
  dropzone?: Element;
}

const Box = styled.div`
  width: 250px;
  height: 100px;
  margin: 0 5px;
  ${({id}) => {
    return `
      background-color: ${id};
    `;
  }}
`;

const Dropzone = styled.div`
  width: 300px;
  height: 150px;
  border: 2px solid red;
`;

const context = createStorybookContext();
const cardItems = [{
  identifier: genericFileId,
  context
}, {
  identifier: imageFileId,
  context
}, {
  identifier: smallImageFileId,
  context
}, {
  identifier: audioFileId,
  context
}, /*{
  identifier: videoFileId,
  context
}, {
  identifier: wideImageFileId,
  context
}, {
  identifier: docFileId,
  context
}*/];
const cardViewItems: CardViewProps[] = [{
  status: 'complete',
  metadata: imageFileDetails,
  dataURI: tallImage
}, {
  status: 'complete',
  metadata: imageFileDetails,
  dataURI: smallImage
},
{
  status: 'complete',
  metadata: imageFileDetails,
  dataURI: smallImage
}];
const mixedCardItems = [
  ...cardItems,
  ...cardViewItems
];

export class Story extends Component<StoryProps, StoryState> {
  state = {

  }

  render() {
    const {dropzoneElement} = this.props;
    // const fakeDroppable: FakeDroppable = ;
    return (
      <div>
        <h1>Cards</h1>
        <div style={{marginLeft: 100, width: 700}}>
          <Filmstrip items={cardViewItems} dropzoneElement={dropzoneElement} />
        </div>
      </div>
    );
  }
}

export default () => {
  // let globalDropzone = document.getElementById('#globalDropzone');
  // if (!globalDropzone) {
  //   globalDropzone = document.createElement('div');
  //   globalDropzone.id = 'globalDropzone';
  //   globalDropzone.style.position = 'static';
  //   globalDropzone.style.width = '100%';
  //   globalDropzone.style.height = '100%';
  //   globalDropzone.style.zIndex = '5000';
  //   document.body.appendChild(globalDropzone);
  // }
  return <Story dropzoneElement={document.body} />;
};
