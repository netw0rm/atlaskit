/** @jsx vdom */
import 'style!./host.less'; // eslint-disable-line import/no-unresolved

import classNames from 'classnames';
import shadowStyles from './shadow.less';
import { enumeration } from 'akutil-common';
import { vdom, define } from 'skatejs';

const SIZE_ATTRIBUTE_ENUM = {
  attribute: 'size',
  values: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
  missingDefault: 'medium',
  invalidDefault: 'medium',
};

const PRESENCE_ATTRIBUTE_ENUM = {
  attribute: 'presence',
  values: ['none', 'online', 'away', 'busy', 'offline'], // not confirmed yet
  missingDefault: 'none',
  invalidDefault: 'none',
};

const definition = {
  render(elem) {
    const imgClasses = classNames(shadowStyles.locals.img);
    const presenceClasses = classNames([shadowStyles.locals.presence, shadowStyles.locals[elem.presence]]); // eslint-disable-line max-len
    const outerDivClass = classNames([shadowStyles.locals.outerDiv, shadowStyles.locals[elem.size]]); // eslint-disable-line max-len
    const imgStyle = {};

    if (elem.borderColor) {
      imgStyle.borderColor = elem.borderColor;
    }
    return (
      <div class={outerDivClass} aria-label={elem.description}>
        <style>{shadowStyles.toString()}</style>
        <img alt={elem.description} src={elem.src} class={imgClasses} style={imgStyle} />
        <div class={presenceClasses}></div>
      </div>
    );
  },
  props: {
    size: enumeration(SIZE_ATTRIBUTE_ENUM)({
      attribute: true,
    }),
    presence: enumeration(PRESENCE_ATTRIBUTE_ENUM)({
      attribute: true,
    }),
    src: {
      attribute: true,
    },
    description: {
      attribute: true,
      default: '',
    },
    borderColor: {
      attribute: true,
    },
  },
};

export default define('ak-avatar', definition);
