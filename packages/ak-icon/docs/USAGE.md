# Icons

This package contains the AtlasKit icons. All icons should be consumed separately unless your build tool supports tree shaking.

> This packages is licensed under the Atlassian Design Guidelines - please check the LICENSE file for more information.

## Try it out

Interact with a [live demo of the ak-icon component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-icon/@VERSION@/)

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

##Controlling the icon color

You can control the icon color via CSS:

```html
<span style="color: red;">
  <ak-icon-home></ak-icon-home>
</span>
```

#### bundle.js

This package provides all icons bundled in one export but unless your build tool supports tree shaking, you should import only a single icon instead of the bundled version.

```js
import * as icons from 'ak-icon';
const { bitbucketLogo: BitbucketLogo } = icons;

// old-school
const icon = new BitbucketLogo();
document.body.appendChild(icon);

// or JSX
const x = (<BitbucketLogo />);
```

Import a single icon:

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
This should only be used for prototyping. Keep in mind that this will pull in *all* icons, not only the ones you use.

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```js
import HomeIcon from 'ak-icon/glyph/home';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(HomeIcon, {});

ReactDOM.render(<ReactComponent />, container);
```
