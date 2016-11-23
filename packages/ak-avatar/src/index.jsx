import classNames from 'classnames';
import styles from 'style!./styles.less';
import React, { Component } from 'react';
import Presence from './Presence';
import Image from './Image';

import sizes from './internal/sizes';
import presences from './internal/presences';

/**
 * @description Create instances of the Avatar component in a React context.
 * @class Avatar
 */
export default class Avatar extends Component {
  static get propTypes() {
    return {
      /**
       * @description Indicates a user's online status by showing a small icon on the avatar itself.
       * Allowed values: 'online', 'offline', 'busy' or 'none'
       * @memberof Avatar
       * @instance
       * @default none
       * @type {string}
       */
      presence: React.PropTypes.oneOf(presences),
      /**
       * @description Defines the size of the avatar.
       * Allowed values: 'small', 'medium', 'large', 'xlarge'.
       * @memberof Avatar
       * @instance
       * @default medium
       * @type {string}
       */
      size: React.PropTypes.oneOf(sizes),
      /**
       * @description The source URL.
       * @memberof Avatar
       * @instance
       * @type {string}
       */
      src: React.PropTypes.string,
      /**
       * @description Defines the label for the Avatar used by screen readers as fallback content
       * if the image fails to load.
       * @memberof Avatar
       * @instance
       * @type {string}
       */
      label: React.PropTypes.string,
      children: React.PropTypes.element,
    };
  }

  static get defaultProps() {
    return {
      presence: 'none',
      size: 'medium',
    };
  }

  constructor(props) {
    super(props);
    this.imageLoadedHandler = this.imageLoadedHandler.bind(this);
    this.imageErrorHandler = this.imageErrorHandler.bind(this);
    this.state = {
      loading: false,
      error: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.setState({ loading: true });
    }
  }

  imageLoadedHandler() {
    this.setState({
      loading: false,
      error: false,
    });
  }

  imageErrorHandler() {
    this.setState({
      error: true,
      loading: false,
    });
  }

  render() {
    const { presence, size, src, label, children } = this.props;
    const sizeClasses = classNames([
      styles[size],
      styles.size,
    ]);
    const imgWrapperClasses = classNames({
      [styles.loaded]: !this.state.loading,
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
              error={this.state.error}
              loading={this.state.loading}
            />
          </div>

          <div className={presenceWrapperClasses}>
            <Presence
              presence={presence}
              className={styles.presence}
            >
              {children}
            </Presence>
          </div>
        </div>
      </div>
    );
  }
}
