import * as React from 'react';
import styled from 'styled-components';
import ProviderFactory from '../../../providerFactory';
import { EditorAppearance } from '../../types';
import { EditorView } from '../../../prosemirror';
import { EventDispatcher } from '../../event-dispatcher';

// tslint:disable-next-line:variable-name
const PluginsComponentsWrapper = styled.div`
  display: flex;
`;

export interface Props {
  items?: any[];

  editorView?: EditorView;
  eventDispatcher?: EventDispatcher;
  providerFactory: ProviderFactory;
  appearance: EditorAppearance;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
}

export default class PluginSlot extends React.Component<Props, any> {
  shouldComponentUpdate(nextProps: Props) {
    const { editorView, items, providerFactory, eventDispatcher, popupsMountPoint, popupsBoundariesElement } = this.props;
    return !(nextProps.editorView === editorView
      && nextProps.items === items
      && nextProps.providerFactory === providerFactory
      && nextProps.eventDispatcher === eventDispatcher
      && nextProps.popupsMountPoint === popupsMountPoint
      && nextProps.popupsBoundariesElement === popupsBoundariesElement
    );
  }

  render() {
    const { items, editorView, eventDispatcher, providerFactory, appearance, popupsMountPoint, popupsBoundariesElement } = this.props;

    if (!items) {
      return null;
    }

    return (
      <PluginsComponentsWrapper>
        {items.map((component, key) => {
          const element = component(editorView, eventDispatcher, providerFactory, appearance, popupsMountPoint, popupsBoundariesElement);
          return element && React.cloneElement(element, { key });
        })}
      </PluginsComponentsWrapper>
    );
  }
}
