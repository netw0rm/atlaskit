import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import GlobalNavigation from './components/GlobalNavigation';
import ContainerNavigation from './components/ContainerNavigation';
import Resizer from './components/Resizer';
import Spacer from './components/Spacer';
import styles from './index.less';
import { navigationOpenWidth, containerClosedWidth } from './utils/style-variables';
import { getGlobalWidth, getContainerWidth, getContainerPadding } from './utils/collapse';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resizeDelta: 0,
    };
  }

  getResizedWidth() {
    return Math.max(containerClosedWidth, this.props.width + this.state.resizeDelta);
  }

  render() {
    return (
      <div className={classNames(styles.locals.navigation)}>
        <Spacer width={this.getResizedWidth()} />
        <style>{styles.toString()}</style>
        <div className={classNames(styles.locals.globalAndContainer)}>
          <GlobalNavigation width={getGlobalWidth(this.getResizedWidth())} />
          <ContainerNavigation
            width={getContainerWidth(this.getResizedWidth())}
            padding={getContainerPadding(this.getResizedWidth())}
          />
        </div>
        <Resizer resizeHandler={(resizeDelta) => { this.setState({ resizeDelta }); }} />
      </div>
    );
  }
}

Navigation.propTypes = {
  width: PropTypes.number,
};

Navigation.defaultProps = {
  width: navigationOpenWidth,
};
