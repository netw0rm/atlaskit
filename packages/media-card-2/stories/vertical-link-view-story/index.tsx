import * as React from 'react';
import {VerticalLinkView} from '../../src/links/VerticalLinkView';

export function uploading() {
  return (
    <VerticalLinkView status="uploading"/>
  );
}

export function loading() {
  return (
    <VerticalLinkView status="loading"/>
  );
}

export function loaded() {
  return (
    <div>

      <h4>all the things</h4>
      <VerticalLinkView
        status="loaded"
        href="https://www.atlassian.com"
        icon="https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/favicon.png"
        image="https://wac-cdn.atlassian.com/dam/jcr:89e146b4-642e-41fc-8e65-7848337d7bdd/atlassian_charlie_square.png"
        site="Atlassian"
        title="Atlassian | Software Development and Collaboration Tools"
        description="Millions of users globally rely on Atlassian products every day for improving software development, project management, collaboration, and code quality."
      />

      <h4>href</h4>
      <VerticalLinkView
        status="loaded"
        href="https://www.atlassian.com"
      />

      <h4>icon</h4>
      <VerticalLinkView
        status="loaded"
        icon="https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/favicon.png"
      />

      <h4>image</h4>
      <VerticalLinkView
        status="loaded"
        image="https://wac-cdn.atlassian.com/dam/jcr:89e146b4-642e-41fc-8e65-7848337d7bdd/atlassian_charlie_square.png"
      />

      <h4>site</h4>
      <VerticalLinkView
        status="loaded"
        site="Atlassian"
      />

      <h4>title</h4>
      <VerticalLinkView
        status="loaded"
        title="Atlassian | Software Development and Collaboration Tools"
      />

      <h4>description</h4>
      <VerticalLinkView
        status="loaded"
        description="Millions of users globally rely on Atlassian products every day for improving software development, project management, collaboration, and code quality."
      />
    </div>
  );
}

export function error() {
  return (
    <VerticalLinkView status="errored"/>
  );
}
