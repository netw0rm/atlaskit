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
    /** Text to appear to the right of the text. It has a lower font-weight. */
    caption: PropTypes.string,
    /** Content to be shown after the main content. Shown to the right of content
    (or to the left in RTL mode). */
    elemAfter: PropTypes.node,
    /** Location to link out to on click. */
    href: PropTypes.string,
    /** React element to appear to the left of the text. */
    icon: PropTypes.node,
    /** Reduces padding and font size. */
    isCompact: PropTypes.bool,
    /** Set whether the item should be highlighted as selected. Selected items have
    a different background color. */
    isSelected: PropTypes.bool.isRequired,
    /** Triggered by mouseClick event. Called with { `resultId`,  `type` }. */
    onClick: PropTypes.func,
    /** Triggered by mouseEnter event. Called with { `resultId`,  `type` }. */
    onMouseEnter: PropTypes.func,
    /** Standard onMouseLeave event. */
    onMouseLeave: PropTypes.func,
    /** Unique ID of the result. This is passed as a parameter to certain callbacks */
    resultId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    /** Text to be shown alongside the main `text`. */
    subText: PropTypes.string,
    /** Main text to be displayed as the item. */
    text: PropTypes.string.isRequired,
    /** Type of the result. This is passed as a parameter to certain callbacks. */
    type: PropTypes.string,
  }

  static defaultProps = {
    isCompact: false,
    isSelected: false,
    isTabbingDisabled: false,
    onClick: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
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
      elemAfter,
      href,
      icon,
      isCompact,
      isSelected,
      onMouseLeave,
      resultId,
      subText,
      text,
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
        text={text}
        textAfter={elemAfter}
        type={type}
      />
    );
  }
}
