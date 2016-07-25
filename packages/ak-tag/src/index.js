/** @jsx vdom */
import 'style!./host.less';

import { vdom, define } from 'skatejs';
import shadowStyles from './shadow.less';
import Chrome from './chrome';
import Text from './text';
import Href from './href';
import Button from './button';

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

    let button = '';
    if (elem['remove-button-text']) {
      button = <Button text={elem['remove-button-text']} />;
    }

    let label;
    if (!elem.href) {
      label = <Text>{elem.text}</Text>;
    } else {
      label = <Href href={elem.href}>{elem.text}</Href>;
    }

    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <Chrome>
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
  },
});
