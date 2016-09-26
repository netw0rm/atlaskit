# Icons

This package contains the AtlasKit icons. All icons can (and should be, unless your build tool supports tree shaking) be consumed separately.

> Please note the license of this package is the Atlassian Design Guidelines - please see LICENSE for more information.

## Try it out

Go to [the ak-icon Storybook](https://aui-cdn.atlassian.com/atlaskit/stories/ak-icon/@VERSION@/) to try for yourself.

## Setting up and installing

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

The fill color of an icon can be controlled via CSS:

```html
<span style="color: red;">
  <ak-icon-home></ak-icon-home>
</span>
```

### This package also provides all icons bundled in one export

> Please keep in mind that unless your build tool supports tree shaking, you might want to import only a single icon instead of the bundled version.

#### bundle.js

```js
import * as icons from 'ak-icon';
const { bitbucketLogo: BitbucketLogo } = icons;

// old-school
const icon = new BitbucketLogo();
document.body.appendChild(icon);

// or JSX
const x = (<BitbucketLogo />);
```

or a single one:

```js
import bitbucketLogo as BitbucketLogo from 'ak-icon';

// old-school
const icon = new BitbucketLogo();
document.body.appendChild(icon);

// or JSX
const x = (<BitbucketLogo />);
```

#### index.html

```html
<!-- ... -->
<ak-icon-home></ak-icon-home>
<ak-icon-bitbucket-logo></ak-icon-bitbucket-logo>
```
however keep in mind that this will pull in *all* icons, not only the ones you use, so it should mainly only be used for prototyping.

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```js
import HomeIcon from 'ak-icon/glyph/home';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(HomeIcon, {});

ReactDOM.render(<ReactComponent />, container);
```
