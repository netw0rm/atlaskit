# Profilecard

![Example profilecard](https://i.imgur.com/A8o1MIQ.png)

## Installation

```sh
npm install @NAME@
# or
yarn add @NAME@
```

## Using the resourced component

Import the component in your React app as follows:

```
import AkProfileCardResourced from '@NAME@';
ReactDOM.render(<AkProfileCardResourced />, container );
```

## Using the static component

Import the component in your React app as follows:

```
import { AkProfilecard } from '@NAME@';
ReactDOM.render(<AkProfileCard />, container);
```

## Classes

<dl>
<dt><a href="#ProfilecardResourced">ProfilecardResourced</a></dt>
<dd></dd>
<dt><a href="#Profilecard">Profilecard</a></dt>
<dd></dd>
</dl>

<a name="ProfilecardResourced"></a>

## ProfilecardResourced
**Kind**: global class
* Properties

    *  [profilecardResourced.userId](#ProfilecardResourced+userId) : <code>string</code>
    *  [profilecardResourced.cloudId](#ProfilecardResourced+cloudId) : <code>string</code>
    *  [profilecardResourced.actions](#ProfilecardResourced+actions) : <code>array</code>
    *  [profilecardResourced.apiEndpoint](#ProfilecardResourced+apiEndpoint) : <code>string</code>

<a name="new_ProfilecardResourced_new"></a>

### new ProfilecardResourced()
Create instances of the ProfilecardResourced component in a React context.

<a name="ProfilecardResourced+userId"></a>

### profilecardResourced.userId : <code>string</code>
**Kind**: instance property of <code>[ProfilecardResourced](#ProfilecardResourced)</code>
<a name="ProfilecardResourced+cloudId"></a>

### profilecardResourced.cloudId : <code>string</code>
**Kind**: instance property of <code>[ProfilecardResourced](#ProfilecardResourced)</code>
<a name="ProfilecardResourced+actions"></a>

### profilecardResourced.actions : <code>array</code>
Defining the action buttons on the card.
Array of one or more action objects with `label` and `callback` keys.
`label` defines the button text while `callback` is invoked when
the button is clicked.

**Kind**: instance property of <code>[ProfilecardResourced](#ProfilecardResourced)</code>
**Example**
```js
[{label: 'Chat', callback: () => { ... }}, ... ]
```
<a name="ProfilecardResourced+apiEndpoint"></a>

### profilecardResourced.apiEndpoint : <code>string</code>
**Kind**: instance property of <code>[ProfilecardResourced](#ProfilecardResourced)</code>
<a name="Profilecard"></a>

## Profilecard
**Kind**: global class
* Properties

    *  [profilecard.avatarUrl](#Profilecard+avatarUrl) : <code>string</code>
    *  [profilecard.fullName](#Profilecard+fullName) : <code>string</code>
    *  [profilecard.meta](#Profilecard+meta) : <code>string</code>
    *  [profilecard.nickname](#Profilecard+nickname) : <code>string</code>
    *  [profilecard.location](#Profilecard+location) : <code>string</code>
    *  [profilecard.timestring](#Profilecard+timestring) : <code>string</code>
    *  [profilecard.presence](#Profilecard+presence) : <code>string</code>
    *  [profilecard.actions](#Profilecard+actions) : <code>array</code>
    *  [profilecard.isLoading](#Profilecard+isLoading) : <code>bool</code>
    *  [profilecard.hasError](#Profilecard+hasError) : <code>bool</code>

<a name="new_Profilecard_new"></a>

### new Profilecard()
Create instances of the Profilecard component in a React context.

<a name="Profilecard+avatarUrl"></a>

### profilecard.avatarUrl : <code>string</code>
**Kind**: instance property of <code>[Profilecard](#Profilecard)</code>
<a name="Profilecard+fullName"></a>

### profilecard.fullName : <code>string</code>
**Kind**: instance property of <code>[Profilecard](#Profilecard)</code>
<a name="Profilecard+meta"></a>

### profilecard.meta : <code>string</code>
**Kind**: instance property of <code>[Profilecard](#Profilecard)</code>
<a name="Profilecard+nickname"></a>

### profilecard.nickname : <code>string</code>
**Kind**: instance property of <code>[Profilecard](#Profilecard)</code>
<a name="Profilecard+location"></a>

### profilecard.location : <code>string</code>
**Kind**: instance property of <code>[Profilecard](#Profilecard)</code>
<a name="Profilecard+timestring"></a>

### profilecard.timestring : <code>string</code>
**Kind**: instance property of <code>[Profilecard](#Profilecard)</code>
<a name="Profilecard+presence"></a>

### profilecard.presence : <code>string</code>
Indicates the users online status by showing a small icon
Allowed values: 'available', 'busy', 'unavailable' or 'none'

**Kind**: instance property of <code>[Profilecard](#Profilecard)</code>
**Default**: <code>&quot;none&quot;</code>
<a name="Profilecard+actions"></a>

### profilecard.actions : <code>array</code>
Defining the action buttons on the card.
Array of one or more action objects with `label` and `callback` keys.
`label` defines the button text while `callback` is invoked when
the button is clicked.

**Kind**: instance property of <code>[Profilecard](#Profilecard)</code>
**Example**
```js
[{label: 'Chat', callback: () => { ... }}, ... ]
```
<a name="Profilecard+isLoading"></a>

### profilecard.isLoading : <code>bool</code>
Indicates that the user info is being fetched

**Kind**: instance property of <code>[Profilecard](#Profilecard)</code>
<a name="Profilecard+hasError"></a>

### profilecard.hasError : <code>bool</code>
Indicates that the user info fetch request has failed

**Kind**: instance property of <code>[Profilecard](#Profilecard)</code>