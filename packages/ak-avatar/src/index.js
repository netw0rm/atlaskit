/** @jsx vdom */
import 'style!./host.less';

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

const definition = {
  render(elem) {
    const classes = classNames([shadowStyles.locals.img, shadowStyles.locals[elem.size]]);
    const imgStyle = {};

    if (elem.borderColor) {
      imgStyle.borderColor = elem.borderColor;
    }
    return (
      <span>
        <style>{shadowStyles.toString()}</style>
        <img alt={elem.alt} src={elem.src} class={classes} style={imgStyle} />
      </span>
    );
  },
  props: {
    size: enumeration(SIZE_ATTRIBUTE_ENUM)({
      attribute: true,
    }),
    src: {
      attribute: true,
    },
    alt: {
      attribute: true,
      default: '',
    },
    borderColor: {
      attribute: true,
    },
  },
};

export default define('ak-avatar', definition);
