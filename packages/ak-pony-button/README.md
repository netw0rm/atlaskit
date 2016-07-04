# PonyButton

Have you ever felt like you were something that you're not? If so, `ak-pony-button` is the component
for you.

`ak-pony-button` is a button that think it is a pony, hereafter referred to as a pony button.

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
## PonyButton
**Kind**: global class  

* [PonyButton](#markdown-header-ponybutton)
    * [new PonyButton()](#markdown-header-new-ponybutton)
    * [.name](#markdown-header-ponybuttonname-string) : string
    * [.click()](#markdown-header-ponybuttonclick)
    * [.neigh()](#markdown-header-ponybuttonneigh-ponybutton) ⇒ PonyButton
    * ["ak-neigh"](#markdown-header-akneigh)

### new PonyButton()
This button think it is a pony, but its really just a button.
I can write some more information about my pony button here.

This is a new paragraph. I'll write some more words here to pad it out.
There is a new line before this line but it should be in the same paragraph.
We can have some nicely formatted text here describing the component and giving some basic
information about its usage.

Here's some closing words in a third paragraph. Thanks for reading.

**Example**  
```js
<ak-pony-button>Button text.</ak-pony-button>
```
### ponyButton.name : string
The name of the pony button. Defaults to "Bob" if not supplied.

**Kind**: instance property of [PonyButton](#markdown-header-new-ponybutton)  
**Default**: `"Bob"`  
**Example**  
```js
<ak-pony-button name="Randy">Button text</ak-pony-button>
```
### ponyButton.click()
Event handler. The pony button will fire the ak-neigh event when it is clicked.

**Kind**: instance method of [PonyButton](#markdown-header-new-ponybutton)  
**Emits**: [ak-neigh](#markdown-header-akneigh)  
### ponyButton.neigh() ⇒ PonyButton
This method will fire the ak-neigh event.

**Kind**: instance method of [PonyButton](#markdown-header-new-ponybutton)  
**Returns**: [PonyButton](#markdown-header-new-ponybutton) - The PonyButton element.  
**Emits**: [ak-neigh](#markdown-header-akneigh)  
**Example**  
```js
ponyButton.neigh(); // Fires the ak-neigh event.
```
### "ak-neigh"
Description of the ak-neigh event goes here.

**Kind**: event emitted by [PonyButton](#markdown-header-new-ponybutton)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| detail.name | String | The name of the pony button. |

**Example**  
```js
ponyButton.addEventListener('ak-neigh', function (event) {
  console.log(event.detail.name + ' is hungry. Maybe your pony is hungry?');
});
```
