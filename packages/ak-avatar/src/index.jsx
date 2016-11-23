import classNames from 'classnames';
import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';
import Presence from './Presence';
import Image from './Image';

import sizes from './internal/sizes';
import presences from './internal/presences';

/**
 * @description Create instances of the Avatar component in a React context.
 * @class Avatar
 */
export default class Avatar extends PureComponent {
  static propTypes = {
    /**
     * @description Indicates a user's online status by showing a small icon on the avatar itself.
     * Allowed values: 'online', 'offline', 'busy' or 'none'
     * @memberof Avatar
     * @instance
     * @default none
     * @type {string}
     */
    presence: PropTypes.oneOf(presences),
    /**
     * @description Defines the size of the avatar.
     * Allowed values: 'small', 'medium', 'large', 'xlarge'.
     * @memberof Avatar
     * @instance
     * @default medium
     * @type {string}
     */
    size: PropTypes.oneOf(sizes),
    /**
     * @description The source URL.
     * @memberof Avatar
     * @instance
     * @type {string}
     */
    src: PropTypes.string,
    /**
     * @description Defines the label for the Avatar used by screen readers as fallback content
     * if the image fails to load.
     * @memberof Avatar
     * @instance
     * @type {string}
     */
    label: PropTypes.string,
    children: PropTypes.element,
  }

  static defaultProps = {
    presence: 'none',
    size: 'medium',
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.src !== nextProps.src) {
      this.setState({ loading: true });
    }
  }

  imageLoadedHandler = () => {
    this.setState({
      loading: false,
      error: false,
    });
  }

  imageErrorHandler = () => {
    this.setState({
      error: true,
      loading: false,
    });
  }

  render = () => {
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
              hasError={this.state.error}
              isLoading={this.state.loading}
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
