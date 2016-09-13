import 'style!./host.less';
import { vdom, define } from 'skatejs';
import { enumeration } from 'akutil-common';
import shadowStyles from './shadow.less';
import classnames from 'classnames';

const ALIGNMENT_LEFT = 'left';
const ALIGNMENT_RIGHT = 'right';

const ALIGNMENT_ATTRIBUTE_ENUM = {
  attribute: 'alignment',
  values: [ALIGNMENT_LEFT, ALIGNMENT_RIGHT],
  missingDefault: '',
  invalidDefault: '',
};

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class TagGroup
 * @example @js import TagGroup from 'ak-tag-group';
 *
 * const tagGroup = new TagGroup();
 * document.body.appendChild(tagGroup);
 */
export default define('ak-tag-group', {
  render(elem) {
    const isRightAligned = elem.alignment === ALIGNMENT_RIGHT;
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
     *              Defaults to an empty string (text start alignment).
     *
     * @memberof TagGroup
     * @instance
     * @type {string}
     * @example @html <ak-tag-group alignment="right"></ak-tag-group>
     * @example @js tagGroup.alignment = 'right';
     */
    alignment: enumeration(ALIGNMENT_ATTRIBUTE_ENUM)({
      attribute: true,
    }),
  },
});
