import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './less/styles.less';

import getClasses from './internal/get-button-classes';
import Content from './Content';
import Icon from './Icon';
import Span from './Span';
import Link from './Link';
import Button from './Button';

/*
==========================================
NOTE: appearance, type, spacing and theme have been moved in-line
to the props and default props. The canonical list can be found at
./internal/enumerated-properties.jsx
==========================================
*/

export default class AkButton extends Component {
  static propTypes = {
    /** The base styling to apply to the button. */
    appearance: PropTypes.oneOf([
      'primary',
      'default',
      'subtle',
      'link',
      'subtle-link',
    ]),
    /** Set whether it is a button or a form submission. */
    type: PropTypes.oneOf(['button', 'submit']),
    /** Provides a url for buttons being used as a link. */
    href: PropTypes.string,
    /** Pass target down to a link within the button component, if a href is provided. */
    target: PropTypes.string,
    /** Name property of a linked form that the button submits when clicked. */
    form: PropTypes.string,
    /** Set if the button is disabled. */
    isDisabled: PropTypes.bool,
    /** Set the amount of padding in the button. */
    spacing: PropTypes.oneOf(['default', 'compact', 'none']),
    /** Change the style to indicate the button is selected. */
    isSelected: PropTypes.bool,
    /** Change the default styling. */
    theme: PropTypes.oneOf(['default', 'dark']),
    /** Places an icon within the button, before the button's text. */
    iconBefore: PropTypes.element,
    /** Places an icon within the button, after the button's text. */
    iconAfter: PropTypes.element,
    /** Add a classname to the button. */
    className: PropTypes.string,
    /** Handler to be called on click. */
    onClick: PropTypes.func,
    /** Assign specific tabIndex order to the underlying html button. */
    tabIndex: PropTypes.number,
    /** Pass aria-haspopup to underlying html button. */
    ariaHaspopup: PropTypes.bool,
    /** Pass aria-expanded to underlying html button. */
    ariaExpanded: PropTypes.bool,
    /** Pass aria-controls to underlying html button. */
    ariaControls: PropTypes.string,
    /** Provide a unique id to the button. */
    id: PropTypes.string,
  }

  static defaultProps = {
    appearance: 'default',
    type: 'button',
    isDisabled: false,
    spacing: 'default',
    isSelected: false,
    theme: 'default',
    tabIndex: null,
  }

  renderContent = () => {
    const { props } = this;

    return (<span className={styles.buttonWrapper}>
      {props.iconBefore ? <Icon source={props.iconBefore} /> : null}
      {props.children ? <Content>{props.children}</Content> : null}
      {props.iconAfter ? <Icon source={props.iconAfter} /> : null}
    </span>);
  }

  render() {
    // we remove className here so it doesnt get passed in with the rest of the props
    const { className, ...props } = this.props; // eslint-disable-line no-unused-vars
    // this will produce the real set of classNames. Note we are passing this.props and not props as
    // we want props.className to be in here as well (see get-button-classes.jsx)
    const classes = classNames(getClasses(styles, this.props));

    if (props.href) {
      if (props.isDisabled) {
        return (<Span {...props} className={classes}>{this.renderContent()}</Span>);
      }
      return (<Link {...props} className={classes}>{this.renderContent()}</Link>);
    }
    return (<Button {...props} className={classes}>{this.renderContent()}</Button>);
  }
}
