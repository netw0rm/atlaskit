export const appearances = {
  values: [
    'default',
    'subtle',
  ],
  default: 'default',
};

const appearancesMap = {
  default: 'standard',
  subtle: 'subtle',
};

export const mapAppearanceToFieldBase = appearance => appearancesMap[appearance];
