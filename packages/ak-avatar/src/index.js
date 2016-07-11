/** @jsx vdom */
import 'style!./host.less'; // eslint-disable-line import/no-unresolved

import classNames from 'classnames';
import shadowStyles from './shadow.less';

import { enumeration } from 'akutil-common';
import { vdom } from 'skatejs';

const SIZE_ATTRIBUTE_ENUM = {
  attribute: 'size',
  values: ['xsmall', 'small', 'medium', 'large', 'xxlarge'],
  missingDefault: 'medium',
  invalidDefault: 'medium',
};

const definition = {
  render(elem) {
    const classes = classNames([shadowStyles.locals.img, shadowStyles.locals[elem.size]]);

    return (
      <span>
        <style>{shadowStyles.toString()}</style>
        <img alt={elem.alt} src={elem.src} class={classes} />
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
  },
};

export default definition;
