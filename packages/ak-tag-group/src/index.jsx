import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';

import styles from 'style!./styles.less';

const ALIGNMENT_ATTRIBUTE_ENUM = {
  attribute: 'alignment',
  values: ['', 'start', 'end'],
  defaultValue: '',
};

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class TagGroup
 * @example @js import TagGroup from 'ak-tag-group';
 * import TagGroup from 'ak-tag-group';
 * import Tag from 'ak-tag';
 *
 * ReactDOM.render(
 *   <TagGroup>
 *     <Tag text="Cupcake" href="http://www.cupcakeipsum.com/" />
 *   </TagGroup>, container);
 *
 */
export default class TagGroup extends PureComponent {
  static propTypes = {
    /**
     * @description (Optional) A group alignment.
     *
     * Defaults to an empty string (which means it uses the text direction to determine
     * the alignment (same as start)).
     *
     * This setting also controls the animation direction on tag removal,
     * e.g. start alignment means that the tags list moves to the text-start on removal
     * end alignment means it moves to the text-end (all based on the text direction,
     * e.g. start alignment in LTR means the tags move to the right, start alignment
     * in RTL means the tags move to the left).
     *
     * @memberof TagGroup
     * @instance
     * @type {alignment}
     * @default start
     * @example @html <ak-tag-group alignment="end">
     * ReactDOM.render(
     *   <TagGroup alignment="end">
     *     <Tag text="Cupcake" />
     *     <Tag text="Chocolate" />
     *   </TagGroup>, container);
     */
    alignment: PropTypes.oneOf(ALIGNMENT_ATTRIBUTE_ENUM.values),
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    alignment: ALIGNMENT_ATTRIBUTE_ENUM.defaultValue,
  }

  render() {
    const isEndAligned = this.props.alignment === 'end';
    const slotClasses = classnames({
      [styles.slot]: true,
      [styles.endAligned]: isEndAligned,
    });

    return (
      <div className={styles.rootNode}>
        <div className={styles.slotWrapper}>
          <div className={slotClasses}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
