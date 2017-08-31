import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { AkNavigationItem } from '../../../../src';

const BASE_RESULT_TYPE = 'base';

// ==========================================================================================
// This class enforces a standard set of props and behaviour for all result types to support.
// All "-Result" components (PersonResult, RoomResult, etc.) should extend this class to-
// ensure consideration of these props.
// ==========================================================================================

export default class ResultBase extends PureComponent {
  static propTypes = {
    caption: PropTypes.string,
    href: PropTypes.string,
    icon: PropTypes.node,
    isCompact: PropTypes.bool,
    isSelected: PropTypes.bool.isRequired,
    isTabbingDisabled: PropTypes.bool,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    resultId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    subText: PropTypes.string,
    text: PropTypes.string.isRequired,
    textAfter: PropTypes.node,
    type: PropTypes.string.isRequired,
  }

  static defaultProps = {
    isCompact: false,
    isSelected: false,
    isTabbingDisabled: false,
    onClick: () => {},
    type: BASE_RESULT_TYPE,
  }

  handleClick = () => this.props.onClick({
    resultId: this.props.resultId,
    type: this.props.type,
  });

  handleMouseEnter = () => this.props.onMouseEnter({
    resultId: this.props.resultId,
    type: this.props.type,
  });

  render() {
    const {
      caption,
      href,
      icon,
      isCompact,
      isSelected,
      isTabbingDisabled,
      onMouseLeave,
      resultId,
      subText,
      text,
      textAfter,
      type,
    } = this.props;
    return (
      <AkNavigationItem
        caption={caption}
        href={href}
        icon={icon}
        isCompact={isCompact}
        isSelected={isSelected}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={onMouseLeave}
        resultId={resultId}
        subText={subText}
        tabIndex={isTabbingDisabled ? -1 : null}
        text={text}
        textAfter={textAfter}
        type={type}
      />
    );
  }
}
