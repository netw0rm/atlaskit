# ak-dmd-plugin

A dmd plugin for AtlasKit documentation.

### Modifications

* Add the `@js` and `@html` tags, which can be used inside an `@example` tag to mark it as a JavaScript or HTML example:

```
/**
 * @example @js console.log('Hello world!');
 */
```

* Add the `@playground` tag, which can be added to an `@example` tag to mark it as code used in interactive examples on the AtlasKit registry.

```
/**
 * @example @html @playground <p>Hello world!</p>
 */
```

* Modify the index of members to list properties, methods, and events separately.

See [dmd](https://github.com/jsdoc2md/dmd/) and [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown/) for more information.
