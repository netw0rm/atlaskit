/*
 * This file is a modified version of `isomorphic-style-loader/lib/withStyles`
 * Once https://github.com/kriasoft/isomorphic-style-loader/pull/75 is merged
 * we will be able to remove this file and revert to the published one.
 */

import React, { Component, PropTypes } from 'react';
import hoistStatics from 'hoist-non-react-statics';

export default (...styles) =>
  (ComposedComponent) => {
    class WithStyles extends Component {
      componentWillMount() {
        if (this.context.insertCss) {
          this.removeCss = this.context.insertCss.apply(undefined, styles);
        } else if (typeof document !== 'undefined') {
          // eslint-disable-next-line no-underscore-dangle
          this.removeCss = styles.forEach(style => style._insertCss());
        } else {
          // eslint-disable-next-line no-console
          console.warn('Failed to instert CSS, ensure you are providing the insertCss context when rendering server side');
        }
      }

      componentWillUnmount() {
        setTimeout(this.removeCss, 0);
      }

      render() {
        return <ComposedComponent {...this.props} />;
      }
    }

    const displayName = ComposedComponent.displayName || ComposedComponent.name || 'Component';

    WithStyles.displayName = `WithStyles(${displayName})`;
    WithStyles.contextTypes = {
      insertCss: PropTypes.func,
    };
    WithStyles.ComposedComponent = ComposedComponent;

    return hoistStatics(WithStyles, ComposedComponent);
  };
