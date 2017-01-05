import { storiesOf } from '@kadira/storybook';
import React, { PropTypes, PureComponent } from 'react';

import Comment from '../src';
import { name } from '../package.json';
import { clickHandler } from './_constants';

class NestedComment extends PureComponent {
  static propTypes = {
    content: PropTypes.node,
    children: PropTypes.node,
  }

  render() {
    return (
      <Comment
        avatarLabel="User avatar"
        avatarSrc=""
        author="John Smith"
        datetime="30, August 2016"
        content={this.props.content}
        actions={[
          { content: 'Reply', onClick: clickHandler },
          { content: 'Edit', onClick: clickHandler },
          { content: 'Delete', onClick: clickHandler },
          { content: 'Like', onClick: clickHandler },
        ]}
      >
        {this.props.children}
      </Comment>
    );
  }
}

storiesOf(name, module)
  .add('ak-comment with nested comments', () => (
    <div>
      <NestedComment content="Root-level comment">
        <NestedComment content="1st-level comment 1">
          <NestedComment content="2nd-level child comment" />
        </NestedComment>
        <NestedComment content="1st-level comment 2" />
      </NestedComment>
      <NestedComment content="Root-level comment">
        <NestedComment content="1st-level comment 1" />
        <NestedComment content="1st-level comment 2" />
        <NestedComment content="1st-level comment 3">
          <NestedComment content="2nd-level child comment" />
        </NestedComment>
        <NestedComment content="1st-level comment 4">
          <NestedComment content="2nd-level child comment">
            <NestedComment content="3rd-level child comment">
              <NestedComment content="4th-level child comment" />
            </NestedComment>
          </NestedComment>
        </NestedComment>
      </NestedComment>
    </div>
  ));
