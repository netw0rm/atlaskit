import { storiesOf, action } from '@kadira/storybook';
import { name } from '../package.json';
import AlignedStory from './AlignedStory.js';

const tags = ['Candy canes', 'Tiramisu', 'Gummi bears', 'Wagon Wheels', 'Chupa Chups'];
const onRemove = (text) => action('Removing tag')(text);

const alignmentStory = (dir) => (<AlignedStory
  onRemove={onRemove}
  initialTags={tags}
  alignment={dir}
/>);

storiesOf(name, module)
  .add('animation (left alignment)', () => alignmentStory('left'))
  .addRTL('animation (left alignment) (RTL)', () => alignmentStory('left'))
  .add('animation (right alignment)', () => alignmentStory('right'))
  .addRTL('animation (right alignment) (RTL)', () => alignmentStory('right'));
