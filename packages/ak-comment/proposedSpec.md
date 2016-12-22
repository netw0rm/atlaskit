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
  avatar={<Avatar />}
  author="Ben Wong"
  lozenge={<Lozenge />}
  datetime={new Date()}
  dateformat="YYYY-MM-DD"
  actions={[
    <Button appearance="link" compact><TeamsIcon /></Button>,
    <Button appearance="link" compact><CreateIcon /></Button>,
    <Button appearance="link" compact><SnippetsIcon /></Button>,
  ]}
  content={(
    <div>
      <p>Content goes here. This can include <a href="/link">links</a> and other content.</p>
      <img src="/my/image" alt="my image"/>
    </div>
  )}
/>
```

The rationale behind using the `content` property is to be able to provide nested comments as children, in order to maintain the semantic nesting of `Comments` elements.

#### Notes/questions

* How should the date/time be specified? We could use a `Date` object or a string representation here.
* Do we want to allow users to provide any content for `avatar`, `actions` and `lozenge`, or should we instead always render the same component, and expose props to customize these?

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

* Does it make sense to provide nested `Comment` elements as `children`, or does it make more sense to provide the content as children instead?
