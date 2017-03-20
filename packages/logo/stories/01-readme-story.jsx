import React from 'react';
import Readme, { Props, Description, Code } from '@atlaskit/util-readme';
import { storiesOf } from '@kadira/storybook';

import Logo from '../src/Logo';

import { name, description } from '../package.json';

const logoPropDescriptions = {
  collapseTo: 'If set, the logo will be collapsed down to show only the product icon or product type',
  logoText: 'The image component containing the product icon and logo text. This is provided by the individual product logos',
  size: 'The size of the icon, uses the same sizing scheme as in @atlaskit/icon',
  typeOffsetRatio: 'Internal prop used for collapsing down to the product type. Do not use.',
};

const logoPropTypes = {
  collapseTo: '"icon" or "type"',
  logoText: 'string',
};

storiesOf(name, module)
  .add('📖 Logo readme', () => (
    <Readme
      component={name}
      description={description}
    >
      <Description>
        The Logo package provides components for Atlassian brand and product logos of various sizes.
        The following logos are provided by the package:
        <Code>{`
          AtlassianLogo
          BitbucketLogo
          ConfluenceLogo
          HipchatLogo
          JiraLogo
        `}</Code>
      The color of these logos can be customised via css:
        <Code>{`
          <span style={{color: 'red'}}>
            <JiraLogo />
          </span>
        `}</Code>
      The underlying Logo component has the following props:
      </Description>
      <Props component={Logo} descriptions={logoPropDescriptions} types={logoPropTypes} />
    </Readme>
  ));
