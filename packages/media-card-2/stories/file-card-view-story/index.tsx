import * as React from 'react';
import {FileCardView} from '../../src/FileCardView';

export function uploading() {
  return (
    <FileCardView status="uploading"/>
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
