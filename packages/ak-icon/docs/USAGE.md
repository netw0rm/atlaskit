# Icon
This package contains the AtlasKit icons. All icons should be consumed separately unless your build tool supports tree shaking.

> This packages is licensed under the Atlassian Design Guidelines - please check the LICENSE file for more information.

![Example icon](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/ak-icon/docs/icon.png)

## Try it out

Interact with a [live demo of the ak-icon component.](https://aui-cdn.atlassian.com/atlaskit/stories/ak-icon/@VERSION@/)

## Installation

```sh
npm install ak-icon
```

## Using the component

### HTML

The `ak-icon` package exports the Icon React components.

Import the component in your React app as follows:

#### bundle.js

```js
import AkIconHome from 'ak-icon/glyph/home';
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
import * as icons from 'ak-icon';
const { BitbucketLogo } = icons;

ReactDOM.render(<BitbucketLogo />, container);
```

Importing a single icon (this will still bundle **all** of the icons in your final bundle if you don't use tree shaking):

```js
import BitbucketLogo from 'ak-icon';

ReactDOM.render(<BitbucketLogo />, container);
```

### Adding new icons
Adding new icons is as simple as checking out the Atlaskit repo, adding your svg file to `/packages/ak-icon/src/icons` and running

```sh
npm run prepublish
```

from within the `ak-icon` package. This will clean up the svg and generate a new `src/index.jsx` file and update all the stories in storybook to use it.

Some things to look for:
* If your icon is used only in a specific context or product, place it in `/ak-icon/src/icons/subfolder` and it will be namespaced appropriately.
* Check that the icon appears in the `All icons` story. Look for any clipping or sizing issues here.
* Check the `All icons (usage)` story to make sure the naming has worked as expected (paths/namespacing makes sense, etc).
* Check the `Icons with broken fills (solid parts)` story to make sure that no parts of your svg have hardcoded colors.
  * If any parts of your icon appear to be dark, check the svg file for instances of `fill="XXXXX"` and replace them with `fill="currentColor"`.
* Check the `Icons that are too big (red parts)` story to show any parts of the icon that fall outside the 20x20 size that icons should fill.
* Make sure you update the test in `ak-icon/test/indexSpec.jsx` to include your icon.
* Make sure you use the appropriate commit message when adding or modifying icons
  * changing an icon is a patch
  * adding an icon is a feature
  * removing an icon is breaking change
  * renaming an icon is a breaking change

@FILE: Icons.md@
