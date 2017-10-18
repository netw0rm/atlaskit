import * as React from 'react';
import ProviderFactory from '../../providerFactory';
import { EditorView, Node as PMNode } from '../../prosemirror';
import Macro from '../../ui/Macro';

export interface Props {
  node: PMNode;
  providerFactory: ProviderFactory;
  view: EditorView;
}

export default function MacroNode(props: Props) {
  const { node, providerFactory, view } = props;
  const { macroId, placeholderUrl } = node.attrs;

  return (
    <Macro
      macroId={macroId}
      placeholderUrl={placeholderUrl}
      providerFactory={providerFactory}
      view={view}
    />
  );
}
