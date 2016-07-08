# PonyButton

Have you ever felt like you were something that you're not? If so, `ak-pony-button` is the component
for you.

`ak-pony-button` is a button that thinks it is a pony, hereafter referred to as a pony button.

This component was made as a test component for automatically generating documentation for AtlasKit
components.

This top section may contain information on usage, and general information for an AtlasKit component.
It may also contain links and badges (e.g. for downloads, build status, etc.), or links for further
reading, as well as dependencies and requirements.

Here is a random list of pony-related words to test formatting:

* Canter
* Trot
* Stable
* Yard
* Equestrian

## Requirements

Carrots or hay, a large yard, and patience. See [this useful guide (with pictures!)](http://www.wikihow.com/Raise-Horses)
for more information.

## Setup and installation

Follow these fake instructions:

```
npm install ak-pony-button
```

### ES6

```
import PonyButton from 'ak-pony-button';

let myPonyButton = new PonyButton();
```

## Component API


* [PonyButton](#PonyButton)
    * [`new PonyButton()`](#new_PonyButton_new)
    * [`ponyButton.name`](#PonyButton+name) : <code>string</code>
    * [`ponyButton.click()`](#PonyButton+click)
    * [`ponyButton.neigh()`](#PonyButton+neigh) ⇒ <code>[PonyButton](#PonyButton)</code>

* Events

    *  [`"ak-neigh"`](#PonyButton+event_ak-neigh)

<a name="new_PonyButton_new"></a>

### `new PonyButton()`
This button think it is a pony, but its really just a button.
I can write some more information about my pony button here.

This is a new paragraph. I'll write some more words here to pad it out.
There is a new line before this line but it should be in the same paragraph.
We can have some nicely formatted text here describing the component and giving some basic
information about its usage.

Here's some closing words in a third paragraph. Thanks for reading.

**HTML Example**
```js
<ak-pony-button>Button text.</ak-pony-button>
```
<a name="PonyButton+name"></a>

### `ponyButton.name` : <code>string</code>
The name of the pony button. Defaults to "Bob" if not supplied.

**Kind**: instance property of <code>[PonyButton](#PonyButton)</code>  
**Default**: <code>&quot;Bob&quot;</code>  
**HTML Example**
```js
<ak-pony-button name="Randy">Button text</ak-pony-button>
```
<a name="PonyButton+click"></a>

### `ponyButton.click()`
Event handler. The pony button will fire the ak-neigh event when it is clicked.

**Kind**: instance method of <code>[PonyButton](#PonyButton)</code>  
**Emits**: <code>[ak-neigh](#PonyButton+event_ak-neigh)</code>  
<a name="PonyButton+neigh"></a>

### `ponyButton.neigh()` ⇒ <code>[PonyButton](#PonyButton)</code>
This method will fire the ak-neigh event.

**Kind**: instance method of <code>[PonyButton](#PonyButton)</code>  
**Returns**: <code>[PonyButton](#PonyButton)</code> - The PonyButton element.  
**Emits**: <code>[ak-neigh](#PonyButton+event_ak-neigh)</code>  
**JS Example**
```js
ponyButton.neigh(); // Fires the ak-neigh event.
```
<a name="PonyButton+event_ak-neigh"></a>

### `"ak-neigh"`
Fired when the pony neighs. This normally happens when it is hungry.

**Kind**: event emitted by <code>[PonyButton](#PonyButton)</code>  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>detail.name</td><td><code>String</code></td><td><p>The name of the pony button.</p>
</td>
    </tr>  </tbody>
</table>

**JS Example**
```js
ponyButton.addEventListener('ak-neigh', function (event) {
  console.log(event.detail.name + ' neighed. Maybe your pony is hungry?');
});
```
