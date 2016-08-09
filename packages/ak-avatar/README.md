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

The `ak-avatar` package exports the Avatar [skate](https://github.com/skatejs/skatejs) component:

```
import Avatar from 'ak-avatar';

const myAvatar = new Avatar();
```
## Component API

* Properties

    *  [`avatar.size`](#Avatar+size) : string
    *  [`avatar.presence`](#Avatar+presence) : string
    *  [`avatar.src`](#Avatar+src) : string
    *  [`avatar.label`](#Avatar+label) : string

### Constructor
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
The size of the avatar.
Allowed values are: 'small', 'medium', 'large', 'xlarge'.

**Kind**: instance property of Avatar  
**Default**: `"medium"`  
**HTML Example**
```js
<ak-avatar size="large"></ak-avatar>
```
**JS Example**
```js
avatar.size = 'large';
```
### `avatar.presence` : string
An indicator of a users online status.
Will show a small colored icon on the avatar itself.
Allowed values are: 'online', 'offline', 'busy' or 'none'

**Kind**: instance property of Avatar  
**Default**: `"none"`  
**HTML Example**
```js
<ak-avatar presence="online"></ak-avatar>
```
**JS Example**
```js
avatar.presence = 'online';
```
### `avatar.src` : string
The source URL.

**Kind**: instance property of Avatar  
**HTML Example**
```js
<ak-avatar src="my/avatar/src.png"></ak-avatar>
```
**JS Example**
```js
avatar.src = 'my/avatar/src.png';
```
### `avatar.label` : string
The label for the Avatar. Used by screen readers and as fallback content should
the image fail to load.

**Kind**: instance property of Avatar  
**HTML Example**
```js
<ak-avatar label="Avatar for Jon Snow" src="my/avatar/src.png"></ak-avatar>
```
**JS Example**
```js
avatar.label = 'Avatar for Jon Snow';
```
