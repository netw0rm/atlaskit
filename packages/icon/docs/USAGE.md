# Icon
This package contains the AtlasKit icons. All icons should be consumed separately unless your build tool supports tree shaking.

> This packages is licensed under the Atlassian Design Guidelines - please check the LICENSE file for more information.

![Example icon](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/icon/docs/icon.png)

## Try it out

Interact with a [live demo of the @NAME@ component.](https://aui-cdn.atlassian.com/atlaskit/stories/@NAME@/@VERSION@/)

## Installation

```sh
npm install @NAME@
```

## Using the component

### HTML

The `@NAME@` package exports the Icon React components.

Import the component in your React app as follows:

#### bundle.js

```js
import AkIconHome from '@NAME@/glyph/home';
ReactDOM.render(<AkIconHome />, container);
```

## Controlling the icon color

You can control the icon color via CSS:

```html
<span style={{color: 'red'}}>
  <AkIconHome />
</span>
```

## Use the bundle (all icons)

This package provides all icons bundled in one export but unless your build tool supports tree shaking, you should import only a single icon instead of the bundled version.

### bundle.js

```js
import * as icons from '@NAME@';
const { BitbucketLogo } = icons;

ReactDOM.render(<BitbucketLogo />, container);
```

Importing a single icon (this will still bundle **all** of the icons in your final bundle if you don't use tree shaking):

```js
import BitbucketLogo from '@NAME@';

ReactDOM.render(<BitbucketLogo />, container);
```

### Adding new icons

Adding new icons is as simple as checking out the AtlasKit repo, adding your SVG file to `/packages/icon/src/icons` and running

```sh
npm run prepublish
```

from within the `icon` package. This will clean up the SVG and generate a new `src/index.jsx` file and update all the stories in storybook to use it.

**NOTE:** The `reduced-ui-pack` package uses the icons from this package, so if you change add or remove any icons then you'll also need to update the tests in reduced-ui-pack.

Some things to look for:
* If your icon is used only in a specific context or product, place it in `/icon/src/icons/subfolder` and it will be namespaced appropriately.
* Check that the icon appears in the `All icons` story. Look for any clipping or sizing issues here.
* Check the `All icons (usage)` story to make sure the naming has worked as expected (paths/namespacing makes sense, etc).
* Check the `Icons with broken fills (solid parts)` story to make sure that no parts of your svg have hardcoded colors.
  * If any parts of your icon appear to be dark, check the svg file for instances of `fill="XXXXX"` and replace them with `fill="currentColor"`.
* Check the `Icons that are too big (red parts)` story to show any parts of the icon that fall outside the 24x24 size that icons should fill.
* Make sure you update the test in `icon/test/indexSpec.jsx` to include your icon.
* Make sure you use the appropriate commit message when adding or modifying icons
  * changing an icon is a patch
  * adding an icon is a feature
  * removing an icon is breaking change
  * renaming an icon is a breaking change

@FILE: Icons.md@
