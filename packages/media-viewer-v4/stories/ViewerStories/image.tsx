import * as React from 'react';
import {Main} from '../../src/components/main';
import {ImageView} from '../../src/components/viewers/image';

const exampleUrl = 'http://www.australia.com/content/australia/en/places/red-centre/nt-uluru/_jcr_content/hero/image.adapt.1920.medium.jpg';

export function success () {
  return(
    <Main>
      <ImageView imageURL={exampleUrl} />
    </Main>
  );
}

export function error () {
  return(
    <Main>
      <ImageView error="Error loading image" />
    </Main>
  );
}

export function loading () {
  return(
    <Main>
      <ImageView />
    </Main>
  );
}

export function highZoomLevel () {
  return(
    <Main>
      <ImageView zoomLevel={200} imageURL={exampleUrl} />
    </Main>
  );
}

export function lowZoomLevel () {
  return(
    <Main>
      <ImageView zoomLevel={20} imageURL={exampleUrl} />
    </Main>
  );
}

