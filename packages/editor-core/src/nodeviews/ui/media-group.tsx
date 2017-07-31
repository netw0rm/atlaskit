import * as assert from 'assert';
import * as React from 'react';
import { PureComponent, ReactElement } from 'react';
import styled from 'styled-components';
import { FilmstripView } from '@atlaskit/media-filmstrip';
import { MediaNodeProps } from './media';
import { MediaPluginState, mediaStateKey } from '../../plugins';
import { EditorView } from '../../prosemirror';
import { Props as MediaProps } from '../../ui/Media/MediaComponent';

export interface MediaGroupNodeProps {
  view: EditorView;
}

export interface MediaGroupNodeState {
  offset: number;
}

// tslint:disable-next-line:variable-name
const Wrapper = styled.div`
  padding: 0 0 8px 0;
  &&& ul {
    padding: 0;
  }
`;

export default class MediaGroupNode extends PureComponent<MediaGroupNodeProps, MediaGroupNodeState> {
  private mediaPluginState: MediaPluginState;
  private mediaNodesIds: string[];

  state: MediaGroupNodeState = {
    offset: 0,
  };

  constructor(props) {
    super(props);

    this.mediaPluginState = mediaStateKey.getState(props.view.state);
    assert(this.mediaPluginState, 'Media is not enabled');
  }

  /**
   * Save all childNodes ids into "mediaNodesIds"
   */
  componentDidMount() {
    this.mediaNodesIds = this.getMediaNodesIds(this.props.children);
  }

  /**
   * Update "mediaNodesIds" and notify media plugin about removed nodes
   */
  componentWillReceiveProps(nextProps) {
    const newMediaNodesIds = this.getMediaNodesIds(nextProps.children);
    const removedNodesIds = this.mediaNodesIds.filter(id => newMediaNodesIds.indexOf(id) === -1);

    removedNodesIds.forEach(mediaNodeId => {
      this.mediaPluginState.cancelInFlightUpload(mediaNodeId);
    });

    this.mediaNodesIds = newMediaNodesIds;
  }

  handleSizeChange = ({ maxOffset }) => {
    this.setState({ offset: maxOffset });
  }

  handleScrollChange = ({ offset }) => {
    this.setState({ offset });
  }

  render() {
    const { offset } = this.state;
    return (
      <Wrapper>
        <FilmstripView animate={true} offset={offset} onSize={this.handleSizeChange} onScroll={this.handleScrollChange}>
          {
            React.Children.map(this.props.children, (child: ReactElement<MediaNodeProps>) => {
              switch (child.props.node.attrs.type) {
                case 'file':
                  return child;

                default:
                case 'link':
                  return React.cloneElement(child as ReactElement<any>, {
                    cardDimensions: {
                      width: 343,
                    },
                  } as MediaProps);
              }
            })
          }
        </FilmstripView>
      </Wrapper>
    );
  }

  private getMediaNodesIds = (children: React.ReactNode): string[] => {
    return React.Children.map(children, (child: React.ReactElement<any>) => {
      return (child.props as MediaNodeProps).node.attrs.id;
    }) || [];
  }
}
