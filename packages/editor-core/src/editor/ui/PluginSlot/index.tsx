import * as React from 'react';
import { PureComponent } from 'react';
import ProviderFactory from '../../../providerFactory';

export interface Props {
  editorView?: any;
  items?: any[];
  providerFactory: ProviderFactory;
}

export default class PluginSlot extends PureComponent<Props, any> {
  render() {
    const { items, editorView, providerFactory } = this.props;
    if (!items) {
      return null;
    }

    return (
      <div>{items.map((component, key) =>
        React.cloneElement(component(editorView, providerFactory), { key }))}</div>
    );
  }
}
