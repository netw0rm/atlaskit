'use strict';
import * as React from 'react';
import {Component} from 'react';
import Button from '@atlaskit/button';

import {FileItem} from '@atlaskit/media-core';
import {CardView} from '@atlaskit/media-card';

import {
  Wrapper,

  LocalUpload,
  UploadLocalBanner,
  LocalUploadPrompt,

  CardGallery,
  CardWrapper
} from './styled';

export interface RecentsProps {
  fileItems: Array<FileItem>;
}

export class Recents extends Component<RecentsProps, any> {
  render() {
    const {fileItems} = this.props;
    const localUpload = this.localUpload(fileItems.length > 0);

    return (
      <Wrapper>
        {localUpload}
        {fileItems.length > 0 ? this.cardsView(fileItems) : null}
      </Wrapper>
    );
  }

  private localUpload(hasCards: boolean) {
    return (
      <LocalUpload hasCards={hasCards}>
        <UploadLocalBanner>
          <LocalUploadPrompt>Drag and drop your files anywhere or</LocalUploadPrompt>
          <Button>Upload a file</Button>
        </UploadLocalBanner>
      </LocalUpload>
    );
  }

  private cardsView(fileItems: Array<FileItem>) {
    const cards = fileItems.map(item => {
      return (
        <CardWrapper>
          <CardView status="loading" />
        </CardWrapper>
      );
    });

    return (
      <div>
        <h3>Recent uploads</h3>
        <CardGallery>
          {cards}
        </CardGallery>
      </div>
    );
  }
}
