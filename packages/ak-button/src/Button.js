import { vdom } from 'skatejs';
import shadowStyles from './shadow.less';
import classNames from 'classnames';
import { appearance } from './enumeratedProperties';

const classKeys = shadowStyles.locals;
const { PRIMARY, SUBTLE, LINK } = appearance.values;

const getClasses = props => ({
  [classKeys.button]: true,
  [classKeys.compact]: props.compact,
  [classKeys.disabled]: props.disabled,
  [classKeys.selected]: props.selected && !props.disabled,
  [classKeys.primary]: props.appearance === PRIMARY && !props.disabled && !props.selected,
  [classKeys.subtle]: props.appearance === SUBTLE && !props.disabled && !props.selected,
  [classKeys.link]: props.appearance === LINK && !props.selected,
});

/* eslint-disable react/prop-types */
export default (props, children) => (
  <button
    className={classNames(getClasses(props))}
    type={props.type}
    disabled={props.disabled}
    onmousedown={e => e.preventDefault()}
  >
    {children()}
  </button>
);
