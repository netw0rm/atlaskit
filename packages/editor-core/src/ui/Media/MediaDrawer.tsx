import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
import { FilmstripView } from '@atlaskit/media-filmstrip';
import { MediaPluginState } from '../../plugins/media';

export interface MediaDrawerProps {
  mediaPluginState: MediaPluginState;
}

export interface MediaDrawerState {
  animate: boolean;
  offset: number;
}

// tslint:disable-next-line:variable-name
const Wrapper = styled.div`
  width: 100%;
  padding: 0 0 8px 0;
  &&& ul {
    padding: 0;
  }
`;

export default class MediaDrawer extends Component<MediaDrawerProps, MediaDrawerState> {
  // private mediaNodesIds: string[];

  state: MediaDrawerState = {
    animate: false,
    offset: 0
  };

  constructor(props) {
    super(props);
  }

  private handleSize = ({offset}) => this.setState({offset});
  private handleScroll = ({animate, offset}) => this.setState({animate, offset});

  /**
   * Save all childNodes ids into "mediaNodesIds"
   */
  // componentDidMount() {
  //   this.mediaNodesIds = this.getMediaNodesIds(this.props.children);
  // }

  /**
   * Update "mediaNodesIds" and notify media plugin about removed nodes
   */
  // componentWillReceiveProps(nextProps) {
  //   const newMediaNodesIds = this.getMediaNodesIds(nextProps.children);
  //   const removedNodesIds = this.mediaNodesIds.filter(id => newMediaNodesIds.indexOf(id) === -1);

  //   removedNodesIds.forEach(mediaNodeId => {
  //     this.props.mediaPluginState.cancelInFlightUpload(mediaNodeId);
  //   });

  //   this.mediaNodesIds = newMediaNodesIds;
  // }

  render() {
    const { mediaPluginState } = this.props;
    const { animate, offset } = this.state;

    if (!mediaPluginState) {
      return null;
    }

    return (
      <Wrapper>
        <FilmstripView
          animate={animate}
          offset={offset}
          onSize={this.handleSize}
          onScroll={this.handleScroll}
        >
        {this.props.children}
        </FilmstripView>
      </Wrapper>
    );
  }

  // private getMediaNodesIds = (children: React.ReactNode): string[] => {
  //   return React.Children.map(children, (child: React.ReactElement<any>) => {
  //     return (child.props as MediaNodeProps).node.attrs.id;
  //   }) || [];
  // }
}
