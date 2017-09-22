import * as React from 'react';
import {action} from '@kadira/storybook';
import {FileView, Action} from '../../src/files/FileView';

export function uploading() {
  const actions: Action[] = [
    {
      type: 'delete',
      label: 'Delete',
      handler: action('Delete')
    }
  ];
  return (
    <FileView status="uploading" actions={actions}/>
  );
}

export function loading() {
  return (
    <FileView status="loading"/>
  );
}

export function loaded() {
  return (
    <FileView status="loaded" type="image" name="foobar.jpg" size={456000}/>
  );
}

export function error() {
  return (
    <FileView status="errored"/>
  );
}
