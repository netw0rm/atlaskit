# ak-navigation

This is a sample component that displays a styled text.

You can use it via:

```html
<ak-navigation></ak-navigation>
```

## Light DOM modifications

`ak-navigation` modifies the light DOM in two places:
* the `ak-navigation-link` children passed in have their `selected` properties toggled
* the icon (probably `ak-icon`) children of `ak-navigation-link` have their `fill` properties manipulated.
