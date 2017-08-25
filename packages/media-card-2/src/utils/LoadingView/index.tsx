import * as React from 'react';
import FileIcon from '@atlaskit/icon/glyph/file';
import LinkIcon from '@atlaskit/icon/glyph/link';
import {Wrapper} from './styled';

export interface LoadingViewProps {
  type: 'file' | 'link';
}

export function LoadingView(props: LoadingViewProps) {
  const {type} = props;
  return (
    <Wrapper>
      {type === 'file'
        ? <FileIcon label="file" size="medium"/>
        : <LinkIcon label="file" size="medium"/>
      }
    </Wrapper>
  );
}
