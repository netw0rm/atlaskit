import React from 'react';
import Avatar from '@atlaskit/avatar';
import Select from '@atlaskit/multi-select';

function createItem(key, presence, disabled = false) {
  return {
    content: `Anonymous User ${key}`,
    elemBefore: <Avatar size="small" presence={presence} />,
    isDisabled: disabled,
    value: `user_${key}`,
    tag: {
      elemBefore: <Avatar size="xsmall" />,
      appearance: 'rounded',
    },
  };
}

const selectItems = [
  {
    items: [
      createItem(1, 'online'),
      createItem(2, 'online'),
      createItem(3, 'busy', true),
      createItem(4, 'offline'),
      createItem(5, 'busy'),
    ],
  },
];

export default (
  <Select
    items={selectItems}
    label="Select users to invite"
    placeholder="Search for user..."
    name="test"
    onSelectedChange={(item) => {
      console.log(item);
    }}
    shouldFitContainer
  />
);
