import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import sample from 'lodash.sample';
import { locateWebComponent } from 'akutil-common-test';

import { name } from '../package.json';
import AlignedStory from './AlignedStory';
import tagNames from './tagNames';
import { alignment } from '../src';


const { start, end } = alignment;

const tags = ['Candy canes', 'Tiramisu', 'Gummi bears', 'Wagon Wheels', 'Chupa Chups'];
const onRemove = text => action('Removing tag')(text);

const alignmentStory = dir => (<AlignedStory
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
  .add('animation (text-start alignment)', () => alignmentStory(start))
  .addSwapped('animation (text-start alignment) (swapped)', () => alignmentStory(start))
  .add('animation (text-end alignment)', () => alignmentStory(end))
  .addSwapped('animation (text-end alignment) (swapped)', () => alignmentStory(end))
  .addMonitored('animation (auto-remove)', () => {
    removeTag();
    return (<AlignedStory onRemove={removeTag} initialTags={tagNames} />);
  }, () => {});
