import { storiesOf } from '@kadira/storybook';
import { SearchIcon } from '@atlaskit/icon';
import React, { PureComponent } from 'react';
import { name } from '../package.json';
import Reveal from '../src/components/js/Reveal';
import GlobalItem from '../src/components/js/GlobalItem';

const FakeChild = () => (
  <div style={{ backgroundColor: 'lightblue', width: 40 }}>
    <GlobalItem size="medium">
      <SearchIcon label="Search icon" />
    </GlobalItem>
    <GlobalItem size="medium">
      <SearchIcon label="Search icon" />
    </GlobalItem>
  </div>
);

class ChildWithControls extends PureComponent {
  state = {
    isOpen: true,
    shouldAnimate: false,
  }

  toggleIsOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  toggleShouldAnimate = () => {
    this.setState({
      shouldAnimate: !this.state.shouldAnimate,
    });
  }

  render() {
    const { isOpen, shouldAnimate } = this.state;
    return (
      <div>
        <Reveal
          isOpen={isOpen}
          shouldAnimate={shouldAnimate}
          openHeight={100}
        >
          <div style={{ backgroundColor: 'lightblue', width: 40 }}>
            <GlobalItem size="medium">
              <SearchIcon label="Search icon" />
            </GlobalItem>
            <GlobalItem size="medium">
              <SearchIcon label="Search icon" />
            </GlobalItem>
          </div>
        </Reveal>

        <div style={{ display: 'flex' }}>
          <div>
            is open: <strong>{isOpen ? 'true' : 'false'}</strong> <br />
            <button
              type="button"
              onClick={this.toggleIsOpen}
            >
              Toggle open
          </button>
          </div>

          <div>
            should animate: <strong>{shouldAnimate ? 'true' : 'false'}</strong> <br />
            <button
              type="button"
              onClick={this.toggleShouldAnimate}
            >
              Toggle animation
          </button>
          </div>
        </div>
      </div>
    );
  }
}

storiesOf(`${name} - Reveal (interal)`, module)
  .add('mount open with no animation', () => (
    <div>
      <div>some content above</div>
      <Reveal isOpen shouldAnimate={false} openHeight={100}>
        <FakeChild />
      </Reveal>
      <div>some content below</div>
    </div>
  ))
  .add('mount closed with no animation', () => (
    <div>
      <div>some content above</div>
      <Reveal isOpen={false} shouldAnimate={false} openHeight={100}>
        <FakeChild />
      </Reveal>
      <div>some content below</div>
    </div>
  ))
  .add('mount open with animation', () => (
    <div>
      <div>some content above</div>
      <Reveal isOpen shouldAnimate openHeight={100}>
        <FakeChild />
      </Reveal>
      <div>some content below</div>
    </div>
  ))
  .add('with controls', () => (
    <ChildWithControls />
  ))
  ;
