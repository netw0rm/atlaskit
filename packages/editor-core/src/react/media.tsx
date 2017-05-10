import * as React from 'react';
import { PureComponent } from 'react';
import { PositionedNode } from './';
import MediaComponent from '../ui/Media/MediaComponent';
import ProviderFactory, { WithProviders } from '../providerFactory';
import { mediaStateKey, MediaPluginState } from '../plugins';
import { EditorView } from '../prosemirror';

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PositionedNode;
  providerFactory: ProviderFactory;
}

export default class MediaNode extends PureComponent<Props, {}> {
  componentWillUnmount() {
    const { node, view } = this.props;
    const pluginState = mediaStateKey.getState(view.state) as MediaPluginState;

    pluginState.handleMediaNodeRemoval(node);
  }

  render() {
    const { node, providerFactory, view } = this.props;
    const { id, type, collection } = node.attrs;

    return (
      <WithProviders
        providers={['mediaProvider']}
        providerFactory={providerFactory}
        // tslint:disable-next-line:jsx-no-lambda
        renderNode={providers => {
          return <MediaComponent
            mediaProvider={providers['mediaProvider']}
            editorView={view}
            id={id!}
            type={type!}
            collection={collection!}
          />;
        }}
      />
    );
  }
}



