# Editor Shared Styles

This package contains style variables used throughout Atlassian Editor components.

You can either use the LESS files by importing them via

```less
@import '~akutil-editor-shared-styles/src/index.less';

.myclass {
  color: @ak-editor-active-foreground;
  font-family: @ak-editor-code-font-family;
}
```

or use them within JS via

```js
import {
  akEditorActiveForeground as defaultColor,
} from 'akutil-editor-shared-styles';
```

