import * as React from 'react';
import {Component} from 'react';
import ModalDialog from '@atlaskit/modal-dialog';

import {FileItem} from '@atlaskit/media-core';

import {Recents} from './recents';
import {
  Contents
} from './styled';

const fileItem: FileItem = {
  type: 'file',
  details: {}
};

export class Popup extends Component<any, any> {
  render(): JSX.Element {
    return (
      <ModalDialog isOpen={true}>
        <Contents>
          <Recents fileItems={[fileItem, fileItem, fileItem, fileItem, fileItem, fileItem]} />
        </Contents>
      </ModalDialog>
    );
  }
}
