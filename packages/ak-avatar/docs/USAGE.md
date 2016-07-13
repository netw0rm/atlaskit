# Avatar

## Synopsis

Avatars are used to add a human touch and instant clarity when understanding which user did what in 
the application. We also use avatars for projects, repositories, spaces, groups and other container 
metaphors within Atlassian apps.

## Setup and install

```
npm install ak-avatar
```

## Using the definition

The `ak-avatar` package exports the [Skate](https://github.com/skatejs/skatejs) definition for the 
Avatar component, which allows you to define your own components, e.g.:

```
import { define } from 'skatejs';
import definition from 'ak-avatar';

define('ak-avatar', definition);
```
