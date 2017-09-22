import * as React from 'react';
import {Status, MediaType} from '../../types';
import {Card} from '../../utils/Card';
import {Actions, Action} from '../../utils/Actions';
import {ErroredView} from '../../utils/ErroredView';
import {LoadingView} from '../../utils/LoadingView';
import {ProgressBar} from '../../utils/ProgressBar';
import {DetailLayout} from '../../utils/DetailLayout';
import {TypeIcon} from './TypeIcon';
import {toHumanReadableSize} from './toHumanReadableSize';
import {Thumbnail, Details} from './styled';

export {Action as Action};

export interface FileViewProps {
  status: Status;
  type?: MediaType;
  name?: string;
  size?: number;
  progress?: number;
  actions?: Action[];
  thumbnailURI?: string;
}

export class FileView extends React.Component<FileViewProps, {}> {

  renderUploading(): JSX.Element {
    const {name, actions} = this.props;
    return (
      <DetailLayout
        title={name}
        subtitle={<ProgressBar progress={33}/>}
        actions={<Actions actions={actions}/>}
      />
    );
  }

  renderLoading(): JSX.Element {
    return (
      <LoadingView type="file"/>
    );
  }

  renderLoaded(): JSX.Element {
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

  renderErrored(): JSX.Element {
    return (
      <ErroredView/>
    );
  }

  renderDetails(): JSX.Element {
    const {status} = this.props;

    switch (status) {

      case 'uploading':
        return this.renderUploading();

      case 'waiting':
      case 'loading':
        return this.renderLoading();

      case 'loaded':
        return this.renderLoaded();

      case 'errored':
        return this.renderErrored();

    }
  }

  render() {
    const {thumbnailURI} = this.props;
    return (
      <Card width={156} height={116}>
        {thumbnailURI && <Thumbnail src={thumbnailURI}/>}
        <Details isOverlay={Boolean(thumbnailURI)}>
        {this.renderDetails()}
        </Details>
      </Card>
    );
  }

}

