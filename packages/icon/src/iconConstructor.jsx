import React, { PropTypes, PureComponent } from 'react';

const sizes = ['small', 'medium', 'large', 'xlarge'];
const iconConstructorBase = Icon => (componentName, SvgIcon) =>
  class extends PureComponent {
    static propTypes = {
      /** string to apply as the svg title element */
      label: PropTypes.string.isRequired,
      /** control the size of the icon */
      size: PropTypes.oneOf(sizes),
      /** onclick handler for the icon element */
      onClick: PropTypes.func,
      /** for primary colour for icons */
      primaryColor: PropTypes.string,
     /** for secondary colour for 2-color icons. Set to inherit to control this via "fill" in CSS */
      secondaryColor: PropTypes.string,
    };

    static displayName = componentName;

    render() {
      const { label, size, onClick, primaryColor, secondaryColor } = this.props;
      return (<Icon
        glyph={SvgIcon}
        label={label}
        size={size}
        onClick={onClick}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />);
    }
  };

const prepareProps = (props) => {
  const { label: title, ...iconProps } = props;
  return { title, iconProps };
};

export { iconConstructorBase, prepareProps };
