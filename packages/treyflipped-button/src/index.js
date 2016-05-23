import styles from './style.less'; // eslint-disable-line no-unused-vars
import {skate, vdom} from 'skatejs';

export default skate('x-hello', {
  properties: {
    name: { attribute: true }
  },
  render (elem) {
    vdom.text(`BYE!!, ${elem.name}`);
  }
});