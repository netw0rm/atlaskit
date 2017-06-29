const getAppearanceProps = (context, props, state) => {
  const {
    appearance,
    groupAppearance,
    isActive,
    isDisabled,
    isFocus,
    isHover,
    isSelected,
    size,
    stackIndex,
  } = props;

  const borderColor = context.borderColor || props.borderColor;
  const { isLoading } = state;

  return {
    appearance,
    borderColor,
    groupAppearance,
    isActive,
    isDisabled,
    isFocus,
    isHover,
    isLoading,
    isSelected,
    size,
    stackIndex,
  };
};

const getInteractionProps = (component) => {
  const {
    onBlur,
    onFocus,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseUp,
  } = component;

  const { href, onClick, tabIndex } = component.props;

  return {
    href,
    onBlur,
    onClick,
    onFocus,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseUp,
    tabIndex,
  };
};

const getLinkElementProps = (props) => {
  const { href, target } = props;

  return { href, target };
};

const getButtonElementProps = (props) => {
  const { id, isDisabled, name } = props;

  return { 'aria-label': name, id, type: 'button', disabled: isDisabled };
};

export default function getProps(component) {
  const { context, props, state } = component;

  const defaultProps = {
    ...getAppearanceProps(context, props, state),
    ...getInteractionProps(component),
  };

  if (props.component) {
    return {
      ...defaultProps,
      ...props,
    };
  }

  if (props.href) {
    if (props.isDisabled) {
      return defaultProps;
    }

    return {
      ...defaultProps,
      ...getLinkElementProps(props),
    };
  }

  if (props.onClick) {
    return {
      ...defaultProps,
      ...getButtonElementProps(props),
    };
  }

  return defaultProps;
}
