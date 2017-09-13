import * as React from 'react';
import {FileViewModel} from '../../types';
import {Card} from '../../utils/Card';
import {Actions, Action} from '../../utils/Actions';
import {ErroredView} from '../../utils/ErroredView';
import {LoadingView} from '../../utils/LoadingView';
import {ProgressBar} from '../../utils/ProgressBar';
import {DetailLayout} from '../../utils/DetailLayout';
import {TypeIcon} from './TypeIcon';
import {toHumanReadableSize} from './toHumanReadableSize';

export {Action as Action};

export interface FileViewProps extends FileViewModel {
  actions?: Action[];
}

export class FileView extends React.Component<FileViewProps, {}> {

  renderUploading() { // TODO: overlay for images
    const {name, actions} = this.props;
    return (
      <DetailLayout
        title={name}
        subtitle={<ProgressBar progress={33}/>}
        actions={<Actions actions={actions}/>}
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
        actions={<Actions actions={actions}/>}
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
