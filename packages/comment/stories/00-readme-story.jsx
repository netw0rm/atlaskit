import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme from '@atlaskit/util-readme';

import { name, description } from '../package.json';

/* eslint-disable import/no-duplicates, import/first */
import commentComponent from '../src';
import commentComponentSource from '!raw!../src';
import commentOverview from './examples/CommentExample';
import commentOverviewSource from '!raw!./examples/CommentExample';

import commentActionComponent from '../src/CommentAction';
import commentActionComponentSource from '!raw!../src/CommentAction';
import commentActionOverview from './examples/CommentActionExample';
import commentActionOverviewSource from '!raw!./examples/CommentActionExample';

import commentAuthorComponent from '../src/CommentAuthor';
import commentAuthorComponentSource from '!raw!../src/CommentAuthor';
import commentAuthorOverview from './examples/CommentAuthorExample';
import commentAuthorOverviewSource from '!raw!./examples/CommentAuthorExample';

import commentTimeComponent from '../src/CommentTime';
import commentTimeComponentSource from '!raw!../src/CommentTime';
import commentTimeOverview from './examples/CommentTimeExample';
import commentTimeOverviewSource from '!raw!./examples/CommentTimeExample';

import commentLayoutComponent from '../src/layout/CommentLayout';
import commentLayoutComponentSource from '!raw!../src/layout/CommentLayout';
import commentLayoutOverview from './examples/CommentLayoutExample';
import commentLayoutOverviewSource from '!raw!./examples/CommentLayoutExample';

import commentEditedComponent from '../src/CommentEdited';
import commentEditedComponentSource from '!raw!../src/CommentEdited';
import commentEditedOverview from './examples/CommentEditedExample';
import commentEditedOverviewSource from '!raw!./examples/CommentEditedExample';

/* eslint-enable import/no-duplicates, import/first */

storiesOf(name, module)
  .add('📖 Comment readme', () => (
    <Readme
      name={name}
      component={commentComponent}
      componentSource={commentComponentSource}
      example={commentOverview}
      exampleSource={commentOverviewSource}
      description={description}
    />
  ))
  .add('📖 CommentAction readme', () => (
    <Readme
      name={name}
      component={commentActionComponent}
      componentSource={commentActionComponentSource}
      example={commentActionOverview}
      exampleSource={commentActionOverviewSource}
      description={description}
    />
  ))
  .add('📖 CommentAuthor readme', () => (
    <Readme
      name={name}
      component={commentAuthorComponent}
      componentSource={commentAuthorComponentSource}
      example={commentAuthorOverview}
      exampleSource={commentAuthorOverviewSource}
      description={description}
    />
  ))
  .add('📖 CommentTime readme', () => (
    <Readme
      name={name}
      component={commentTimeComponent}
      componentSource={commentTimeComponentSource}
      example={commentTimeOverview}
      exampleSource={commentTimeOverviewSource}
      description={description}
    />
  ))
  .add('📖 CommentLayout readme', () => (
    <Readme
      name={name}
      component={commentLayoutComponent}
      componentSource={commentLayoutComponentSource}
      example={commentLayoutOverview}
      exampleSource={commentLayoutOverviewSource}
      description={description}
    />
  ))
  .add('📖 CommentEdited readme', () => (
    <Readme
      name={name}
      component={commentEditedComponent}
      componentSource={commentEditedComponentSource}
      example={commentEditedOverview}
      exampleSource={commentEditedOverviewSource}
      description={description}
    />
  ))
;
