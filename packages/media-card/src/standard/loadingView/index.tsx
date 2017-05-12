import * as React from 'react';
import {MediaItemType} from '@atlaskit/media-core';
import FileIcon from '@atlaskit/icon/glyph/file';
import LinkIcon from '@atlaskit/icon/glyph/link';
import {Wrapper} from './styled';

export interface StandardLoadingViewProps {
  icon: MediaItemType;
}

export class StandardLoadingView extends React.Component<StandardLoadingViewProps, {}> {

  get icon () {
    const {icon} = this.props;
    return icon === 'link'
      ? <LinkIcon label="loading" size="medium"/>
      : <FileIcon label="loading" size="medium"/>
      ;
  }

  render() {
    return (
      <Wrapper>
        {this.icon}
      </Wrapper>
    );
  }

}
