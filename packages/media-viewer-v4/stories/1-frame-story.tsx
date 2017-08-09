import {storiesOf} from '@kadira/storybook';
import {canGoPrev, canGoNext, image, video} from './FrameStories/stories';

storiesOf('Frame', {})
 .add('canGoPrev', canGoPrev)
 .add('canGoNext', canGoNext)
 .add('ImageViewer', image)
 .add('VideoViewer', video)
;
