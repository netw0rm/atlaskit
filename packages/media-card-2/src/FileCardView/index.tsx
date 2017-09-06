import * as React from 'react';
import {Status} from '../utils/types';
import {Card} from '../utils/Card';
import {CardActions, CardAction} from '../utils/CardActions';
import {ErroredView} from '../utils/ErroredView';
import {LoadingView} from '../utils/LoadingView';
import {ProgressBar} from '../utils/ProgressBar';
import {DetailLayout} from '../utils/DetailLayout';
import {TypeIcon} from './TypeIcon';
import {toHumanReadableSize} from './toHumanReadableSize';

export {CardAction as Action};

export interface FileCardViewProps {
  status: Status;
  type?: 'image' | 'doc' | 'unknwon'; // TODO: support all
  name?: string;
  size?: number;
  progress?: number;
  actions?: CardAction[];
}

export interface FileCardViewState {
}

export class FileCardView extends React.Component<FileCardViewProps, FileCardViewState> {

  renderUploading() { // TODO: overlay for images
    const {name, actions} = this.props;
    return (
      <DetailLayout
        title={name}
        subtitle={<ProgressBar progress={33}/>}
        actions={<CardActions actions={actions}/>}
      />
    );
  }

  renderLoading() {
    return (
      <LoadingView type="file"/>
    );
  }

  renderLoaded() { // TODO: overlay for images
    const {type, name, size, actions} = this.props;
    return (
      <DetailLayout
        icon={<TypeIcon type={type}/>}
        title={name}
        subtitle={toHumanReadableSize(size || 0)}
        actions={<CardActions actions={actions}/>}
      />
    );
  }

  renderErrored() {
    return (
      <ErroredView/>
    );
  }

  renderContent() {
    const {status} = this.props;

    switch (status) {

      case 'uploading':
        return this.renderUploading();

      case 'loading':
        return this.renderLoading();

      case 'loaded':
        return this.renderLoaded();

      case 'errored':
        return this.renderErrored();

    }
  }

  render() {
    return (
      <Card width={156} height={116}>
        {this.renderContent()}
      </Card>
    );
  }

}
