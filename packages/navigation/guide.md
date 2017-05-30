# Navigation

Welcome! This package contains the glorious `Navigation` related packages.

A few things to note when developing for `Navigation`:

## Avoid importing from `@atlaskit/util-shared-styles`

For basically everything you want to be importing from `shared-variables.js`. Even if we import from `@atlaskit/util-shared-styles` and then directly export it. This reduces the number of 'source of truth' files.

## Colours
If you are using a colour directly from `@atlaskit/util-shared-styles` you are doing the wrong thing. All colours should either be included from

1. All colours in are controlled by the theme:

```js
import styled from 'styled-components';
import { getProvided } from '../../theme/util';

export const styled.div`
  border-top: 1px solid ${({ theme }) => getProvided(theme).keyline};
`;
```

You can find the preset colours in `theme/presets.js`.

2. If the colour is not controlled by theme (which should be almost nothing) then it should be imported from `shared-variables.js`

```js
import { unthemedColors } from './shared-variables';

// do stuff
```

