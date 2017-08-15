import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Avatar from '@atlaskit/avatar';

import ResultBase from './ResultBase';

// ===================================================================
// If adding a prop or feature that may be useful to all result types,
// add it to ResultBase instead
// ===================================================================

/**
 * Generic result type for Atlassian objects.
 */
export default class AtlassianObjectResult extends PureComponent {
  static propTypes = {
    /** Src URL of the image to be used as the result's icon */
    avatarUrl: PropTypes.string,
    /** Name of the container to which the object belongs. Displayed alongside the name */
    containerName: PropTypes.string.isRequired,
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
    isPrivate: PropTypes.boolean,
    /** Set whether the item should be highlighted as selected. Selected items have
    a different background color. */
    isSelected: PropTypes.bool.isRequired,
    /** Name of the object.  Provides the main text to be displayed as the item. */
    name: PropTypes.string.isRequired,
    /** A key or identifier of the object.  Ajoined to the `containerName` when provided. */
    objectKey: PropTypes.string,
    /** Triggered by mouseclick event.  Is called with `resultId` and `type`. */
    onClick: PropTypes.func,
    /** Triggered by mouseenter event.  Is called with `resultId` and `type`. */
    onMouseEnter: PropTypes.func.isRequired,
    /** Standard onmouseleave event. */
    onMouseLeave: PropTypes.func.isRequired,
    /** Unique ID of the result.  This is passed as a parameter to certain callbacks */
    resultId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    /** Type of the result.  This is passed as a parameter to certain callbacks. */
    type: PropTypes.string.isRequired,
    // isTabbingDisabled: PropTypes.bool,
  }

  getAvatar = () => (
    <Avatar
      src={this.props.avatarUrl}
      appearance="square"
      status={this.props.isPrivate && 'locked'}
    />
  )

  render() {
    const {
      containerName,
      objectKey,
      name,
      ...resultBaseProps
    } = this.props;
    return (
      <ResultBase
        {...resultBaseProps}
        icon={this.getAvatar()}
        subText={`${objectKey ? `${objectKey} ` : ''}in ${containerName}`}
        text={name}
      />
    );
  }
}
