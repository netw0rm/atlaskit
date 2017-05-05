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
    appearance: PropTypes.oneOf(appearance.values),
    component: PropTypes.func,
    type: PropTypes.oneOf(type.values),
    href: PropTypes.string,
    target: PropTypes.string,
    form: PropTypes.string,
    isDisabled: PropTypes.bool,
    spacing: PropTypes.oneOf(spacing.values),
    isSelected: PropTypes.bool,
    theme: PropTypes.oneOf(theme.values),
    iconBefore: PropTypes.element,
    iconAfter: PropTypes.element,
    className: PropTypes.string,
    onClick: PropTypes.func,
    tabIndex: PropTypes.number,
    ariaHaspopup: PropTypes.bool,
    ariaExpanded: PropTypes.bool,
    ariaControls: PropTypes.string,
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
    const ButtonComponent = this.props.component || Button;
    if (ButtonComponent !== Button) {
      // if it's not our Button component, remove these props so they don't
      // bleed into the DOM
      delete props.component;
      delete props.appearance;
      delete props.isDisabled;
      delete props.isSelected;
      delete props.theme;
    }
    return (
      <ButtonComponent {...props} className={classes}>
        {this.renderContent()}
      </ButtonComponent>
    );
  }
}
