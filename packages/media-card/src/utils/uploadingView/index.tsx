import * as React from 'react';
import {Component} from 'react';

import {ProgressBar} from '../progressBar';
import {MediaImage} from '../mediaImage';
import {CardAction, CardActions} from '../cardActions';
import {Ellipsify} from '../ellipsify';
import {Wrapper, Overlay, Title, Body, ProgressWrapper, ActionsWrapper} from './styled';

export interface UploadingViewProps {
  title?: string;
  progress: number;
  dataURI?: string;
  actions?: CardAction[];
}

export class UploadingView extends Component<UploadingViewProps, {}> {
  render() {
    const {title, progress, dataURI, actions = []} = this.props;
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
              {actions && actions.length > 0 && (
                <ActionsWrapper>
                  <CardActions theme="light" actions={actions}/>
                </ActionsWrapper>
              )}
            </Body>
        </Overlay>
        {dataURI && (
          <MediaImage dataURI={dataURI}/>
        )}
      </Wrapper>
    );
  }
}
