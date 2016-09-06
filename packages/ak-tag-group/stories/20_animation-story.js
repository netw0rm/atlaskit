import { storiesOf, action } from '@kadira/storybook';
import { name } from '../package.json';
import AlignedStory from './AlignedStory.js';

const tags = ['Candy canes', 'Tiramisu', 'Gummi bears', 'Wagon Wheels', 'Chupa Chups'];
const onRemove = (text) => action('Removing tag')(text);

storiesOf(name, module)
  .add('animation (left alignment)', () => (
    <AlignedStory
      onRemove={onRemove}
      initialTags={tags}
      alignment="left"
    />))
  .add('animation (right alignment)', () => (
    <AlignedStory
      onRemove={onRemove}
      initialTags={tags}
      alignment="right"
    />));
