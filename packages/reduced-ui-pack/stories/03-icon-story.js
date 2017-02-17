import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Code } from '@atlaskit/util-readme';
import '!style-loader!css-loader!less-loader!../src/index.less';
import { icons } from '../src';
import iconIds from '../src/internal/iconIds';
import { name } from '../package.json';

// eslint-disable-next-line react/no-danger
const Spritemap = () => <div dangerouslySetInnerHTML={{ __html: icons }} />;

const iconSetupExample = `import { icons } from '${name}'
...
<body>
  { icons }
  <svg focusable="false"><use xlink:href="#ak-icon-activity" /></svg>
</body>
`;

storiesOf(name, module)
  .add('Icons', () => (
    <div>
      <h1>Icons</h1>
      <p>
        The named <em>icons</em> export is an SVG sprite sheet, and can be included on your page
        to allow SVG elements to reference it.
      </p>
      <p>Include the sprite sheet on your page and then use one of the SVG snippets below</p>
      <p>Note that the <em>focusable</em> attribute is required for IE11 support.</p>
      <Code code={iconSetupExample}>
        <Spritemap />
        <style>
          {`
            .icon-example {
              display: flex;
              align-items: center;
              font-family: monospace;
            }

            .icon {
              width: 24px;
              height: 24px;
              margin: 0 16px;          }
          `}
        </style>
        {
          iconIds.map(iconId => (
            <p className="icon-example">
              <svg focusable="false" className="icon"><use xlinkHref={`#${iconId}`} /></svg>
              {`<svg focusable="false"><use xlink:href="#${iconId}" /></svg>`}
            </p>
          ))
        }
      </Code>
    </div>
  ))
  .add('Icon accessibility check', () => (
    <div>
      <Spritemap />
      <button
        type="button"
        className="ak-button ak-button__appearance-primary"
      >
        <svg
          focusable="false"
          style={{
            height: '1.2em',
            width: '1.2em',
          }}
        >
          <use xlinkHref="#ak-icon-add" />
        </svg>
      </button>
    </div>
  ));
