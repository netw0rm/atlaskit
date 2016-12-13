# Navigation

This component is displayed as a sidebar and it contains two sections: "global" and "container". Both sections are used for navigating through different views and containers in a product.

![Example navigation](https://i.imgur.com/G3SusxW.gif)

Note: the previously-recommended [ak-page](https://www.npmjs.com/package/ak-page) component is no longer used alongside `ak-navigation`. See below for how to use `ak-navigation` in your application.

## Try it out

Interact with a [live demo of the ak-navigation component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-navigation/@VERSION@/).

## Installation

```sh
npm install ak-navigation
```

## Using the component

The `ak-navigation` module exposes a React component, and can be used in your React app like this:

```js
import Navigation, {
  AkContainerHeader,
} from 'ak-navigation';
import {
  AtlassianIcon,
  SearchIcon,
  CreateIcon,
} from 'ak-icon';
import nucleusLogo from '../nucleus.png';

<div
  style={{
    display: 'flex',
    height: '100vh',
    overflowY: 'auto',
    padding: 32,
  }}
>
  <style>{'body { margin: 0 }'}</style>
  <Navigation
    containerHeader={
      <a href="#foo">
        <AkContainerHeader
          text="AtlasCat"
          icon={
            <img alt="nucleus" src={nucleusLogo} />
          }
        />
      </a>
    }
    globalPrimaryIcon={
      <AtlassianIcon size="medium" />
    }
    globalSearchIcon={
      <SearchIcon />
    }
    globalCreateIcon={
      <CreateIcon />
    }
  >
    <a href="https://atlassian.com">
      <AkContainerItem text="Test page" />
    </a>
    <a href="https://facebook.github.io/react/">
      <AkContainerItem
        icon={
          <img src={nucleusLogo} alt="icon" />
        }
        text="Item with an icon"
      />
    </a>
  </Navigation>
</div>
```

