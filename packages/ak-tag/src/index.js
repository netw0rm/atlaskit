/** @jsx vdom */
import 'style!./host.less';

import { vdom, define } from 'skatejs';
import shadowStyles from './shadow.less';
import Chrome from './chrome';
import Text from './text';
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

    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <Chrome>
          <Text>{elem.text}</Text>
          {button}
        </Chrome>
      </div>
    );
  },
  props: {
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
    /**
     * @description The text for the remove button.
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
  },
});
