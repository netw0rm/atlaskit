import {storiesOf} from '@kadira/storybook';
import {canGoPrev, canGoNext, image, video} from './MainStories/stories';

storiesOf('Main', {})
 .add('canGoPrev', canGoPrev)
 .add('canGoNext', canGoNext)
 .add('ImageViewer', image)
 .add('VideoViewer', video)
;
