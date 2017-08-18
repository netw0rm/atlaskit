import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Avatar from '@atlaskit/avatar';

import ResultBase from './ResultBase';

// ===================================================================
// If adding a prop or feature that may be useful to all result types,
// add it to ResultBase instead
// ===================================================================

/**
 * Generic result type for Atlassian containers.
 */
export default class AtlassianContainerResult extends PureComponent {
  static propTypes = {
    /** Src URL of the image to be used as the result's icon */
    avatarUrl: PropTypes.string,
    /** Text to appear to the right of the text. It has a lower font-weight. */
    caption: PropTypes.string,
    /** Content to be shown after the main content. Shown to the right of content
    (or to the left in RTL mode). */
    elemAfter: PropTypes.node,
    /** Location to link out to on click. */
    href: PropTypes.string,
    /** Reduces padding and font size. */
    isCompact: PropTypes.bool,
    /** Set whether to display a lock on the result's icon */
    isPrivate: PropTypes.bool,
    /** Set whether the item should be highlighted as selected. Selected items have
    a different background color. */
    isSelected: PropTypes.bool.isRequired,
    /** Name of the container. Provides the main text to be displayed as the item. */
    name: PropTypes.string.isRequired,
    /** Triggered by mouseClick event. Called with `resultId` and `type`. */
    onClick: PropTypes.func,
    /** Triggered by mouseEnter event. Called with `resultId` and `type`. */
    onMouseEnter: PropTypes.func.isRequired,
    /** Standard onMouseLeave event. */
    onMouseLeave: PropTypes.func.isRequired,
    /** Unique ID of the result. This is passed as a parameter to certain callbacks */
    resultId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    /** Text to be shown alongside the main `name` text. */
    subText: PropTypes.string,
    /** Type of the result. This is passed as a parameter to certain callbacks. */
    type: PropTypes.string.isRequired,
  }

  static defaultProps = {
    onClick: () => {},
  }

  getAvatar = () => (
    <Avatar
      src={this.props.avatarUrl}
      appearance="square"
      status={this.props.isPrivate ? 'locked' : null}
    />
  )

  render() {
    const {
      name,
      ...resultBaseProps
    } = this.props;
    return (
      <ResultBase
        {...resultBaseProps}
        icon={this.getAvatar()}
        text={name}
      />
    );
  }
}
