import React from 'react';

import AkAvatar from '@atlaskit/avatar';
import { action, storiesOf } from '@kadira/storybook';
import { AtlassianIcon, StarIcon } from '@atlaskit/icon';

import { Result } from '../src';
import { name } from '../package.json';

const containerStyles = {
  width: '300px',
  background: 'white',
  margin: '10px',
};

const avatarUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAgACADASIAAhEBAxEB/8QAGgAAAgIDAAAAAAAAAAAAAAAABAcFBgABA//EACkQAAEDAgUCBgMAAAAAAAAAAAECAwQFEQAGEiExE0EHFDJCcbFhgdH/xAAYAQADAQEAAAAAAAAAAAAAAAACAwUABP/EABwRAQEAAwEAAwAAAAAAAAAAAAECAAMREgQxQf/aAAwDAQACEQMRAD8AZ2eqw5QqIxJYKUXdSFq03smxJ+sdKLmunVGIlSrofAGpGgnte/wcRviW485ToMCPEXKVIXdSEjbSBY3J2HPfnC8qdSqmW46YkegsRkIQPLl6WpSXzsNGoIsFb8Eji/pBUIK7KtNf3lENZA3jMmT25dWacZaLkRsHqi25PxjQm0l1WlMnoW4S6iwGFflWrZ7rNPeqrdNh01hSun5UpKHlJHuBcOkDtuPyAbWNtydlvMkmFLnZ0qseUXnNEVuM0hIbQPcopG5N+Lm1ud8c1/Du1qqO4TtkAB5k5mCeRVm0BYHTAH9+8F+ZIaGrQ4jnAVWpSZ0hbra7LCucYhDrDfTASVAek8YKGilf3NRLJzK1n2prk0WpUxMKaS+3pSWEervsocfu2C/Byh1CHkJyHIaWhbr5dQharKANhcntsMHtuqbf0raN79iLYtdLcW0wXCbA7Ww+d758cxdazvrP/9k=';

storiesOf(`${name}/Result`, module)
  .add('basic result', () => (
    <div style={containerStyles}>
      <Result
        icon={<StarIcon label="icon" />}
        text="This is a search result"
      />
    </div>
  ))
  .add('result w/ no data', () => (
    <div style={containerStyles}>
      <Result />
    </div>
  ))
  .add('result w/ only text', () => (
    <div style={containerStyles}>
      <Result
        text="This is a search result"
      />
    </div>
  ))
  .add('result w/ href', () => (
    <div style={containerStyles}>
      <Result
        href="https://www.atlassian.com"
        icon={<AtlassianIcon label="icon" />}
        text="Atlassian.com"
      />
    </div>
  ))
  .add('result w/ onClick handler', () => (
    <div style={containerStyles}>
      <Result
        icon={<StarIcon label="icon" />}
        text="Click me!"
        onClick={action('result-click')}
      />
    </div>
  ))
  .add('result w/ avatar', () => (
    <div style={containerStyles}>
      <Result
        icon={<AkAvatar src={avatarUrl} size="small" />}
        text="Such search result"
      />
    </div>
  ))
  .add('result w/ avatar + sub text', () => (
    <div style={containerStyles}>
      <Result
        text="Shibe Inu"
        subText="Available"
        icon={<AkAvatar src={avatarUrl} size="small" />}
      />
    </div>
  ));
