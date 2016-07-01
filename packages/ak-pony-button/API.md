<a name="PonyButton"></a>

## PonyButton
**Kind**: global class  

* [PonyButton](#PonyButton)
    * [new PonyButton()](#new_PonyButton_new)
    * [.name](#PonyButton+name) : <code>string</code>
    * [.click()](#PonyButton+click)
    * [.canter()](#PonyButton+canter) ⇒ <code>[PonyButton](#PonyButton)</code>
    * ["ak-neigh"](#PonyButton+event_ak-neigh)

<a name="new_PonyButton_new"></a>

### new PonyButton()
This button think it is a pony, but its really just a button.

**Example**  
```js
<ak-pony-button>Button text.</ak-pony-button>
```
<a name="PonyButton+name"></a>

### ponyButton.name : <code>string</code>
The name of the pony button.

**Kind**: instance property of <code>[PonyButton](#PonyButton)</code>  
**Default**: <code>&quot;Bob&quot;</code>  
**Example**  
```js
<ak-pony-button name="Randy">Button text</ak-pony-button>
```
<a name="PonyButton+click"></a>

### ponyButton.click()
<strong>Event handler.</strong> The pony button will log output to the console
and fire the [ak-neigh](#PonyButton+event_ak-neigh) event when it is clicked.

**Kind**: instance method of <code>[PonyButton](#PonyButton)</code>  
**Emits**: <code>[ak-neigh](#PonyButton+event_ak-neigh)</code>  
<a name="PonyButton+canter"></a>

### ponyButton.canter() ⇒ <code>[PonyButton](#PonyButton)</code>
This method will log output the the console and fire the ak-neigh event.

**Kind**: instance method of <code>[PonyButton](#PonyButton)</code>  
**Returns**: <code>[PonyButton](#PonyButton)</code> - The PonyButton element.  
**Emits**: <code>[ak-neigh](#PonyButton+event_ak-neigh)</code>  
**Example**  
```js
ponyButton.canter(); // Clop clop clop.
```
<a name="PonyButton+event_ak-neigh"></a>

### "ak-neigh"
Description of the ak-neigh event goes here.

**Kind**: event emitted by <code>[PonyButton](#PonyButton)</code>  
