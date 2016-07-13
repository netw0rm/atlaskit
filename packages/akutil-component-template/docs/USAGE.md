# MyComponent

## Synopsis

This is a template for AtlasKit components. Update this skeleton with Usage instructions.

## Setup and install

```
npm install my-component
```

## Using the definition

The `ak-my-component` package also exports the [Skate](https://github.com/skatejs/skatejs) definition, 
which allows you to define your own components using the Avatar definition, e.g.:

```
import { define } from 'skatejs';
import definition from 'my-component';

define('my-component', definition);
```
