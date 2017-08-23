# Usage

See the Installation and Usage guide in the [jscodeshift repo](https://github.com/facebook/jscodeshift).

An example usage might look something like this:

```
jscodeshift -t codemod/icon/6-to-7 packages/navigation/stories --extensions js,jsx --parser flow
```

### Useful tips

* Pass the `-d` flag to do a dry run.
* Pass the `-p` flag to print the output of each transformation.
* By default the jscodeshift will only transform `.js` files. You can specify other extensions with the `--extensions` flag. e.g. `--extensions js,jsx`.
* If you are using Flow typing in your code, pass the `--parser flow` flag.

# Existing codemods

### @atlaskit/icon@8.0.0

```
jscodeshift -t codemod/icon/7-to-8 <target>
```

This codemod addresses the breaking change in icon 8.0.0 by refactoring all renamed glyph `@atlaskit/icon/glyph/*` import statements.

Here's an example of outdated code:

```javascript
import MyAppSwitcherIcon from '@atlaskit/icon/glyph/app-switcher';
```

This codemod would refactor the above to:

```javascript
import MyAppSwitcherIcon from '@atlaskit/icon/glyph/menu';
```

Note that the local import name (`MyAppSwitcherIcon` in the example above) is not changed, as this could conflict with existing variable names.

Refer to the test suite for a comprehensive description of how this codemod behaves.

### @atlaskit/icon@7.0.0

```
jscodeshift -t codemod/icon/6-to-7 <target>
```

This codemod addresses the breaking change in icon 7.0.0 by refactoring all unsupported `import` statements.

Here's an example of outdated code:

```javascript
import Icon from '@atlaskit/icon/lib/Icon'; // Importing the Icon component
import { AtlassianIcon } from '@atlaskit/icon'; // Importing a glyph
```

This codemod would refactor the above to:

```javascript
import Icon from '@atlaskit/icon'; // Importing the Icon component
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian'; // Importing a glyph
```

Refer to the test suite for a comprehensive description of how this codemod behaves.
