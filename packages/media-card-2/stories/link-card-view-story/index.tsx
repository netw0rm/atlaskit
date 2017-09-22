import * as React from 'react';
import {action} from '@kadira/storybook';

export function uploading() {
  const actions: Action[] = [
    {
      type: 'delete',
      label: 'Delete',
      handler: action('Delete')
    }
  ];
  return (
    <LinkCardView status="uploading" actions={actions}/>
  );
}

export function loading() {
  return (
    <LinkCardView status="loading"/>
  );
}

export function loaded() {
  return (
    <LinkCardView status="loaded" type="image" name="foobar.jpg" size={456000}/>
  );
}

export function error() {
  return (
    <LinkCardView status="errored"/>
  );
}
