# Navigation

This component is displayed as a sidebar – it contains two sections, "global" and "container", both used for navigating through different views and containers in a product.

##Try it out

Interact with a [live demo of the ak-navigation component](https://aui-cdn.atlassian.com/atlaskit/stories/akutil-navigation/@VERSION@/).

Although the ak-navigation component can be used by itself, it works best in conjunction with the [ak-page](https://www.npmjs.com/package/ak-page) component.

## Installation

```sh
npm install ak-navigation
```

## Using the component

### HTML

The `ak-navigation` package exports the AkNavigation [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'ak-navigation';
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
    <ak-navigation
        slot="navigation"
        open
        containe-name="Nucleus"
        container-href="http://example.com"
        container-logo="http://example.com/img.jpg"
        product-href="http://atlassian.design"
        collapsible
      >
        <!-- Slots for global actions -->
        <ak-icon slot="global-home" glyph="bitbucket" />
        <ak-icon slot="global-search" glyph="search" />
        <ak-icon slot="global-create" glyph="create" />

        <!-- Slots for global help / account -->
        <ak-dropdown position="right bottom" slot="global-profile">
          <ak-dropdown-trigger slot="trigger">
            <ak-avatar size="small" src="http://example.com/img.jpg" />
          </ak-dropdown-trigger>
          <ak-dropdown-item>Settings</ak-dropdown-item>
          <ak-dropdown-item>Log out</ak-dropdown-item>
        </ak-dropdown>
        <ak-dropdown position="right bottom" slot="global-help">
          <ak-dropdown-trigger slot="trigger">
            <ak-icon glyph="help" />
          </ak-dropdown-trigger>
          <ak-dropdown-item>AtlasKit is great</ak-dropdown-item>
          <ak-dropdown-item>Tell your friends</ak-dropdown-item>
        </ak-dropdown>

        <!-- Slots for search and create drawer content -->
        <div is slot="global-search-drawer">
          Search
        </div>
        <div is slot="global-create-drawer">
          Create
        </div>

        <!-- Default slot is the container -->
        <ak-navigation-link selected>
          <ak-icon slot="icon" glyph="calendar" /> Calendar
        </ak-navigation-link>
        <ak-navigation-link href="http://atlassian.design" >
          <ak-icon slot="icon" glyph="overview" /> Atlassian design
        </ak-navigation-link>
        <ak-navigation-link>
          <ak-icon slot="icon" glyph="canvas" /> Canvas
        </ak-navigation-link>
        <ak-navigation-link>
      </ak-navigation>
  </body>
</html>
```

You can also use it from within another JavaScript resource:

```js
import Navigation from 'ak-navigation';

const component = new Navigation();
document.body.appendChild(component);
```

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```js
import Navigation from 'ak-navigation';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(Navigation, {});

ReactDOM.render(<ReactComponent />, container);
```
