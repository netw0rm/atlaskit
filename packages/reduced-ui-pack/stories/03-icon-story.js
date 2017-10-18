import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code } from '@atlaskit/util-readme';
import icons from '!raw!../dist/icons-sprite.svg';
import '../src/index.less';
import iconIds from '../src/internal/iconIds';
import { name } from '../package.json';
import FilledIconExample from './components/FilledIconExample';

// eslint-disable-next-line react/no-danger
const Spritemap = () => <div dangerouslySetInnerHTML={{ __html: icons }} />;

const iconSetupExample = `import icons from '!raw!${name}/dist/icons-sprite.svg'
...
<body>
  <!-- insert icons-sprite.svg here -->
  <svg focusable="false" class="ak-icon" aria-label="Activity"><use xlink:href="#ak-icon-activity" /></svg>
</body>
`;
const iconsDesc = (<div>
  <p>
    The <code>icons-sprite.svg</code> file is an SVG sprite sheet, and can be included on your
    page to allow SVG elements to reference it.
  </p>
  <p>Include the sprite sheet on your page and then use one of the SVG snippets below</p>
  <p>
    <strong>Note:</strong> if you use the icon without surrounding text, ensure you add an
    aria-label attribute to it for accessibility.
  </p>
  <p>
    <strong>Note:</strong> that the <code>focusable</code> attribute is required
    for IE11 support.
  </p>
</div>);
const iconSizeExample = `
<p>
  <svg focusable="false" className="ak-icon ak-icon__size-small" aria-label="Add">
    <use xlinkHref="#ak-icon-add" />
  </svg>
  <svg focusable="false" className="ak-icon ak-icon__size-medium" aria-label="Add">
    <use xlinkHref="#ak-icon-add" />
  </svg>
  <svg focusable="false" className="ak-icon ak-icon__size-large" aria-label="Add">
    <use xlinkHref="#ak-icon-add" />
  </svg>
  <svg focusable="false" className="ak-icon ak-icon__size-xlarge" aria-label="Add">
    <use xlinkHref="#ak-icon-add" />
  </svg>
</p>`;
const iconsColorDesc = (
  <p>
    Icons colours can be configured using CSS, with the <code>color</code> prop controlling the
    primary colour, and the <code>fill</code> prop controlling the secondary colour.
  </p>);
const iconsSizeDesc = (
  <p>
    Icons can be given different sizes: small, medium (default), large, and xlarge.
  </p>);
const iconsAllyDesc = (<p>Use this story to verify icons work with screen readers.</p>);

storiesOf(name, module)
  .add('Icons', () => (
    <Readme component={'reduced-ui-pack'} description={iconsDesc.toString}>
      <Code code={iconSetupExample}>
        <Spritemap />
        <style>
          {`
            .icon-example {
              display: flex;
              align-items: center;
              font-family: monospace;
            }
            .icon-example > svg {
              margin-right: 16px;
            }
          `}
        </style>
        {
          iconIds.map(iconId => (
            <p className="icon-example">
              <svg focusable="false" className="ak-icon"><use xlinkHref={`#${iconId}`} /></svg>
              {`<svg focusable="false"><use xlink:href="#${iconId}" /></svg>`}
            </p>
          ))
        }
      </Code>
    </Readme>
  ))
  .add('Icons — sizes', () => (
    <Readme component={'reduced-ui-pack'} description={iconsSizeDesc}>
      <Code code={iconSizeExample} language="html">
        <Spritemap />
        <p>
          <svg focusable="false" className="ak-icon ak-icon__size-small" aria-label="Add">
            <use xlinkHref="#ak-icon-add" />
          </svg>
          <svg focusable="false" className="ak-icon ak-icon__size-medium" aria-label="Add">
            <use xlinkHref="#ak-icon-add" />
          </svg>
          <svg focusable="false" className="ak-icon ak-icon__size-large" aria-label="Add">
            <use xlinkHref="#ak-icon-add" />
          </svg>
          <svg focusable="false" className="ak-icon ak-icon__size-xlarge" aria-label="Add">
            <use xlinkHref="#ak-icon-add" />
          </svg>
        </p>
      </Code>
    </Readme>
  ))
  .add('Icons — customising colours', () => (
    <Readme component={'reduced-ui-pack'} description={iconsColorDesc}>
      <Code
        code={`
          <svg focusable="false" class="ak-icon ak-icon__size-xlarge" style="color: #000000;fill: #ff0000" aria-label="Text colour">
            <use xlinkHref="#ak-icon-editor/text-color" />
          </svg>`}
        language="html"
      >
        <Spritemap />
        <FilledIconExample />
      </Code>
    </Readme>
  ))
  .add('Icons — accessibility check', () => (
    <Readme component={'reduced-ui-pack'} description={iconsAllyDesc}>
      <Spritemap />
      <div className="ak-field-group">
        <label htmlFor="dummy">Dummy input</label>
        <input
          type="text"
          className="ak-field-text ak-field__size-medium"
          id="dummy"
          placeholder="Focus on this field then tab to the button"
          autoFocus
        />
      </div>
      <p>
        <button type="button" className="ak-button ak-button__appearance-default">
          <svg focusable="false" className="ak-icon" aria-label="Add">
            <use xlinkHref="#ak-icon-add" />
          </svg>
        </button>
      </p>
    </Readme>
  ));
