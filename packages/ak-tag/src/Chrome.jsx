import classNames from 'classnames';
import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';
import keyHandler from './internal/keyHandler';


/* eslint-disable react/prefer-stateless-function */
export default class Chrome extends PureComponent {
  static propTypes = {
    isLink: PropTypes.bool.isRequired,
    markedForRemoval: PropTypes.bool.isRequired,
    isRemovable: PropTypes.bool.isRequired,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
  }

  componentDidMount= () => {
    if (this.props.isLink) {
      // When the component is mounted, grab a reference and add a DOM listener;
      this.attachKeyHandlers(this.chromeLink);
    }
  }

  componentWillUnmount() {
    // Make sure to remove the DOM listener when the component is unmounted
    // TODO : remove event handler !
  }

  attachKeyHandlers = (elem) => { // TODO : fix attachKeyHandlers
    const followLink = () => {
      elem
        .querySelector('a')
        .click();
    };
    keyHandler(elem, followLink);
  };

  render() {
    const chromeClassNames = classNames({
      [styles.chrome]: true,
      [styles.markedForRemoval]: this.props.markedForRemoval,
      [styles.isRemovable]: this.props.isRemovable,
    });
    const chromeProps = {};
    if (this.props.isLink) {
      chromeProps.role = 'link';
      chromeProps.ref = 'chromeLink';
      chromeProps.tabIndex = 0;
    } else {
      chromeProps.tabIndex = -1;
    }
    return (<span
      {...chromeProps}
      ref={(linkTag) => { this.chromeLink = linkTag; }}
      className={chromeClassNames}
    >
      {this.props.children}
    </span>);
  }
}
