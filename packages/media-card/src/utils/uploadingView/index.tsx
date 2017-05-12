import * as React from 'react';
import {Component, MouseEvent} from 'react';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import Icon from '@atlaskit/icon/lib/Icon';
import {ProgressBar} from '../progressBar';
import {MediaImage} from '../mediaImage';
import {Ellipsify} from '../ellipsify';
import {Wrapper, Overlay, Title, Body, ProgressWrapper, IconLink} from './styled';

export interface UploadingViewProps {
  title?: string;
  progress: number;
  dataURI?: string;
  onCancel?: () => void;
}

export class UploadingView extends Component<UploadingViewProps, {}> {
  render() {
    const {title, progress, dataURI, onCancel} = this.props;

    const cancelButton = onCancel ?
      (
        <IconLink onClick={this.handleCancelClick}>
          <Icon glyph={CrossIcon} label="Cancel upload"/>
        </IconLink>
      ) : null;

    return (
      <Wrapper>
        <Overlay>
          <Title>
            <Ellipsify text={title || ''} lines={2}/>
          </Title>
          <Body>
              <ProgressWrapper>
                <ProgressBar progress={progress}/>
              </ProgressWrapper>
              {cancelButton}
            </Body>
        </Overlay>
        {dataURI && (
          <MediaImage dataURI={dataURI}/>
        )}
      </Wrapper>
    );
  }

  /*
    If there is a cancel action, wrap the cancel action handler to stop the "click" event bubbling up
    to the card and also firing the Card onClick event
  */
  private handleCancelClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const {onCancel} = this.props;
    if (onCancel) {
      onCancel();
    }
  }
}
