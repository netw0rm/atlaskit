# Logo

This package contains the Atlassian logo, as well as a range of product logos.

> This packages is licensed under the Atlassian Design Guidelines - please check the LICENSE file for more information.

![Example logo](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/logo/docs/screencast.png)

## Try it out

Interact with a [live demo of the logo component](https://aui-cdn.atlassian.com/atlaskit/stories/@NAME@/@VERSION@/).

## Installation

```sh
npm install @atlaskit/logo
```

## Using the component

Use the component in your React app as follows:

```js
import AtlassianLogo from '@atlaskit/logo';
ReactDOM.render(<AtlassianLogo />, container);
```

## Controlling the logo color

You can control the logo color via CSS:

```html
<span style={{color: 'red'}}>
  <ConfluenceLogo />
</span>
```
