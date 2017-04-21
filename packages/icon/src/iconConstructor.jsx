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
    };

    static displayName = componentName;

    render() {
      const { label, size, onClick } = this.props;
      return (<Icon glyph={SvgIcon} label={label} size={size} onClick={onClick} />);
    }
  };

const prepareProps = (props) => {
  const { label: title, ...iconProps } = props;
  return { title, iconProps };
};

export { iconConstructorBase, prepareProps };
