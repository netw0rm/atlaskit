import * as React from 'react';
import { PureComponent } from 'react';
import { ResourcedMention } from '@atlaskit/mention';
import ProviderFactory, { WithProviders } from '../../providerFactory';
import {
  EditorView,
  Node as PMNode,
} from '../../prosemirror';

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PMNode;
  providerFactory: ProviderFactory;
}

export default class MentionNode extends PureComponent<Props, {}> {
  render() {
    const { node, providerFactory } = this.props;
    const { id, text, accessLevel } = node.attrs;

    return (
      <WithProviders
        providers={['mentionProvider']}
        providerFactory={providerFactory}
        // tslint:disable-next-line:jsx-no-lambda
        renderNode={providers =>
          <ResourcedMention
            id={id}
            text={text}
            accessLevel={accessLevel}
            mentionProvider={providers['mentionProvider']}
          />
        }
      />
    );
  }
}
