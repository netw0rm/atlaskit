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

**Example**  
```js
<ak-pony-button>Button text.</ak-pony-button>
```
### ponyButton.name : string
The name of the pony button.

**Kind**: instance property of [PonyButton](#markdown-header-new-ponybutton)  
**Default**: `"Bob"`  
**Example**  
```js
<ak-pony-button name="Randy">Button text</ak-pony-button>
```
### ponyButton.click()
<strong>Event handler.</strong> The pony button will log output to the console
and fire the [ak-neigh](#PonyButton+event_ak-neigh) event when it is clicked.

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
