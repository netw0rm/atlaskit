import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import AtlassianContainerResult from './AtlassianContainerResult';

const CONFLUENCE_SPACE_RESULT_TYPE = 'confluence-space';

// ===================================================================
// If adding a prop or feature that may be useful to all result types,
// add it to ResultBase instead
// Or, if a prop or feature may be useful for all container types, add
// it to AtlassianContainerResult instead
// ===================================================================

export default class ConfluenceSpaceResult extends PureComponent {
  static propTypes = {
    /** Src URL of the image to be used as the result's icon */
    avatarUrl: PropTypes.string,
    /** Text to appear to the right of the `name`. It has a lower font-weight. */
    caption: PropTypes.string,
    /** Location to link out to on click. */
    href: PropTypes.string,
    /** Content to be shown after the main content. Shown to the right of content
    (or to the left in RTL mode). */
    elemAfter: PropTypes.node,
    /** Reduces padding and font size. */
    isCompact: PropTypes.bool,
    /** Set whether to display a lock on the result's icon */
    isPrivate: PropTypes.bool,
    /** Set whether the item should be highlighted as selected. Selected items have
    a different background color. */
    isSelected: PropTypes.bool.isRequired,
    /** Name of the container. Provides the main text to be displayed as the item. */
    name: PropTypes.string.isRequired,
    /** Triggered by mouseClick event. Called with { `resultId`,  `type` }. */
    onClick: PropTypes.func,
    /** Triggered by mouseEnter event. Called with { `resultId`,  `type` }. */
    onMouseEnter: PropTypes.func,
    /** Standard onMouseLeave event. */
    onMouseLeave: PropTypes.func,
    /** Unique ID of the result. This is passed as a parameter to certain callbacks */
    resultId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    /** Type of Confluence space. Shown alongside the main `name` text. */
    spaceType: PropTypes.oneOf(['Documentation', 'Space']),
    /** Type of the result. This is passed as a parameter to certain callbacks. */
    type: PropTypes.string.isRequired,
  }

  static defaultProps = {
    onClick: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    type: CONFLUENCE_SPACE_RESULT_TYPE,
  }

  render() {
    const {
      spaceType,
      ...containerResultProps
    } = this.props;
    return (
      <AtlassianContainerResult
        {...containerResultProps}
        subText={spaceType}
      />
    );
  }
}
