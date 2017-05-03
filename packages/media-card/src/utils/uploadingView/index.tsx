import * as React from 'react';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import {ProgressBar} from '../progressBar';
import {MediaImage} from '../mediaImage';
import {Ellipsify} from '../ellipsify';
import {Wrapper, Overlay, Title, Content, ProgressWrapper, IconLink} from './styled';

export interface UploadingViewProps {
  title?: string;
  progress: number;
  dataURI?: string;
  onCancel?: () => void;
}

export const UploadingView = ({title, progress, dataURI, onCancel}: UploadingViewProps) => ( // tslint:disable-line:variable-name
  <Wrapper>
    <Overlay>
      <Title>
        <Ellipsify text={title || ''} lines={2}/>
      </Title>
      <Content>
          <ProgressWrapper>
            <ProgressBar progress={progress}/>
          </ProgressWrapper>
          {onCancel && (
            <IconLink onClick={onCancel}>
              <CrossIcon label="Cancel upload"/>
            </IconLink>
          )}
        </Content>
    </Overlay>
    {dataURI && (
      <MediaImage dataURI={dataURI}/>
    )}
  </Wrapper>
);
