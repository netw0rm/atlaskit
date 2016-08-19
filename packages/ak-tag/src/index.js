/** @jsx vdom */
import 'style!./host.less';

import { vdom, define, prop, props } from 'skatejs';
import shadowStyles from './shadow.less';
import Chrome from './chrome';
import Text from './text';
import Href from './href';
import Button from './button';
import {
  akColorN500 as defaultButtonFill,
  akColorR500 as highlightButtonFill,
} from 'akutil-shared-styles';

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class Tag
 * @example @js import Tag from 'ak-tag';
 * const tag = new Tag();
 */
export default define('ak-tag', {
  render(elem) {
    if (!elem.text) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('No text given, not rendering.'); // eslint-disable-line no-console
      }
      return null;
    }

    const chromeAttrs = {};
    let button = '';
    if (elem['remove-button-text']) {
       /* eslint-disable no-underscore-dangle */
      const hover = (toggle) => props(elem, { __removeButtonHover: toggle });
      button = (<Button
        fill={elem.__removeButtonHover ? highlightButtonFill : defaultButtonFill}
        text={elem['remove-button-text']}
        onmouseover={() => hover(true)}
        onmouseout={() => hover(false)}
      />);
      /* eslint-enable no-underscore-dangle */
    }

    let label;
    if (!elem.href) {
      label = <Text>{elem.text}</Text>;
    } else {
      chromeAttrs.tabindex = 0;
      label = <Href href={elem.href}>{elem.text}</Href>;
    }

    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <Chrome {...chromeAttrs}>
          {label}
          {button}
        </Chrome>
      </div>
    );
  },
  props: {
    /**
     * @description (Optional) A target href for the tag text to link to.
     * @memberof Tag
     * @instance
     * @type {string}
     * @example @html <ak-tag href="http://www.some.url"></ak-tag>
     * @example @js tag.href = 'http://www.some.url';
     */
    href: {
      attribute: true,
    },

    /**
     * @description (Optional) The text for the remove button.
     *              Implicitly defines that there will be a remove button
     * @memberof Tag
     * @instance
     * @type {string}
     * @example @html <ak-tag remove-button-text="Delete tag"></ak-tag>
     * @example @js tag.removeButtonText = 'Delete tag';
     */
    'remove-button-text': {
      attribute: true,
      default: '',
    },

    /**
     * @description The tag text.
     * @memberof Tag
     * @instance
     * @type {string}
     * @example @html <ak-tag text="todo"></ak-tag>
     * @example @js tag.text = 'todo';
     */
    text: {
      attribute: true,
    },

    // TODO replace with Symbol as soon as Skate suuports it
    __removeButtonHover: prop.boolean({
      initial: false,
    }),
  },
});
