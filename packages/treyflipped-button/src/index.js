import styles from './style.less'; // import our css modules using es6 imports
import {skate, vdom} from 'skatejs';

export default skate('x-hello', {
  properties: {
    name: { attribute: true }
  },
  render (elem) {
    vdom.text(`BYE!!, ${elem.name}`);
    console.log("rending")
  }
});