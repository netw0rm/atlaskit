/** @jsx vdom */

import { define, vdom, prop, Component } from 'skatejs';

import Counter from './counter';

/** This component simply renders the Counter component but overrides on of its counters
 *  using the override prop. It keeps track of its own state and updates counter when it needs
 *  to **/
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

export default App;
