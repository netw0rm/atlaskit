import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './less/styles.less';

import { appearance, type, spacing, theme } from './internal/enumerated-properties';
import getClasses from './internal/get-button-classes';
import Content from './Content';
import Icon from './Icon';
import Span from './Span';
import Link from './Link';
import Button from './Button';

export default class AkButton extends Component {
  static propTypes = {
    /** The base styling to apply to the button, from the list primary, default,
    subtle, link, subtle-link. Defaults to default appearance. */
    appearance: PropTypes.oneOf(appearance.values),
    /** Set whether it is a button or a form submission, takes the option button
    or submit, defaulting to button. */
    type: PropTypes.oneOf(type.values),
    /** Provides a url for buttons being used as a link */
    href: PropTypes.string,
    /** Pass target down to to a link within the button component, if a href is provided. */
    target: PropTypes.string,
    /** Name of a linked form that the button submits. */
    form: PropTypes.string,
    /** Set if the button is clickable. When disabled, onClick functions cannot
    be called and if it has a href, it will be disabled. */
    isDisabled: PropTypes.bool,
    /** Define the spacing type of the button. Accepted values are default, compact, none. */
    spacing: PropTypes.oneOf(spacing.values),
    /** Change the style to indicate the button is selected. */
    isSelected: PropTypes.bool,
    /** Change the default styling, accepts default and dark. */
    theme: PropTypes.oneOf(theme.values),
    /** Places an icon within the button, before the button's text. */
    iconBefore: PropTypes.element,
    /** Places an icon within the button, after the button's text. */
    iconAfter: PropTypes.element,
    /** Add a classname to the button */
    className: PropTypes.string,
    /** action to be called on click */
    onClick: PropTypes.func,
    /** Assign specific tabIndex order to the underlying html button */
    tabIndex: PropTypes.number,
    /** pass aria-haspopup to underlying html button. */
    ariaHaspopup: PropTypes.bool,
    /** pass aria-expanded to underlying html button */
    ariaExpanded: PropTypes.bool,
    /** pass aria-controls to underlying html button */
    ariaControls: PropTypes.string,
    /** Provide a unique id to the button, which can be styled or referenced */
    id: PropTypes.string,
  }

  static defaultProps = {
    appearance: appearance.default,
    type: type.default,
    isDisabled: false,
    spacing: spacing.default,
    isSelected: false,
    theme: theme.default,
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
