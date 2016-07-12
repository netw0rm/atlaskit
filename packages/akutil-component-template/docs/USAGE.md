# MyComponent

## Synopsis

This is a template for AtlasKit components. Update this skeleton with Usage instructions.

## Setup and install

```
npm install ak-my-component
```

## Using the definition

The `ak-my-component` package also exports the [Skate](https://github.com/skatejs/skatejs) definition, 
which allows you to define your own components using the Avatar definition, e.g.:

```
import { define } from 'skatejs';
import definition from 'ak-my-component';

define('x-my-component', definition);
```
