import {storiesOf} from '@kadira/storybook';
import {image, pdf, collection} from './MediaViewerStories/render';

storiesOf('MediaViewer', {})
 .add('Image', image)
 .add('PDF', pdf)
 .add('Collection', collection)
;
