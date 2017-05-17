export const defaultGridSize = 8;

export const defaultGridColumns = 12;

export const defaultGridColumnWidth = defaultGridSize * 10;

/*
================================================
layout and spacing prop were imported into ../Grid so that documentation will
be clear. It must be kept in sync.
================================================
*/

export const spacing = {
  comfortable: (defaultGridSize * 5),
  cosy: (defaultGridSize * 2),
  compact: (defaultGridSize * 0.5),
};

export const layout = ['fixed', 'fluid'];
