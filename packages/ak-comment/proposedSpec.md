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
* Actions: - Link buttons for user actions, e.g. (Responding), (Editing), (Reacting).

## API Proposal

### Comment

```
<Comment
  avatar={<Avatar />}
  author="Ben Wong"
  datetime={new Date()}
  actions={[
    <Button appearance="link" compact><TeamsIcon /></Button>,
    <Button appearance="link" compact><CreateIcon /></Button>,
    <Button appearance="link" compact><SnippetsIcon /></Button>,
  ]}
>
  <p>Content goes here. This can include <a href="/link">links</a> and other content.</p>

  <img src="/my/image" alt="my image"/>
</Comment>
```
