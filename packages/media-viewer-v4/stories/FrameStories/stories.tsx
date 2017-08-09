import * as React from 'react';
import {Frame} from '../../src/components/Frame';
import {ImageViewer} from '../../src/components/ImageViewer';
// import {VideoViewer} from '../../src/components/VideoViewer';

export function canGoPrev() {
  return (
    <Frame canGoPrev={true}/>
  );
}

export function canGoNext() {
  return (
    <Frame canGoNext={true}/>
  );
}

export function image() {
  return (
    <Frame>
      <ImageViewer imageURL="http://www.australia.com/content/australia/en/places/red-centre/nt-uluru/_jcr_content/hero/image.adapt.1920.medium.jpg"/>
    </Frame>
  );
}
export function video() {
  return (
    <Frame>
      {/* <VideoViewer videoURLs={{}} posterURLs={{}}/> */}
    </Frame>
  );
}
