# Avatar

## Synopsis

Avatars are used to add a human touch and instant clarity when understanding which user did what in 
the application. We also use avatars for projects, repositories, spaces, groups and other container 
metaphors within Atlassian apps.

## Setup and install

```
npm install ak-avatar
```

## Using the definition

The `ak-avatar` package also exports the [Skate](https://github.com/skatejs/skatejs) definition, 
which allows you to define your own components using the Avatar definition, e.g.:

```
import { define } from 'skatejs';
import { definition } from 'ak-avatar';

define('x-avatar', definition);
```

## Component API


* [Avatar](#Avatar)
    * [`new Avatar()`](#new_Avatar_new)
    * [`avatar.size`](#Avatar+size) : <code>string</code>
    * [`avatar.src`](#Avatar+src) : <code>string</code>
    * [`avatar.alt`](#Avatar+alt) : <code>string</code>

<a name="new_Avatar_new"></a>

### `new Avatar()`
The definition for the Avatar component.

**HTML Example**
```js
<ak-avatar src="my/avatar/src/image.png"></ak-avatar>
```
**JS Example**
```js
import Avatar from 'ak-avatar';
const myAvatar = new Avatar();
```
<a name="Avatar+size"></a>

### `avatar.size` : <code>string</code>
The size of the avatar. One of:
'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', or 'xxxlarge'.

**Kind**: instance property of <code>[Avatar](#Avatar)</code>  
**Default**: <code>&quot;medium&quot;</code>  
**HTML Example**
```js
<ak-avatar size="large"></ak-avatar>
```
**JS Example**
```js
avatar.size = 'large';
```
<a name="Avatar+src"></a>

### `avatar.src` : <code>string</code>
The sauce.

**Kind**: instance property of <code>[Avatar](#Avatar)</code>  
**HTML Example**
```js
<ak-avatar src="my/avatar/src.png"></ak-avatar>
```
**JS Example**
```js
avatar.src = 'my/avatar/src.png';
```
<a name="Avatar+alt"></a>

### `avatar.alt` : <code>string</code>
The alt text for the Avatar.

**Kind**: instance property of <code>[Avatar](#Avatar)</code>  
**HTML Example**
```js
<ak-avatar alt="Avatar image" src="my/avatar/src.png"></ak-avatar>
```
**JS Example**
```js
avatar.alt = 'Avatar image';
```
