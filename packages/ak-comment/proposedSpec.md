# ak-comment

Latest design spec [here](https://extranet.atlassian.com/display/ADG/Comments+product).
See also the [harden page](https://extranet.atlassian.com/pages/viewpage.action?pageId=3064867141).

## Overview

Comments enable a discussion on an entity such as a page, blog post, issue or pull request.

A comment can include many elements, including:

* Commenter - A person's name and avatar
* Lozenges (optional) - Identify the type of comment, e.g. author, internal, external.
* Date and time - Date format of when the comment was published by the user. Display format should be customizable by the user.
* Message: - Main body of content, and should be editable. Can include text, images, links, tables, code blocks, and other media.
* Actions: - Link buttons for user actions, e.g. Reply, Edit, Delete, Like.

## API Proposal

### Comment

```
<Comment
  avatarSrc="/path/to/img"
  avatarLabel="Ben Wong's avatar" // Could have a sensible default based on the `commenter` prop?
  commenter="Ben Wong"
  role="author" // Renders a lozenge containing this text
  datetime={new Date()}
  dateformat="YYYY-MM-DD"
  content={(
    <div>
      <p>Content goes here. This can include <a href="/link">links</a> and other content.</p>
      <img src="/my/image" alt="my image"/>
    </div>
  )}
  actions={[
    { content: 'Reply', onClick: callbackFunc },
    { content: 'Edit', onClick: callbackFunc },
    { content: 'Like', onClick: callbackFunc },
  ]}
/>
```

The rationale behind using the `content` property is to be able to provide nested comments as children, in order to maintain the semantic nesting of `Comments` elements.

For reference, the WC implementation for `ak-comment` had the following slots, which correspond to these props in the proposal:

* Actions => `actions`
* Author => `author`
* Avatar => `avatarSrc`, `avatarLabel`
* Reply => `children` - see below
* Time => `datetime`, `dateformat`
* Default (comment content): `content`

#### Notes/questions

* How should the date/time be specified? We could use a `Date` object or a string representation here.

### Comment threads

Comments can be nested by providing additional `Comment` elements as children.

```
// Other Comment props left out for clarity

<Comment content="Root comment">
  <Comment content="First nested comment"/>
  <Comment content="Second nested comment">
    <Comment content="Reply to second nested comment" />
  </Comment>
</Comment>
<Comment content="Sibling comment" />
```

#### Notes/questions

* Does it make sense to provide nested `Comment` elements as `children`, or does it make more sense to provide the content as `children` and expose a `replies`/`nested` property instead?
