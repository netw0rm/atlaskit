import {storiesOf} from '@kadira/storybook';
import {success, error, loading, highZoomLevel, lowZoomLevel} from './ViewerStories/image';

storiesOf('ImageView', {})
 .add('success', success)
 .add('error', error)
 .add('loading', loading)
 .add('highZoomLevel', highZoomLevel)
 .add('lowZoomLevel', lowZoomLevel)
;
