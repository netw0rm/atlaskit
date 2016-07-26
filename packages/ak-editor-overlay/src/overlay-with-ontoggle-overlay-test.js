import { vdom, define } from 'skatejs';
import Overlay from '../src/index';

export default define('overlay-with-ontoggleOverlay', {
  render() {
    return (
      <div ontoggleOverlay={() => console.log('toggle!')}>
        <Overlay open />
      </div>
    );
  },
});
