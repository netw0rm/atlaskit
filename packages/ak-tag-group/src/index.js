import 'style!./host.less';
import { vdom, define } from 'skatejs';
import { enumeration } from 'akutil-common';
import shadowStyles from './shadow.less';
import classnames from 'classnames';

const ALIGNMENT_RIGHT = 'right';

const ALIGNMENT_ATTRIBUTE_ENUM = {
  attribute: 'alignment',
  values: ['left', ALIGNMENT_RIGHT],
  missingDefault: '',
  invalidDefault: '',
};

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class TagGroup
 * @example @js import TagGroup from 'ak-tag-group';
 * const component = new TagGroup();
 */
export default define('ak-tag-group', {
  render(elem) {
    const isRightAligned = elem.alignment === ALIGNMENT_RIGHT;
    const classNames = classnames({
      [shadowStyles.locals.defaultSlotWrapper]: true,
      [shadowStyles.locals.rightAligned]: isRightAligned,
      [shadowStyles.locals.leftAligned]: !isRightAligned,
    });

    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <div className={classNames}>
          <slot className={shadowStyles.locals.defaultSlot} />
        </div>
      </div>
    );
  },
  props: {
    /**
     * @description (Optional) An alignment. Defaults to left.
     * @memberof TagGroup
     * @instance
     * @type {string}
     * @example @html <ak-tag-group alignment="right"></ak-tag-group>
     * @example @js tagGroup.alignment = 'left';
     */
    alignment: enumeration(ALIGNMENT_ATTRIBUTE_ENUM)({
      attribute: true,
    }),
  },
});
