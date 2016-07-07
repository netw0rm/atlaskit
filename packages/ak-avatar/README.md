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


* [Avatar](#markdown-header-avatar)
    * [`new Avatar()`](#markdown-header-new-avatar)
    * [`.size`](#markdown-header-avatarsize-string) : string
    * [`.src`](#markdown-header-avatarsrc-string) : string
    * [`.alt`](#markdown-header-avataralt-string) : string

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
### `avatar.size` : string
The size of the avatar. One of:
'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', or 'xxxlarge'.

**Kind**: instance property of [Avatar](#markdown-header-new-avatar)  
**Default**: `"medium"`  
**HTML Example**
```js
<ak-avatar size="large"></ak-avatar>
```
**JS Example**
```js
avatar.size = 'large';
```
### `avatar.src` : string
The sauce.

**Kind**: instance property of [Avatar](#markdown-header-new-avatar)  
**HTML Example**
```js
<ak-avatar src="my/avatar/src.png"></ak-avatar>
```
**JS Example**
```js
avatar.src = 'my/avatar/src.png';
```
### `avatar.alt` : string
The alt text for the Avatar.

**Kind**: instance property of [Avatar](#markdown-header-new-avatar)  
**HTML Example**
```js
<ak-avatar alt="Avatar image" src="my/avatar/src.png"></ak-avatar>
```
**JS Example**
```js
avatar.alt = 'Avatar image';
```
