## Adding Patterns to the website

Patterns are composed forms of atlaskit to demonstrate usage, and may not relate to a single component, but instead show how to use multiple components together. They are written directly into the website.

### Get the website up and running
(with apologies, we need to tidy this process)

To get the website running, pull down the atlaskit repo.

Once you have the atlaskit repo, run `yarn && yarn bootstrap`. Once that completes, cd into the `cd packages/website` then run `yarn && yarn start`. Check that the website compiles, and you can view it on `localhost:8080`.

## Add your pattern
(all paths assume you are in the website directory)

In the patterns directory, there is an index file, where examples are imported and exported. You need to import the new pattern you are going to be adding twice, once for the code and once for the raw, like so.

```js
import FocusedTaskExample from './FocusedTaskExample';
import navFocusedTaskExample from '!raw-loader!./FocusedTaskExample';
```

From there, you need to add your example to the array of examples, like so:
```js
{
  title: 'Example of Pattern',
  Component: PatternExample,
  src: patternExampleSrc,
  mainComponent: 'navigation',
  usedComponents: ['navigation'],
},
```

Add your file as you have named it. The website will now display your pattern among the list, and clicking on it, you should be able to see it.

### The pattern information object:

- title: The title to be displayed on the website
- Component: The component to be rendered in the example
- src: The source code of the component
- mainComponent: Optional, a component that will link out to this pattern.
- usedComponent: An array of atlaskit components used.
- type: The type of examples to be used. Current types are the standard example format found on the website, and a navTakeover, which replaces the navigation bar of the site with the provided Component.

### Other things to keep in mind

#### Your pattern should include all relevant code

We would rather have a code set that provides people all the information and be long, rather than something that is importing parts of its functionality to be concise. Your code should be copy/pastable to any location where the dependencies are met.
