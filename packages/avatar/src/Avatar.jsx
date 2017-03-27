import classNames from 'classnames';
import { akColorPrimary3 } from '@atlaskit/util-shared-styles';
import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';
import Presence, { PRESENCE } from './Presence';
import Image from './components/Image';

export const SIZE = {
  values: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
  defaultValue: 'small',
};

export default class Avatar extends PureComponent {
  static propTypes = {
    /** Used to override the default border color of the presence indicator.
    Accepts any color argument that the border-color CSS property accepts. */
    presenceBorderColor: PropTypes.string,
    /** Indicates a user's online status by showing a small icon on the avatar.
    Refer to presence values on the Presence component */
    presence: PropTypes.oneOf(PRESENCE.values),
    /** Defines the size of the avatar */
    size: PropTypes.oneOf(SIZE.values),
    /** A url to load an image from (this can also be a base64 encoded image) */
    src: PropTypes.string,
    /** Defines the label for the Avatar used by screen readers as fallback
    content if the image fails to load. */
    label: PropTypes.string,
    /** Content to use as a custom presence indicator. Accepts any React element.
    For best results, it is recommended to use square content with height and
    width of 100% */
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
