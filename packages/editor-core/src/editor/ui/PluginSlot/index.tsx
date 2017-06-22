import * as React from 'react';
import { PureComponent } from 'react';

export interface Props {
  editorView?: any;
  items?: any[];
}

export default class PluginSlot extends PureComponent<Props, any> {
  render() {
    const { items, editorView } = this.props;
    if (!items) {
      return null;
    }

    return (
      <div>{items.map((component, key) =>
        React.cloneElement(component(), { editorView, key }))}</div>
    );
  }
}
