import {storiesOf} from '@kadira/storybook';
import {image, collection} from './MediaViewerStories/render';

storiesOf('MediaViewer', {})
 .add('Image', image)
 .add('Collection', collection)
;
