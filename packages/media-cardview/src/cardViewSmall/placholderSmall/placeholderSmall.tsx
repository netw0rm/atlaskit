import * as React from 'react';
import {Component} from 'react';
import styled from 'styled-components';
import {MediaTypes} from '@atlaskit/media-domain';
import {Placeholder} from '../../placeholder';
import {FileIcon} from '../../fileIcon';

export interface PlaceholderProps {
  mediaType: MediaTypes.MediaType;
}

const Wrapper = styled.div`
  width: 32px;
  height: 32px;
  position: relative;
`;

const FileTypeIcon = styled.div`
  float: left;
  position: absolute;
  bottom: 3px;
  left: 3px;
`;

export class PlaceholderSmall extends Component<PlaceholderProps, {}> {
  render() {
    return (
      <Wrapper>
        <Placeholder mediaType={this.props.mediaType} />
        <FileTypeIcon>
          <FileIcon mediaType={this.props.mediaType}/>
        </FileTypeIcon>
      </Wrapper>
    );
  }
}
