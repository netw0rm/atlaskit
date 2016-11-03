import classnames from 'classnames';
import { vdom, define } from 'skatejs';
import { enumeration } from 'akutil-common';

import shadowStyles from './shadow.less';


/**
 * Group alignment values. Based on the text-direction.
 *
 * @exports alignment
 * @enum {string}
 */
const alignment = {
  /** text-start alignment */
  start: 'start',
  /** text-end alignment */
  end: 'end',
};

const ALIGNMENT_ATTRIBUTE_ENUM = {
  attribute: 'alignment',
  values: Object.values(alignment),
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
    const isEndAligned = elem.alignment === alignment.end;
    const slotClasses = classnames({
      [shadowStyles.locals.slot]: true,
      [shadowStyles.locals.endAligned]: isEndAligned,
    });

    return (
      <div className={shadowStyles.locals.rootNode}>
        <style>{shadowStyles.toString()}</style>
        <div className={shadowStyles.locals.slotWrapper}>
          <slot className={slotClasses} />
        </div>
      </div>
    );
  },
  props: {
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
     * tagGroup.alignment = alignment.end; // Is aligned at text-end of the current text direction
     *
     * document.body.appendChild(tagGroup); // show the tag group with the tags
     */
    alignment: enumeration(ALIGNMENT_ATTRIBUTE_ENUM)({
      attribute: true,
    }),
  },
});

export { alignment };
