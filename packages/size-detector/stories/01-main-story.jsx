import React from 'react';
import { storiesOf } from '@kadira/storybook';
import SizeDetector from '@atlaskit/size-detector';
import { name } from '../package.json';
import ResultBox from './components/ResultBox';
import StoryPadding from './components/StoryPadding';
import ResizingBox from './components/ResizingBox';

const displayResults = ({ width, height }) => (
  <ResultBox>
    {width} x {height}
  </ResultBox>
);

storiesOf(name, module)
  .addCodeExampleStory('Basic SizeDetector', () => (
    <StoryPadding>
      <p>Resize the story frame to see the results update live.</p>
      <SizeDetector>
        {displayResults}
      </SizeDetector>
    </StoryPadding>
  ))
  .addCodeExampleStory('inside parent with set height', () => (
    <StoryPadding>
      <p>The height should be 100px and no scroll triggered.</p>
      <div style={{ height: 100 }}>
        <SizeDetector>
          {displayResults}
        </SizeDetector>
      </div>
    </StoryPadding>
  ))
  .addCodeExampleStory('inside scroll parent', () => (
    <StoryPadding>
      <p>The inner size should be 200px high, scrolling inside a 100px container</p>
      <div style={{ height: 100, overflow: 'auto' }}>
        <div style={{ height: 200 }}>
          <SizeDetector >
            {displayResults}
          </SizeDetector>
        </div>
      </div>
    </StoryPadding>
  ))
  .addCodeExampleStory('detecting resize caused by other resize of element', () => (
    <StoryPadding>
      <p>
        The box on the left is the only thing causing resize.
        The purple box should update in response.
      </p>
      <div style={{ display: 'flex' }}>
        <ResizingBox>I am resizing</ResizingBox>
        <SizeDetector outerStyles={{ height: 'auto' }}>
          {displayResults}
        </SizeDetector>
      </div>
    </StoryPadding>
  ));
