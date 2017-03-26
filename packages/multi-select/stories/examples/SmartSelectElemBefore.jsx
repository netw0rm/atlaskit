import React from 'react';
import Avatar from '@atlaskit/avatar';
import Select from '@atlaskit/multi-select';

const selectItems = [
  {
    items: [
      { content: 'Anonymous User 1', value: 'user_1', elemBefore: <Avatar size="small" presence="online" />, tagElemBefore: <Avatar size="xsmall" /> },
      { content: 'Anonymous User 2', value: 'user_2', elemBefore: <Avatar size="small" presence="online" />, tagElemBefore: <Avatar size="xsmall" /> },
      { content: 'Anonymous User 3', value: 'user_3', elemBefore: <Avatar size="small" presence="busy" />, tagElemBefore: <Avatar size="xsmall" /> },
      { content: 'Anonymous User 4', value: 'user_4', elemBefore: <Avatar size="small" presence="offline" />, isDisabled: true, tagElemBefore: <Avatar size="xsmall" /> },
      { content: 'Anonymous User 5', value: 'user_5', elemBefore: <Avatar size="small" presence="busy" />, tagElemBefore: <Avatar size="xsmall" /> },
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
