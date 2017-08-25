import * as React from 'react';
import {Status} from '../utils/types';
import {Card} from '../utils/Card';
import {ErroredView} from '../utils/ErroredView';
import {LoadingView} from '../utils/LoadingView';
import {DetailLayout} from '../utils/DetailLayout';
import {TypeIcon} from './TypeIcon';
import {toHumanReadableSize} from './toHumanReadableSize';

export interface FileCardViewProps {
  status: Status;
  type?: 'image' | 'doc' | 'unknwon'; // TODO: support all
  name?: string;
  size?: number;
  // TODO: actions
}

export interface FileCardViewState {
}

export class FileCardView extends React.Component<FileCardViewProps, FileCardViewState> {

  renderErrored() {
    return (
      <ErroredView/>
    );
  }

  renderLoading() {
    return (
      <LoadingView type="file"/>
    );
  }

  renderLoaded() { // TODO: overlay for images
    const {type, name, size} = this.props;
    return (
      <DetailLayout
        icon={<TypeIcon type={type}/>}
        title={name}
        subtitle={toHumanReadableSize(size || 0)}
        actions="..."
      />
    );
  }

  renderContent() {
    const {status} = this.props;

    switch (status) {

      case 'uploading':
        break;

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
