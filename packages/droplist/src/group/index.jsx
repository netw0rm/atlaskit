import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles.less';

/* eslint-disable react/no-unused-prop-types */
export default class Group extends PureComponent {
  static propTypes = {
    heading: PropTypes.string,
    elemAfter: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    children: PropTypes.node,
  }

  static defaultProps = {
    heading: null,
    children: null,
    elemAfter: null,
  }

  state = {
    ariaLabel: this.props.heading,
  }

  componentDidMount = () => {
    if (this.props.heading || this.props.elemAfter) {
      this.setState({ ariaLabel: this.getAriaLabel() });
    }
  }

  componentDidUpdate = () => {
    if (this.props.heading || this.props.elemAfter) {
      this.setState({ ariaLabel: this.getAriaLabel() });
    }
  }

  getAriaLabel = () => {
    const { props } = this;
    const elemAfter = props.elemAfter &&
      (typeof props.elemAfter === 'string' ?
        props.elemAfter :
        ReactDOM.findDOMNode(this).querySelector(`.${styles.groupElemAfter}`).textContent); // eslint-disable-line react/no-find-dom-node, max-len

    return `${props.heading} ${elemAfter || ''}`;
  }

  render() {
    const { props } = this;

    return (
      <div
        aria-label={this.state.ariaLabel}
        className={styles.group}
        role="group"
      >
        {props.heading ?
          <div
            aria-hidden="true"
            className={styles.heading}
            data-role="droplistGroupHeading"
          >
            <span className={styles.content}>{props.heading}</span>
            {props.elemAfter ?
              <span className={styles.groupElemAfter}>{props.elemAfter}</span> : null}
          </div> : null}
        {props.children}
      </div>
    );
  }
}
