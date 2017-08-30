import React from 'react';
import Tag from '@atlaskit/tag';
import TagGroup from '@atlaskit/tag-group';
import Avatar from '@atlaskit/avatar';

const TagsExample = () => (
  <TagGroup>
    <Tag text="Base Tag" />
    <Tag text="Avatar Before" elemBefore={<Avatar size="xsmall" />} />
    <Tag text="Linked Tag" href="/components/tag" />
    <Tag text="Rounded Tag" appearance="rounded" />
    <Tag text="Removable button" removeButtonText="Aria label" />
    <Tag
      text="Removal halted"
      removeButtonText="Aria label"
      onBeforeRemoveAction={() => console.log('Removal halted')}
    />
    <Tag
      text="Post Removal Hook"
      removeButtonText="Aria label"
      onBeforeRemoveAction={() => {
        console.log('Before removal');
        return true;
      }}
      onAfterRemoveAction={e => console.log('After removal', e)}
    />
  </TagGroup>
);

export default TagsExample;
