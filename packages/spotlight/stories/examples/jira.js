import React, { PureComponent } from 'react';
import { AkNavigationItem } from '@atlaskit/navigation';

import HtmlPage from '../components/HtmlPage';
import BasicNavigation from '../components/BasicNavigation';
import nucleusLogo from '../assets/nucleus.png';

const NucleausIcon = () => (
  <img alt="Nucleus" height="24" src={nucleusLogo} width="24" />
);

export default class JiraExample extends PureComponent {
  render() {
    return (
      <HtmlPage>
        <BasicNavigation hasScrollHintTop hasScrollHintBottom>
          <AkNavigationItem
            text="Test page"
            href="#1"
          />
          <AkNavigationItem
            icon={<NucleausIcon />}
            text="Item with an icon"
            href="#2"
          />
          <AkNavigationItem
            icon={<NucleausIcon />}
            text="Item with two lines"
            subText="Another line of text, which could possibly be long"
            href="#3"
          />
          <AkNavigationItem
            icon={<NucleausIcon />}
            text="A really, really, quite long, actually super long container name"
            href="#4"
          />
          <AkNavigationItem
            icon={<NucleausIcon />}
            text="A really, really, quite long, actually super long container name with action"
            subText="Another line of text, which could possibly be long"
            action={<span>text</span>}
            href="#5"
          />
        </BasicNavigation>
      </HtmlPage>
    );
  }
}
