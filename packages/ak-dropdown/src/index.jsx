import React, { PureComponent, PropTypes } from 'react';


import styles from 'style!./less/styles.less';
import BaseItem from './components/BaseItem';
import LinkItem from './components/LinkItem';

export default class Dropdown extends PureComponent {

  render() {
    return (
      <div
        className={styles.dropdownContainer}
        style={{
          position: this.props.stepOutside || this.props.boundariesElement ? 'static' : 'relative',
          width: '300px'
        }}
      >
        <LinkItem
          href="http://google.com"
          elemBefore={<div>1</div>}
          elemAfter={<div>2</div>}>test linktest linktest linktest linktest linktest linktest linktest linktest link</LinkItem>
        <BaseItem elemBefore={<div>1</div>}
                  elemAfter={<div>2</div>}>test base</BaseItem>
      </div>);
  }
}
