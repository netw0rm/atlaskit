# Avatar

## Synopsis

Avatars are used to add a human touch and instant clarity when understanding which user did what in the application. We also use avatars for projects, repositories, spaces, groups and other container metaphors within Atlassian apps.

## Setup and install

```
npm install fake-package-name-here
```

## Component API


* [Avatar](#markdown-header-avatar)
    * [new Avatar()](#markdown-header-new-avatar)
    * [.size](#markdown-header-avatarsize-string) : string
    * [.src](#markdown-header-avatarsrc-string) : string
    * [.alt](#markdown-header-avataralt-string) : string

### new Avatar()
The definition for the Avatar component.

**Example**  
```js
<ak-avatar src="my/avatar/src/image.png"></ak-avatar>
```
### avatar.size : string
The size of the avatar

**Kind**: instance property of [Avatar](#markdown-header-new-avatar)  
**Default**: `"medium"`  
**Example**  
```js
<ak-avatar size="large"></ak-avatar>
```
**Example**  
```js
avatar.size = 'large';
```
### avatar.src : string
The sauce

**Kind**: instance property of [Avatar](#markdown-header-new-avatar)  
**Example**  
```js
<ak-avatar src="my/avatar/src.png"></ak-avatar>
```
### avatar.alt : string
The alt text for the Avatar.

**Kind**: instance property of [Avatar](#markdown-header-new-avatar)  
**Example**  
```js
<ak-avatar alt="Avatar image" src="my/avatar/src.png"></ak-avatar>
```
