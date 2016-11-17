import classNames from 'classnames';
import React, { Component } from 'react';
import styles from './styles.less';
import Presence from './Presence';
import Image from './Image';

/**
 * @description Avatar component.
 * @class Avatar
 * @example @html <ak-avatar src="my/avatar/src/doge.png"></ak-avatar>
 * @example @js import Avatar from 'ak-avatar';
 * const myAvatar = new Avatar();
 *
 */
class Avatar extends Component {
  static get propTypes() {
    return {
      /**
       * @description Indicates a user's online status by showing a small icon on the avatar itself.
       * Allowed values: 'online', 'offline', 'busy' or 'none'
       * @memberof Avatar
       * @instance
       * @default none
       * @type {string}
       * @example @html <ak-avatar presence="online"></ak-avatar>
       * @example @js avatar.presence = 'online';
       */
      presence: React.PropTypes.oneOf(['none', 'online', 'busy', 'offline']),
      /**
       * @description Defines the size of the avatar.
       * Allowed values: 'small', 'medium', 'large', 'xlarge'.
       * @memberof Avatar
       * @instance
       * @default medium
       * @type {string}
       * @example @html <ak-avatar size="large"></ak-avatar>
       * @example @js avatar.size = 'large';
       */
      size: React.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
      /**
       * @description The source URL.
       * @memberof Avatar
       * @instance
       * @type {string}
       * @example @html <ak-avatar src="my/avatar/src.png"></ak-avatar>
       * @example @js avatar.src = 'my/avatar/src.png';
       */
      src: React.PropTypes.string,
      /**
       * @description Defines the label for the Avatar used by screen readers as fallback content
       * if the image fails to load.
       * @memberof Avatar
       * @instance
       * @type {string}
       * @example @html <ak-avatar label="Avatar for Jon Snow" src="my/avatar/src.png"></ak-avatar>
       * @example @js avatar.label = 'Avatar for Jon Snow';
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
      styles.locals[size],
      styles.locals.size,
    ]);
    const imgWrapperClasses = classNames({
      [styles.locals.loaded]: !this.state.loading,
    }, styles.locals.imgWrapper);
    const presenceWrapperClasses = classNames({
      // hide the presence if presence prop is set to none and no custom presence is passed in
      [styles.locals.hidden]: presence === 'none' && !children,
      [styles.locals.presenceWrapper]: true,
    });
    return (
      <div className={styles.locals.root}>
        <style>{styles.toString()}</style>
        <div className={sizeClasses}>
          <div className={imgWrapperClasses} aria-label={label}>
            <Image
              alt={label}
              src={src}
              className={styles.locals.img}
              onLoad={this.imageLoadedHandler}
              onError={this.imageErrorHandler}
              error={this.state.error}
              loading={this.state.loading}
            />
          </div>

          <div className={presenceWrapperClasses}>
            <Presence
              presence={presence}
              className={styles.locals.presence}
            >
              {children}
            </Presence>
          </div>
        </div>
      </div>
    );
  }
}

export default Avatar;
