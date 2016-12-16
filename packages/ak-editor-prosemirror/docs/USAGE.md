# ak-editor-prosemirror

A distribution of ProseMirror for Atlassian Editor that provides:

- Simplified ES6 exports from the package.
- TypeScript definitions.
- [Lerna](https://github.com/lerna/lerna) linking during development.

## Getting started

```bash
npm install --save ak-editor-prosemirror
```

All ProseMirror exports are done from the root (`ak-editor-prosemirror`), rather than from nested 
modules (e.g. `prosemirror/dist/model`).

This removes cognitive burden of needing to remember where each object lives, you just need to
remember the name. 

```js
import { ProseMirror } from 'ak-editor-prosemirror'
```

## Packaging

Two distributions are packaged:

- ES5 (via the `webpack` in `package.json`)
- ES2015 (via the `jsnext:main` in `package.json`)
