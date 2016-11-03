# ComponentBase

`ak-component-base` is just a simple base component to build other components on top of. The only
feature it provides is an `override` prop which can be used by a consumer to prevent a component
from managing it's own state.

An example of this might be a popup component that has an `open` prop that can be set.
If you were tracking this state somewhere (in a Redux store for example) but the component was able to modify it's own open state (i.e responding to a mouseclick)
your state could become out of sync and cause issues. By setting the `open` prop via `override` instead a component will be prevented from ever modifying that prop.

**Note:** This means you'll usually need to hook into emitted events to update the state as required.

## Try it out

Interact with a [live demo of the ak-component-base component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-component-base/@VERSION@/).

## Installation

```sh
npm install ak-component-base
```

## Using the component

This component is meant as a base for other components to extend. The following example shows how you can do this with Skatejs.

#### Counter Component

This component simply keeps track of two numbers (both exposed as props) and increments them itself.

```js
import { define, vdom, prop } from 'skatejs';
import Base from 'ak-component-base';

const Counter = define('x-counter', Base.extend({
  props: Object.assign({}, {
    count1: prop.number({ default: 1 }),
    count2: prop.number({ default: 2 }),
  }, Base.props),
  attached(elem) {
    setInterval(() => (++elem.count1), 1);
    setInterval(() => (++elem.count2), 1000);
  },
  updated(elem, prev) {
    return Base.updated(elem, prev);
  },
  render(elem) {
    return [
      <div>Count1: {elem.count1}</div>,
      <div>Count2: {elem.count2}</div>,
    ];
  },
}));
```

As you can see, one count will increment every millisecond and the other, every second. The main things to notice
here are the `Base.extend(` around the object literal definition,  the `Object.assign(` around the props and the `Base.updated` call from the updated callback.

The `Object.assign` is because when extending a component usign the Object literal syntax, we will **override** base component, so we join them.

The `Base.updated` is not strictly required unless you are writing your own `updated` logic, in which case it is **vitally** important that you call it.

The equivalent in the ES6 Classes syntax would be:

```js
import { define, vdom, prop } from 'skatejs';
import Base from 'ak-component-base';

const Counter = define('x-counter', class extends Base {
  static get props () {
    return Object.assign({}, {
      count1: prop.number({ default: 1 }),
      count2: prop.number({ default: 2 })
    }, super.props);
  }
  static attached (elem) {
    setInterval(() => (++elem.count1), 1);
    setInterval(() => (++elem.count2), 1000);
  }
  static updated (elem, prev) {
    return super.updated(elem, prev)
  }
  static render (elem) {
    return [
      <div>Count1: {elem.count1}</div>,
      <div>Count2: {elem.count2}</div>
    ];
  }
});
```

By extending `ak-component-base` the Counter component now also has the `override` prop.

#### App Component

To show the useage of the `override` prop, we'll create another component to control part of the state.
Our App component will let Counter do whatever it likes with `count2` but will override `count1` to only update every 500 milliseconds and also count up by two.

```js
import { define, vdom, prop, Component } from 'skatejs';

import Counter from './counter'; // our previous example

const App = define('x-app', class extends Component {
  static get props() {
    return {
      count: prop.number({ default: 10 }),
    };
  }
  static attached(elem) {
    setInterval(() => (elem.count += 2), 500);
  }
  static render(elem) {
    return <Counter override={{ count1: elem.count }} />;
  }
});
```

You'll notice that App keeps track of the `count1` state itself (in its `count` prop) but instead of passing it into the `count1` prop of Counter, it is passed in via `override`.
Had it passed it in via `count1` the Counter would have continued to increment it every millisecond.
