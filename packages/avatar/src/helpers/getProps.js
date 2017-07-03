const getAppearanceProps = (context, props) => {
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

  return {
    appearance,
    borderColor,
    groupAppearance,
    isActive,
    isDisabled,
    isFocus,
    isHover,
    isSelected,
    size,
    stackIndex,
  };
};

const getInteractionProps = (props) => {
  const {
    onBlur,
    onClick,
    onFocus,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseUp,
    tabIndex,
  } = props;

  return {
    onBlur,
    onClick,
    onFocus,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseUp,
    tabIndex,
  };
};

const getLinkElementProps = (props) => {
  const { href, target } = props;

  // handle security issue with noopener
  // https://mathiasbynens.github.io/rel-noopener
  const rel = (target === '_blank') ? 'noopener noreferrer' : null;

  return { href, rel, target };
};

const getButtonElementProps = (props) => {
  const { id, isDisabled, name } = props;

  return { 'aria-label': name, id, type: 'button', disabled: isDisabled };
};

export default function getProps(component) {
  const { context, props } = component;

  const defaultProps = {
    ...getAppearanceProps(context, props),
    ...getInteractionProps(props),
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
