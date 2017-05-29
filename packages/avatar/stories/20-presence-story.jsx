import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { name } from '../package.json';
import { Presence } from '../src';

const containerStyles = {
  border: '1px solid',
  display: 'flex',
  backgroundColor: '#f4f5f7',
};
const presenceWrapperStyles = {
  height: '30px',
  width: '30px',
};

storiesOf(name, module)
  .addCodeExampleStory('Presence: default', () => (
    <div style={{ padding: '20px' }}>
      <p>
        By default presences will stretch to fill their parents (Try resizing the code window on the
         right).
      </p>
      <p>
        Therefore it is recommended to always have a wrapping div around presences when consuming
        them separately to Avatars.
      </p>
      <div>
        <Presence presence="online" />
      </div>
    </div>
  ))
  .addCodeExampleStory('Presence: custom presences', () => (<div style={{ padding: '20px' }}>
    <p>
      Aside from the default supported presences, you can also create custom presences by passing
      arbitrary HTML to the Presence component. This could be anything from an image, an SVG or
      even simply a styled div.
    </p>
    <p>For best results it is recommended that whatever you pass in is square and has its
      height and width set to 100%</p>
    <div style={containerStyles}>

      <div style={presenceWrapperStyles}>
        <Presence presence="online" />
      </div>

      <div style={presenceWrapperStyles}>
        <Presence presence="busy" />
      </div>

      <div style={presenceWrapperStyles}>
        <Presence>
          <div style={{ height: '100%', width: '100%', backgroundColor: 'rebeccapurple' }} />
        </Presence>
      </div>

    </div>
  </div>
  ))
  .addCodeExampleStory('Presence: borderColors', () => (
    <div style={{ padding: '20px' }}>
      <p>
        By default presences will display a white border (2px). This can be overridden with the
        borderColor prop.
      </p>
      <p>
        The border color prop will accept any string that the CSS border-color (hex values, rgba,
        transparent, etc).
      </p>
      <div style={containerStyles}>
        <div style={presenceWrapperStyles}>
          <Presence presence="online" />
        </div>

        <div style={presenceWrapperStyles}>
          <Presence presence="online" borderColor="red" />
        </div>

        <div style={presenceWrapperStyles}>
          <Presence presence="online" borderColor="rgba(0, 0, 255, 0.2)" />
        </div>

        <div style={presenceWrapperStyles}>
          <Presence presence="online" borderColor="transparent" />
        </div>
      </div>
    </div>
  ));
