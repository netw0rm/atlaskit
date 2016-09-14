import 'style!./host.less';
import { vdom, define } from 'skatejs';
import { enumeration } from 'akutil-common';
import shadowStyles from './shadow.less';
import classnames from 'classnames';

/**
 * Group alignment values
 *
 * @exports alignment
 * @enum {string}
 */
const alignment = {
  /** Left alignment */
  left: 'left',
  /** Right alignment */
  right: 'right',
};

const ALIGNMENT_ATTRIBUTE_ENUM = {
  attribute: 'alignment',
  values: [alignment.left, alignment.right],
  missingDefault: '',
  invalidDefault: '',
};

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class TagGroup
 * @example @js import TagGroup from 'ak-tag-group';
 * import Tag from 'ak-tag';
 *
 * const tagGroup = new TagGroup();
 * const chocolateTag = new Tag();
 * chocolateTag.text = 'Chocolate';
 * tagGroup.appendChild(chocolateTag);
 *
 * document.body.appendChild(tagGroup); // show the tag group with the tags
 */
export default define('ak-tag-group', {
  render(elem) {
    const isRightAligned = elem.alignment === alignment.right;
    const classNames = classnames({
      [shadowStyles.locals.slot]: true,
      [shadowStyles.locals.rightAligned]: isRightAligned,
    });

    return (
      <div className={shadowStyles.locals.rootNode}>
        <style>{shadowStyles.toString()}</style>
        <div className={shadowStyles.locals.slotWrapper}>
          <slot className={classNames} />
        </div>
      </div>
    );
  },
  props: {
    /**
     * @description (Optional) A group alignment.
     *
     * Defaults to an empty string (which means it uses the text direction to determine
     * the alignment).
     *
     * This setting also controls the animation direction on tag removal,
     * e.g. left alignment means that the tags list moves to the left on removal
     * right alignment means it moves to the right (all based on the text direction,
     * e.g. right alignment in LTR means the tags move to the right, right alignment
     * in RTL means the tags move to the left).
     *
     * @memberof TagGroup
     * @instance
     * @type {alignment}
     * @example @html <ak-tag-group alignment="right">
     *   <ak-tag text="Cupcake"/ >
     *   <ak-tag text="Cheesecake"/ >
     *   <ak-tag text="Chocolate"/ >
     * </ak-tag-group>
     * @example @js import TagGroup, { alignment } from 'ak-tag-group';
     * import Tag from 'ak-tag';
     *
     * const tagGroup = new TagGroup();
     * const tags = ['Cupcake', 'Cheesecake', 'Chocolate'].map((text) => {
     *   const tag = new Tag();
     *   tag.text = text;
     *   return tag;
     * });
     * tags.forEach((tag) => tagGroup.appendChild(tag));
     *
     * tagGroup.alignment = alignment.right; // Is aligned at text-end of the current text direction
     *
     * document.body.appendChild(tagGroup); // show the tag group with the tags
     */
    alignment: enumeration(ALIGNMENT_ATTRIBUTE_ENUM)({
      attribute: true,
    }),
  },
});

export { alignment };
