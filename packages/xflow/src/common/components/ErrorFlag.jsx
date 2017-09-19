import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Flag, { FlagGroup } from '@atlaskit/flag';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import { colors } from '@atlaskit/theme';

const Icon = <ErrorIcon label="Error icon" primaryColor={colors.R200} />;

export default class ErrorFlag extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    showFlag: PropTypes.bool,
    onDismissed: PropTypes.func,
    flagActions: PropTypes.arrayOf(PropTypes.object),
  };

  render() {
    const {
      description,
      flagActions,
      onDismissed,
      showFlag,
      title,
    } = this.props;
    return (
      <FlagGroup onDismissed={onDismissed}>
        {showFlag
          ? <Flag
            icon={Icon}
            actions={flagActions}
            id="ErrorFlag"
            key="ErrorFlag"
            title={title}
            description={description}
          />
          : []}
      </FlagGroup>
    );
  }
}
