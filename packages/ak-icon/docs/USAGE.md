This package contains the AtlasKit icons. All icons should be consumed separately unless your build tool supports tree shaking.

> This packages is licensed under the Atlassian Design Guidelines - please check the LICENSE file for more information.

## Try it out

Interact with a [live demo of the ak-icon component.](https://aui-cdn.atlassian.com/atlaskit/stories/ak-icon/@VERSION@/)

## Installation

```sh
npm install ak-icon
```

## Using the component

### HTML

The `ak-icon` package exports the Icon [Skate](https://github.com/skatejs/skatejs) components.

Import the component in your JS resource:

#### bundle.js

```js
import 'ak-icon/glyph/home';
```

Now you can use the defined tag in your HTML markup:

#### index.html

```html
<html>
  <head>
    <script src="bundle.js"></script>
  </head>
  <body>
    <!-- ... -->
    <ak-icon-home></ak-icon-home>
  </body>
</html>
```

You can also use it from within another JavaScript resource:

```js
import BitbucketLogo from 'ak-icon/glyph/bitbucket/logo';

const component = new BitbucketLogo();
document.body.appendChild(component);
```

## Controlling the icon color

You can control the icon color via CSS:

```html
<span style="color: red;">
  <ak-icon-home></ak-icon-home>
</span>
```

## Use the bundle (all icons)

This package provides all icons bundled in one export but unless your build tool supports tree shaking, you should import only a single icon instead of the bundled version.

### bundle.js

```js
import * as icons from 'ak-icon';
const { BitbucketLogo } = icons;

// old-school
const icon = new BitbucketLogo();
document.body.appendChild(icon);

// or JSX
const x = (<BitbucketLogo />);
```

Importing a single icon (this will still bundle **all** of the icons in your final bundle if you don't use tree shaking):

```js
import BitbucketLogo from 'ak-icon';

// old-school
const icon = new BitbucketLogo();
document.body.appendChild(icon);

// or JSX
const x = (<BitbucketLogo />);
```

### index.html

```html
<!-- ... -->
<ak-icon-home></ak-icon-home>
<ak-icon-bitbucket-logo></ak-icon-bitbucket-logo>
```
This should only be used for prototyping. Keep in mind that this will pull in *all* icons, not only the ones you use.

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```js
import HomeIcon from 'ak-icon/glyph/home';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(HomeIcon, {});

ReactDOM.render(<ReactComponent />, container);
```

### Adding new icons
Adding new icons is as simple as checking out the Atlaskit repo, adding your svg file to `/packages/ak-icon/src/icons` and running

```sh
npm run prepublish
```

from within the `ak-icon` package. This will clean up the svg and generate a new `src/index.js` file and update all the stories in storybook to use it.

Some things to look for:
* If your icon is used only in a specific context or product, place it in `/ak-icon/src/icons/subfolder` and it will be namespaced appropriately.
* Check that the icon appears in the `All icons` story. Look for any clipping or sizing issues here.
* Check the `All icons (usage)` story to make sure the naming has worked as expected (paths/namespacing makes sense, etc).
* Check the `Icons with broken fills (solid parts)` story to make sure that no parts of your svg have hardcoded colors.
  * If any parts of your icon appear to be dark, check the svg file for instances of `fill="XXXXX"` and replace them with `fill="currentColor"`.
* Check the `Icons that are too big (red parts)` story to show any parts of the icon that fall outside the 20x20 size that icons should fill.
* Make sure you update the test in `ak-icon/test/index.js` to include your icon.
* Make sure you use the appropriate commit message when adding or modifying icons
  * changing an icon is a patch
  * adding an icon is a feature
  * removing an icon is breaking change
  * renaming an icon is a breaking change

@FILE: Icons.md@