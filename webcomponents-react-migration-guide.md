# WC -> react migration guide

This file exists in the repository for the sake of describing conventions around our migration from web components to React components.

It can be deleted when the migration is complete.

## File names

* File names will need to become `.jsx` if using React virtual DOM, as this will let webpack know to compile using react-babel

## Linting

* You will need to add `/** @jsx React */` to prevent the "unused React" linting error. When we've converted all components to React, we can remove the `eslint-config-ak-base` eslint pragma, and then remove those comments.

## Lifecycle

* To be completed, but compare https://github.com/skatejs/skatejs#component-lifecycle with https://facebook.github.io/react/docs/react-component.html

## Props and state

* Web component properties maps to props. It can be split into `propTypes` and `defaultProps`
* Private Web component properties (symbols) should become state. The defaults should be assigned in the constructor:
```
constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
```
* React `defaultProps` should be taken from whatever skate's default assigning of props was.
* There is no equivalent to a property set / get handler in skate.