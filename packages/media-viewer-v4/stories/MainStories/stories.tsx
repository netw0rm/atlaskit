import * as React from 'react';
import {Main} from '../../src/components/main';
import {ImageView} from '../../src/components/viewers/image';
// import {VideoViewer} from '../../src/components/VideoViewer';

export function canGoPrev() {
  return (
    <Main canGoPrev={true}/>
  );
}

export function canGoNext() {
  return (
    <Main canGoNext={true}/>
  );
}

export function image() {
  return (
    <Main>
      <ImageView url="http://www.australia.com/content/australia/en/places/red-centre/nt-uluru/_jcr_content/hero/image.adapt.1920.medium.jpg"/>
    </Main>
  );
}
export function video() {
  return (
    <Main>
      {/* <VideoViewer videoURLs={{}} posterURLs={{}}/> */}
    </Main>
  );
}
