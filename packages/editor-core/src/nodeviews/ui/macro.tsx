import * as React from 'react';
import ProviderFactory from '../../providerFactory';
import { Node as PMNode } from '../../prosemirror';
import Macro from '../../ui/Macro';

export interface Props {
  node: PMNode;
  providerFactory: ProviderFactory;
}

export default function MacroNode(props: Props) {
  const { node, providerFactory } = props;
  const { macroId, placeholderUrl } = node.attrs;

  return (
    <Macro
      macroId={macroId}
      placeholderUrl={placeholderUrl}
      providerFactory={providerFactory}
    />
  );
}
