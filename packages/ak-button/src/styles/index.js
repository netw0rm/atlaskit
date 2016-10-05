export default styles => {
  const { standard, primary, compact, selected, link, disabled, subtle } = styles.button;
  return {
    // light DOM styles
    ':host': {
      display: 'inline-block',
    },
    ':host(> _shadow_root_)': {
      display: 'inline-block',
    },
    ':host([disabled])': {
      'pointer-events': 'none',
    },
    // shadow DOM styles
    '::slotted([slot="before"])': {
      'margin-right': styles.sideSlotMargin,
    },
    '::slotted([slot="after"])': {
      'margin-left': styles.sideSlotMargin,
    },
    'before-slot-wrapper': {
      'align-self': 'center',
      display: 'flex',
    },
    'after-slot-wrapper': {
      'align-self': 'center',
      display: 'flex',
    },
    'button-content': {
      'align-items': 'baseline',
      display: 'inline-flex',
      'flex-wrap': 'nowrap',
    },
    'before-slot': {
      display: 'inline-flex',
    },
    'after-slot': {
      display: 'inline-flex',
    },
    'default-slot': {
      display: 'inline-flex',
    },
    root: {
      display: 'inline-block',
    },
    button: {
      'box-sizing': 'border-box',
      background: standard.background,
      'border-width': '0',
      'border-radius': styles.button.baseRadius,
      color: standard.color,
      display: 'inline-block',
      'font-style': 'normal',
      'font-size': styles.baseFont,
      height: styles.button.height,
      'line-height': styles.button.lineHeight,
      margin: '0',
      outline: 'none',
      padding: styles.button.padding,
      'text-align': 'center',
      transition: styles.button.transition,
      'user-select': 'none',
      border: styles.button.border,

      '&::-moz-focus-inner': {
        margin: 0,
        padding: 0,
        border: 0,
      },

      '&:hover': {
        background: standard.hover.background,
        cursor: 'pointer',
        'border-color': standard.hover.borderColor,
      },

      '&:active': {
        background: standard.active.background,
        'box-shadow': standard.active.boxShadow,
        'transition-duration': standard.active.transitionDuration,
      },

      '&:focus': {
        'box-shadow': `0 0 0 2px ${standard.focus.background}`,
        'transition-duration': standard.focus.transitionDuration,
      },
    },
    primary: {
      background: primary.background,
      color: primary.color,
      'font-weight': primary.fontWeight,
      'border-color': primary.borderColor,

      '&:hover': {
        background: primary.hover.background,
        'border-color': primary.borderColor,
      },

      '&:active': {
        background: primary.active.background,
      },
    },
    subtle: {
      background: 'none',
      color: subtle.color,
      'border-color': subtle.borderColor,
      '&:hover': {
        color: subtle.hover.color,
      },
    },
    disabled: {
      color: disabled.color,
      '::slotted(*)': { 'pointer-events': 'none' },
      cursor: 'not-allowed',
      background: disabled.background,
      'border-color': disabled.borderColor,
      'box-shadow': disabled.boxShadow,
    },
    selected: {
      background: selected.background,
      color: selected.color,
      'box-shadow': selected.boxShadow,
      '&:hover': {
        background: selected.hover.background,
        'border-color': selected.hover.borderColor,
        transition: 'none',
      },
    },
    link: {
      background: 'none',
      color: link.color,
      transition: 'color 0.1s ease-out',
      'box-shadow': link.boxShadow,
      'border-color': link.borderColor,

      '&:hover': {
        background: 'none',
        color: link.hover.color,
        'text-decoration': 'underline',
        'border-color': link.hover.borderColor,
      },

      '&:active': {
        color: link.active.color,
        'box-shadow': link.active.boxShadow,
        'text-decoration': 'none',
      },

      '&.disabled': {
        color: disabled.color,
        background: 'none',
      },
    },
    compact: {
      height: compact.height,
      'padding-top': compact.paddingTop,
      'padding-bottom': compact.paddingBottom,
    },
  };
};
