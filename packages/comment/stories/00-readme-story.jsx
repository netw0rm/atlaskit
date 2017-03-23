import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Code, Description, Heading } from '@atlaskit/util-readme';

/* eslint-disable import/no-duplicates, import/first */
import CommentExample from './examples/CommentExample';
import CommentNestingExample from './examples/CommentNestingExample';
import CommentActionExample from './examples/CommentActionExample';
import CommentAuthorExample from './examples/CommentAuthorExample';
import CommentTimeExample from './examples/CommentTimeExample';
import CommentLayoutExample from './examples/CommentLayoutExample';

import CommentExampleRaw from '!raw!./examples/CommentExample';
import CommentNestingExampleRaw from '!raw!./examples/CommentNestingExample';
import CommentActionExampleRaw from '!raw!./examples/CommentActionExample';
import CommentAuthorExampleRaw from '!raw!./examples/CommentAuthorExample';
import CommentTimeExampleRaw from '!raw!./examples/CommentTimeExample';
import CommentLayoutExampleRaw from '!raw!./examples/CommentLayoutExample';
/* eslint-enable import/first, import/no-duplicates */

import { name, description } from '../package.json';
import Comment, { CommentAction, CommentAuthor, CommentTime, CommentLayout } from '../src';
import CommentReadme from './examples/CommentReadme';

const commentPropDescriptions = {
  actions: 'An optional list of CommentAction items, which are rendered as a row of buttons below the comment content.',
  author: 'A CommentAuthor element containing the name of the comment author. Optionally, specify the href property to link to another page.',
  avatar: 'The element to display as the Comment avatar - generally an AtlasKit Avatar.',
  children: 'Nested comments should be provided as children of the Comment.',
  content: 'The main content of the Comment.',
  restrictedTo: 'The name of a group that a comment is restricted to. Will display in the top items',
  time: 'A CommentTime element containing the time to be displayed. Optionally, specify the href property to link to another page.',
  type: 'The type of the comment - will be rendered in a lozenge at the top of the Comment.',
};

const commentPropTypes = {
  actions: 'CommentAction[]',
  author: 'CommentAuthor',
  avatar: 'node',
  children: 'node',
  content: 'node',
  restrictedTo: 'String',
  time: 'CommentTime',
  type: 'String',
};

const commentFieldPropDescriptions = {
  onClick: 'Handler called when the element is clicked',
  onFocus: 'Handler called when the element is focused',
  onMouseOver: 'Handler called when the element is moused over',
};

const commentFieldPropTypes = {
  onClick: 'Function',
  onFocus: 'Function',
  onMouseOver: 'Function',
};

const commentActionPropDescriptions = { ...commentFieldPropDescriptions,
  ...{
    children: 'The content to render inside the action button',
  },
};

const commentActionPropTypes = { ...commentFieldPropTypes,
  ...{
    children: 'node',
  },
};

const commentAuthorPropDescriptions = { ...commentFieldPropDescriptions,
  ...{
    children: 'The name of the author',
    href: 'The URL of the link. If not provided, the element will be rendered as text instead of a link.',
  },
};

const commentAuthorPropTypes = { ...commentFieldPropTypes,
  ...{
    children: 'node',
    href: 'String',
  },
};

const commentTimePropDescriptions = { ...commentFieldPropDescriptions,
  ...{
    children: 'The time of the comment',
    href: 'The URL of the link. If not provided, the element will be rendered as text instead of a link.',
  },
};

const commentTimePropTypes = { ...commentFieldPropTypes,
  ...{
    children: 'node',
    href: 'String',
  },
};

storiesOf(name, module)
  .add('Comment readme', () => (
    <CommentReadme
      component={Comment}
      name="Comment"
      description={description}
      example={CommentExample}
      exampleRaw={CommentExampleRaw}
      propDescriptions={commentPropDescriptions}
      propTypes={commentPropTypes}
    >
      <Heading type="3">Nested comments</Heading>
      <Description>
        You may also nest comments underneath other comments.
        Comments will simply render child comments as nested comments.
      </Description>
      <Code code={CommentNestingExampleRaw}>
        {CommentNestingExample}
      </Code>
    </CommentReadme>
  ))
  .add('CommentAction readme', () => (
    <CommentReadme
      component={CommentAction}
      name="CommentAction"
      description="Displays an action item in a Comment. Provide this element to the actions property of a Comment."
      example={CommentActionExample}
      exampleRaw={CommentActionExampleRaw}
      propDescriptions={commentActionPropDescriptions}
      propTypes={commentActionPropTypes}
    />
  ))
  .add('CommentAuthor readme', () => (
    <CommentReadme
      component={CommentAuthor}
      name="CommentAuthor"
      description="Displays the author of a Comment. Provide this element to the author property of a Comment."
      example={CommentAuthorExample}
      exampleRaw={CommentAuthorExampleRaw}
      propDescriptions={commentAuthorPropDescriptions}
      propTypes={commentAuthorPropTypes}
    />
  ))
  .add('CommentTime readme', () => (
    <CommentReadme
      component={CommentTime}
      name="CommentTime"
      description="Displays the time of a Comment. Provide this element to the time property of a Comment."
      example={CommentTimeExample}
      exampleRaw={CommentTimeExampleRaw}
      propDescriptions={commentTimePropDescriptions}
      propTypes={commentTimePropTypes}
    />
  ))
  .add('CommentLayout readme', () => (
    <CommentReadme
      component={CommentLayout}
      name="CommentLayout"
      description=""
      example={CommentLayoutExample}
      exampleRaw={CommentLayoutExampleRaw}
      propDescriptions={commentPropDescriptions}
      propTypes={commentPropTypes}
    />
  ));
