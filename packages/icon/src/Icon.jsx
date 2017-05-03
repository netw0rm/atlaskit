import React, { PropTypes, PureComponent } from 'react';
import classnames from 'classnames';
import styles from './styles.less';
import { NotImplementedError } from './internal/exceptions';
import { iconConstructorBase, prepareProps } from './iconConstructor';

const sizes = ['small', 'medium', 'large', 'xlarge'];

class Icon extends PureComponent {
  static propTypes = {
    /** string to apply as the svg title element */
    label: PropTypes.string.isRequired,
    /** control the size of the icon */
    size: PropTypes.oneOf(sizes),
    /** onclick handler for the icon element */
    onClick: PropTypes.func,
    /** glyph to show by Icon Component*/
    glyph: PropTypes.func,
    /** for primary colour for icons */
    primaryColor: PropTypes.string,
    /** for secondary colour for 2-color icons. Set to inherit to control this via "fill" in CSS */
    secondaryColor: PropTypes.string,
  }

  static defaultProps = {
    onClick() { },
    primaryColor: 'currentColor',
    secondaryColor: 'white',
  }

  render() {
    const iconBodyClasses = classnames([styles.iconBody, styles[this.props.size]]);
    const GlyphComponent = this.props.glyph;
    const colorStyles = {
      color: this.props.primaryColor,
      fill: this.props.secondaryColor,
    };
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <span className={iconBodyClasses} onClick={this.props.onClick} style={colorStyles}>
        <GlyphComponent label={this.props.label} className={styles.svg} role="img" />
      </span>
    );
  }
}

const iconConstructor = (componentName, SvgIcon) =>
  iconConstructorBase(Icon)(componentName, SvgIcon);
const size = sizes.reduce((p, c) => Object.assign(p, { [c]: c }), {});

export { NotImplementedError, size, iconConstructor, prepareProps };
export default Icon;
