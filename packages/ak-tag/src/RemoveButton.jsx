import React, { Component } from 'react';
import keyHandler from './internal/keyHandler';
import styles from './styles.less';
import RemoveIcon from './RemoveIcon';

/* eslint-disable react/prop-types */
export default class RemoveButton extends Component {
  constructor(props) {
    super(props);
    this.removeAction = (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.props.onActivation();
    };
  }

  render() {
    return (<button
      {...this.props}
      className={styles.locals.button}
      aria-label={this.props.text}
      onMouseDown={e => (e.preventDefault())}
      onMouseOver={() => this.props.onHoverStateChange(true)}
      onMouseOut={() => this.props.onHoverStateChange(false)}
      ref={el => (keyHandler(el, this.removeAction))}
      onClick={this.removeAction}
    >
      <RemoveIcon />
    </button>);
  }
}
