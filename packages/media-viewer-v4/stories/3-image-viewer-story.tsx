import {storiesOf} from '@kadira/storybook';
import {success, error, loading, highZoomLevel, lowZoomLevel} from './ViewerStories/image';

storiesOf('Image View', {})
 .add('success', success)
 .add('error', error)
 .add('loading', loading)
 .add('highZoomLevel', highZoomLevel)
 .add('lowZoomLevel', lowZoomLevel)
;
