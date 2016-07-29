import { vdom, define } from 'skatejs';
import Overlay from '../src/index';

export default define('overlay-with-onclickOverlay', {
  render() {
    return (
      <div onclickOverlay={() => console.log('toggle!')}>
        <Overlay open />
      </div>
    );
  },
});
