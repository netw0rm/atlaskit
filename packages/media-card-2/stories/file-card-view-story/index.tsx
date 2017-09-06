import * as React from 'react';
import {action} from '@kadira/storybook';
import {FileCardView, Action} from '../../src/FileCardView';

export function uploading() {
  const actions: Action[] = [
    {
      type: 'delete',
      label: 'Delete',
      handler: action('Delete')
    }
  ];
  return (
    <FileCardView status="uploading" actions={actions}/>
  );
}

export function loading() {
  return (
    <FileCardView status="loading"/>
  );
}

export function loaded() {
  return (
    <FileCardView status="loaded" type="image" name="foobar.jpg" size={456000}/>
  );
}

export function error() {
  return (
    <FileCardView status="errored"/>
  );
}
