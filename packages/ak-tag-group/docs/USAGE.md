# TagGroup

![Example tag group](https://bytebucket.org/atlassian/atlaskit/raw/master/packages/ak-tag-group/docs/animation.gif)

This component displays an arbitrary number of [`ak-tag`](https://www.npmjs.com/package/ak-tag)s
in a grouped manner.
The group manages spacing and animation direction and allows for some alignment options.

## Setup and install

```sh
npm install ak-tag ak-tag-group # ak-tag-group has a peer dependency on ak-tag
```

## Using the component

### HTML

The `ak-tag-group` package exports the TagGroup [Skate](https://github.com/skatejs/skatejs) component.

Import the component in your JS resource:

#### bundle.js

```js
import 'ak-tag';
import 'ak-tag-group';
```

Now we can use the defined tag in our HTML markup, e.g.:

#### index.html

```html
<html>
  <head>
    <script src="bundle.js"></script>
  </head>
  <body>
    <!-- ... -->
    <ak-tag-group>
      <ak-tag text="Cupcake"></ak-tag>
      <ak-tag text="Ice cream"></ak-tag>
      <ak-tag text="Chocolate"></ak-tag>
    </ak-tag-group>
  </body>
</html>
```

or from within another JavaScript resource:

```js
import Tag from 'ak-tag';
import TagGroup from 'ak-tag-group';

const tagGroup = new TagGroup();
['Cupcake', 'Ice cream', 'Chocolate'].map((label) => {
  const tag = new Tag();
  tag.text = label;
  return tag;
}).forEach((tag) => tagGroup.appendChild(tag));
document.body.appendChild(tagGroup);
```

### React

```sh
npm install ak-tag ak-tag-group skatejs-react-integration
```

```js
import Tag from 'ak-tag';
import TagGroup from 'ak-tag-group';
import reactify from 'skatejs-react-integration';

const ReactTagGroup = reactify(TagGroup, {});
const ReactTag = reactify(Tag, {});

ReactDOM.render((
  <ReactTagGroup>
    <ReactTag text="Cupcake" />
    <ReactTag text="Ice cream" />
    <ReactTag text="Chocolate" />
  </ReactTagGroup>
), container);
```
