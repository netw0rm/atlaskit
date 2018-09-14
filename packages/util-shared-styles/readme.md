## [DEPRECATED] Please use [@atlaskit/theme](https://www.npmjs.com/package/@atlaskit/theme) instead.

This package is not maintained anymore and there will be no releases in future.

---

This package provides you with the ADG colors & typography in a programmatic way.

You can either use the less files by importing them via

```less
@import '~@atlaskit/util-shared-styles/src/colors.less';
@import '~@atlaskit/util-shared-styles/src/fonts.less';

.myclass {
  color: @ak-color-R100;
  font-family: @ak-font-family;
}
```

or use them within JS via

```js
import {
  akColorN500 as defaultColor,
  akColorR500 as highlightColor,
  akFontFamily as fontFamily,
} from '@atlaskit/util-shared-styles';
```

*Please note that this module could have dependencies that are governed by the Atlassian Design Guidelines license which will be automatically included on install. Each dependency has a license file that indicates whether the Atlassian Design Guidelines license applies.*

We're here to help!
Let us know what you think of our components and docs, your feedback is really important for us.

Are you in trouble? Read through our contribution guidelines and raise an issue to us.
