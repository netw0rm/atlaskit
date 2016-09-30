import { vdom } from 'skatejs';
import shadowStyles from './styles/Viewing.less';

// Viewing simply renders a default slot.

/* eslint-disable react/prop-types */
export default (props) => (
  <div className={shadowStyles.locals.viewModeWrapper} onclick={() => (props.onClick())}>
    <slot name="viewmode" />
  </div>
);
