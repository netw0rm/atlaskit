import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Flag, { FlagGroup } from '@atlaskit/flag';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import { colors } from '@atlaskit/theme';

const Icon = <CheckCircleIcon label="Success icon" primaryColor={colors.G300} />;

export default class SuccessFlag extends Component {
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
            id="SuccessFlag"
            key="SuccessFlag"
            title={title}
            description={description}
          />
          : []}
      </FlagGroup>
    );
  }
}
