import { storiesOf, action } from '@kadira/storybook';
import { name } from '../package.json';
import AlignedStory from './AlignedStory.js';
import tagNames from './tagNames';
import { locateWebComponent } from 'akutil-common-test';
import sample from 'lodash.sample';

const tags = ['Candy canes', 'Tiramisu', 'Gummi bears', 'Wagon Wheels', 'Chupa Chups'];
const onRemove = (text) => action('Removing tag')(text);

const alignmentStory = (dir) => (<AlignedStory
  onRemove={onRemove}
  initialTags={tags}
  alignment={dir}
/>);

const getTags = () => {
  const group = locateWebComponent('ak-tag-group')[0];
  return locateWebComponent('ak-tag', group);
};

const removeTag = () => setTimeout(() => {
  const tagToRemove = sample(getTags());
  if (tagToRemove) {
    tagToRemove.remove();
  }
}, 100);

storiesOf(name, module)
  .add('animation (left alignment)', () => alignmentStory('left'))
  .addRTL('animation (left alignment) (RTL)', () => alignmentStory('left'))
  .add('animation (right alignment)', () => alignmentStory('right'))
  .addRTL('animation (right alignment) (RTL)', () => alignmentStory('right'))
  .addMonitored('animation (auto-remove)', () => {
    removeTag();
    return (<AlignedStory onRemove={removeTag} initialTags={tagNames} />);
  }, () => {});
