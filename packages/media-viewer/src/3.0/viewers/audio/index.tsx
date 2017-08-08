import * as React from 'react';
import {Component} from 'react';
import {Context, FileItem} from '@atlaskit/media-core';
import {Wrapper, Audio} from './styled';
import {MediaIdentifier} from '../../domain';
import {getBinaryURL} from '../../utils';

export interface AudioViewerProps {
  identifier: MediaIdentifier;
  metadata: FileItem;
  context: Context;
}

export interface AudioViewerState {
  dataURI?: string;
}

export class AudioViewer extends Component<AudioViewerProps, AudioViewerState> {

  state: AudioViewerState = {

  };

  componentDidMount() {
    this.updateUrl();
  }

  componentWillReceiveProps(nextProps: AudioViewerProps) {
    if (nextProps.metadata.details.id === this.props.metadata.details.id) {
      return;
    }
    this.updateUrl();
  }

  updateUrl = () => {
    const {metadata, context, identifier} = this.props;
    getBinaryURL(metadata, context, identifier.collectionName).then((dataURI) => {
      this.setState({ dataURI });
    });
  }

  render() {
    const {dataURI} = this.state;

    return (
      <Wrapper>
        <p>What's coming next: https://extranet.atlassian.com/display/FIL/2017/05/08/Going+crazy+with+media+cards?preview=/3282046379/3282046387/audiowidget.gif</p>
        <Audio src={dataURI} controls={true} />
      </Wrapper>
    );
  }
}
