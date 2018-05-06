/**
 * Version 3.x of the Atlaskit modal dialog renders the header/footer/children
 * into a custom portal implementation. This means tests which depend on looking
 * into the content of the modal will fail if the real modal implementation is
 * used.
 *
 * Tests which involve modals can mock out the real modal with this dummy
 * implementation, which mimics the `LegacyModalDialog` API defined in
 * `common/components/modal-dialog/index`.
 *
 * This mock will no longer be needed once the Atlaskit modal dialog component
 * is implemented using native React portals.
 * See: https://jdog.jira-dev.com/browse/BENTO-1069
 */

import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

export default class ModalDialogMock extends Component {
  static propTypes = {
    header: PropTypes.func,
    footer: PropTypes.func,
    children: PropTypes.node,
    // eslint-disable-next-line react/no-unused-prop-types
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.oneOf(['small', 'medium', 'large', 'x-large']),
    ]),
    // eslint-disable-next-line react/no-unused-prop-types
    onDialogDismissed: PropTypes.func,
  };

  static defaultProps = {
    header: null,
    footer: null,
    children: null,
    isOpen: false,
    onDialogDismissed: noop,
    width: 'medium',
  };

  render() {
    const { header, footer, children } = this.props;

    return (
      <div>
        {createElement(header, {})}
        {children}
        {createElement(footer, {})}
      </div>
    );
  }
}
