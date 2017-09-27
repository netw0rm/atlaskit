import React, { PureComponent } from 'react';
import Lorem from 'react-lorem-component';
import Button, { ButtonGroup } from '@atlaskit/button';
import { Body, Count, Footer, Header, Input, Label, Page } from './styled';

// FIXME: resolve package when available on npm
// import { ProgressIndicator } from '@atlaskit/progress-indicator';
import { ProgressDots } from '../src';

const values = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
const appearances = ['default', 'help', 'inverted', 'primary'];
const sizes = ['small', 'default', 'large'];

export default class ProgressIndicatorDots extends PureComponent {
  state = {
    interactiveIndicators: true,
    selectedIndex: 0,
    selectedAppearance: appearances[0],
    selectedSize: sizes[1],
  }
  handlePrev = () => {
    this.setState((state) => ({ selectedIndex: state.selectedIndex - 1 }));
  }
  handleNext = () => {
    this.setState((state) => ({ selectedIndex: state.selectedIndex + 1 }));
  }
  handleSelect = ({ index: selectedIndex }) => {
    this.setState({ selectedIndex });
  }
  toggleAppearance = (selectedAppearance) => this.setState({ selectedAppearance });
  toggleSize = (selectedSize) => this.setState({ selectedSize });
  toggleInteractivity = (event) => this.setState({ interactiveIndicators: event.target.checked });

  render() {
    const { interactiveIndicators, selectedAppearance, selectedIndex, selectedSize } = this.state;
    const buttonAppearance = selectedAppearance === 'inverted' ? 'primary' : selectedAppearance;

    return (
      <Page>
        <Header>
          <ButtonGroup>
            {appearances.map(a => (
              <Button
                key={a}
                onClick={() => this.toggleAppearance(a)}
                isSelected={selectedAppearance === a}
              >
                {a}
              </Button>
            ))}
          </ButtonGroup>
          <ButtonGroup>
            {sizes.map(s => (
              <Button
                key={s}
                onClick={() => this.toggleSize(s)}
                isSelected={selectedSize === s}
              >
                {s}
              </Button>
            ))}
          </ButtonGroup>
        </Header>
        <Label htmlFor="input">
          <Input
            checked={interactiveIndicators}
            id="input"
            onChange={this.toggleInteractivity}
            type="checkbox"
          />
          <strong>Allow interaction with indicators</strong>
        </Label>
        <Body>
          <Count>{selectedIndex}</Count>
          <Lorem count={1} />
        </Body>
        <Footer appearance={selectedAppearance}>
          <Button
            isDisabled={selectedIndex === 0}
            appearance={buttonAppearance}
            onClick={this.handlePrev}
          >
            Prev
          </Button>
          <ProgressDots
            appearance={selectedAppearance}
            onSelect={interactiveIndicators ? this.handleSelect : null}
            selectedIndex={selectedIndex}
            size={selectedSize}
            values={values}
          />
          <Button
            isDisabled={selectedIndex === (values.length - 1)}
            appearance={buttonAppearance}
            onClick={this.handleNext}
          >
            Next
          </Button>
        </Footer>
      </Page>
    );
  }
}
