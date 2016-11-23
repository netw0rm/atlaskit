# WC -> react migration guide

This file exists in the repository for the sake of describing conventions around our migration from web components to React components.

It can be deleted when the migration is complete.



## File names

* File names will need to become `.jsx` if using React virtual DOM, as this will let webpack know to compile using react-babel. Once things are all converted, we'll rename things back to `.js` because at that point, we can assume everything is React (thus has JSX).



## Linting

* You will need to add `/** @jsx React */` to prevent the "unused React" linting error. When we've converted all components to React, we can remove the `eslint-config-ak-base` eslint pragma, and then remove those comments.



## Lifecycle

- `attached()` -> `componentDidMount()`
- `detached()` -> `componentWillUnmount()`
- `updated()` -> `shouldComponentUpdate()`
- `render()` -> `render()`
- `rendered()` -> `componentDidUpdate()` (Skate's was called in the initial render, but React's is not)



## Props and state

Web component properties maps to props. It can be split into `propTypes` and `defaultProps`. The `defaultProps` getter will return an object of all Skate props that had a `default` option specified.

Private Web component properties (symbols) should become state, inly if absolutely necessary. We should be building stateless components as much as possible (something we probably should have done with the web components). If you need to have a stateful component, then you can set initial state in the constructor:

```
constructor(props) {
  super(props);
  this.state = { date: new Date() };
}
```

Any props that had a `get` or `set` in Skate, can likely use `componentWillReceiveProps` or `componentWillUpdate`.
