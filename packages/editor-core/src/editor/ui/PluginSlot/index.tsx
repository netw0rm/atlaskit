import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import ProviderFactory from '../../../providerFactory';
import { EditorAppearance } from '../../types';
import { EditorView } from '../../../prosemirror';

// tslint:disable-next-line:variable-name
const PluginsComponentsWrapper = styled.div`
  display: flex;
`;

export interface Props {
  items?: any[];

  editorView?: EditorView;
  providerFactory: ProviderFactory;
  appearance: EditorAppearance;
}

export default class PluginSlot extends PureComponent<Props, any> {
  render() {
    const { items, editorView, providerFactory, appearance } = this.props;

    if (!items) {
      return null;
    }

    return (
      <PluginsComponentsWrapper>
        {items.map((component, key) => {
          const element = component(editorView, providerFactory, appearance);
          return element && React.cloneElement(element, { key });
        })}
      </PluginsComponentsWrapper>
    );
  }
}
