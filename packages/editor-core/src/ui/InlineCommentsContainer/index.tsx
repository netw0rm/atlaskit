import * as React from 'react';
import { PureComponent } from 'react';
import { EditorView } from '../../prosemirror';
import { InlineCommentMarkerState } from '../../plugins/inline-comment-marker';
import InlineComment from './InlineComment';
import InlineCommentEditor from './InlineCommentEditor';
import InlineCommentWrapper from './InlineCommentWrapper';
import styled from 'styled-components';
import Spinner from '@atlaskit/spinner';

export interface InlineCommentProvider {
  getComment: (ref: string) => Promise<any>;
  getViewer: () => Promise<{
    authorAvatarUrl: string,
  }>;
  putComment: (commentID: string, comment: any) => void;
}

export interface Props {
  editorView: EditorView;
  pluginState: InlineCommentMarkerState;
  provider: Promise<InlineCommentProvider>;
}

// tslint:disable-next-line:variable-name
const Container: any = styled.div`
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 0 1px rgba(9, 30, 66, 0.31), 0 4px 8px -2px rgba(9, 30, 66, 0.25);
  padding: 16px 16px 0;
  position: absolute;
  right: 10px;
  width: 300px;
`;

// tslint:disable-next-line:variable-name
const LoadingContainer: any = styled.div`
  padding: 4px;
  position: absolute;
  right: 10px;
  text-align: center;
  width: 300px;
`;

/**
 * TODO:
 * - Position this correctly based on where the comment node is
 */

export default class InlineCommentContainer extends PureComponent<Props, {}> {
  state: any = {
    comments: [],
    viewer: null,
    loading: false,
    saving: false,
  };

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
    this.props.provider
      .then(provider => provider.getViewer())
      .then(viewer => this.setState({ viewer }));
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  private handlePluginStateChange = (pluginState: InlineCommentMarkerState) => {
    const { activeID } = pluginState;
    if (!activeID) {
      this.setState({ comments: [], loading: false });
    } else {
      this.setState({ loading: true });
      this.props.provider
        .then(provider => provider.getComment(activeID))
        .then(comments => this.setState({ comments, loading: false }));
    }
  }

  private submitReply = (editorActions: any) => {
    const { comments } = this.state;
    const commentID = comments[0].id; // EW

    this.setState({ saving: true });
    editorActions.clear();

    editorActions.getValue()
      .then(content => {
        this.props.provider
          .then(provider => provider.putComment(commentID, content))
          .then(comment => this.setState({
            saving: false,
            comments: comments.concat([comment]),
          }));
      });
  }

  render() {
    const { comments, viewer, loading, saving } = this.state;
    if (loading) {
      return <LoadingContainer><Spinner size="small" /></LoadingContainer>;
    }

    // no comments or viewer, don't render anything
    if (!comments.length || !viewer) {
      return null;
    }

    const allComments = comments.map(data => (
      <InlineComment
        authorAvatarUrl={data.authorAvatarUrl}
        authorDisplayName={data.authorDisplayName}
        body={data.body}
      />
    ));
    return (
      <Container>
        {allComments}
        {saving ?
          <InlineCommentWrapper authorAvatarUrl={viewer.authorAvatarUrl}>
            <Spinner size="small" />
          </InlineCommentWrapper> :
          null
        }
        <InlineCommentWrapper authorAvatarUrl={viewer.authorAvatarUrl}>
          <InlineCommentEditor onSubmit={this.submitReply} />
        </InlineCommentWrapper>
      </Container>
    );
  }
}
