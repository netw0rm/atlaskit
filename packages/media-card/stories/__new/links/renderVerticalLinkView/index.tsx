import * as React from 'react';
import {genericLinkDetails} from '@atlaskit/media-test-helpers';
import {VerticalLinkView} from '../../../../src/__new';
import {Story} from '../../utils/styled';

const {
  url: href,
  site,
  title,
  description,
  resources: {
    icon: {url: icon = ''} = {},
    image: {url: image = ''} = {},
    thumbnail: {url: thumbnail = ''} = {}
  } = {}
} = genericLinkDetails;

export default function() {
  return (
    <Story>

      <h1>VerticalLinkView</h1>

      <h2>Loading</h2>
      <VerticalLinkView status="loading"/>

      <h2>Loaded</h2>
      <VerticalLinkView status="loaded"/>
      <br/>
      <VerticalLinkView status="loaded" site={site}/>
      <br/>
      <VerticalLinkView status="loaded" title={title}/>
      <br/>
      <VerticalLinkView status="loaded" description={description}/>
      <br/>
      <VerticalLinkView status="loaded" icon={icon}/>
      <br/>
      <VerticalLinkView status="loaded" image={image}/>
      <br/>
      <VerticalLinkView
        status="loaded"
        href={href}
        site={site}
        title={title}
        description={description}
        icon={icon}
        image={image || thumbnail}
      />

      <h2>Errored</h2>
      <VerticalLinkView status="errored"/>

    </Story>
  );
}
