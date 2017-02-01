import classNames from 'classnames';
import { akColorPrimary3 } from '@atlaskit/util-shared-styles';
import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';
import Presence from './Presence';
import Image from './Image';

import sizes from './internal/sizes';
import presences from './internal/presences';

// we export the presence component to so that it can be consumed separately
export { Presence };

export default class Avatar extends PureComponent {
  static displayName = 'AkAvatar';
  static propTypes = {
    presenceBorderColor: PropTypes.string,
    presence: PropTypes.oneOf(presences),
    size: PropTypes.oneOf(sizes),
    src: PropTypes.string,
    label: PropTypes.string,
    children: PropTypes.element,
  }

  static defaultProps = {
    presenceBorderColor: akColorPrimary3, // white
    presence: 'none',
    size: 'medium',
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      hasError: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.setState({ isLoading: true });
    }
  }

  imageLoadedHandler = () => {
    this.setState({
      isLoading: false,
      hasError: false,
    });
  }

  imageErrorHandler = () => {
    this.setState({
      hasError: true,
      isLoading: false,
    });
  }

  render() {
    const { presenceBorderColor, presence, size, src, label, children } = this.props;
    const sizeClasses = classNames([
      styles[size],
      styles.size,
    ]);
    const imgWrapperClasses = classNames({
      [styles.loaded]: !this.state.isLoading,
    }, styles.imgWrapper);
    const presenceWrapperClasses = classNames({
      // hide the presence if presence prop is set to none and no custom presence is passed in
      [styles.hidden]: presence === 'none' && !children,
      [styles.presenceWrapper]: true,
    });
    return (
      <div className={styles.root}>
        <div className={sizeClasses}>
          <div className={imgWrapperClasses} aria-label={label}>
            <Image
              alt={label}
              src={src}
              className={styles.img}
              onLoad={this.imageLoadedHandler}
              onError={this.imageErrorHandler}
              hasError={this.state.hasError}
              isLoading={this.state.isLoading}
            />
          </div>

          <div className={presenceWrapperClasses}>
            <Presence presence={presence} borderColor={presenceBorderColor}>
              {children}
            </Presence>
          </div>
        </div>
      </div>
    );
  }
}
