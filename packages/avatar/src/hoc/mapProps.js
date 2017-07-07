import React, { Component } from 'react';
import { getDisplayName } from '../utils';

export default function mapProps(mapping) {
  return DecoratedComponent =>
    class MapProps extends Component {
      static displayName = getDisplayName('mapProps', DecoratedComponent);
      static DecoratedComponent = DecoratedComponent;

      // expose blur/focus to consumers via ref
      blur = () => this.component.blur()
      focus = () => this.component.focus()

      render() {
        const mapped = {
          ...this.props,
          ...Object.keys(mapping).reduce((acc, key) => ({
            ...acc,
            [key]: mapping[key](this.props),
          }), {}),
        };
        return (
          <DecoratedComponent
            ref={r => (this.component = r)}
            {...mapped}
          />
        );
      }
    };
}
