import React, { PureComponent } from 'react';
import Lorem from 'react-lorem-component';
import Button, { ButtonGroup } from '@atlaskit/button';
import { Body, Count, Footer, Header, Heading, Input, Label, Page } from './styled';

// FIXME: resolve package when available on npm
// import { ProgressIndicator } from '@atlaskit/progress-indicator';
import { ProgressDots } from '../src';

const appearances = ['default', 'help', 'inverted', 'primary'];
const sizes = ['small', 'default', 'large'];
const spacing = ['comfortable', 'cozy', 'compact'];
const values = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];

export default class ProgressIndicatorDots extends PureComponent {
  state = {
    interactiveIndicators: true,
    selectedAppearance: appearances[0],
    selectedIndex: 0,
    selectedSize: sizes[1],
    selectedSpacing: spacing[0],
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
  toggleSpacing = (selectedSpacing) => this.setState({ selectedSpacing });
  toggleSize = (selectedSize) => this.setState({ selectedSize });
  toggleInteractivity = (event) => this.setState({ interactiveIndicators: event.target.checked });

  render() {
    const {
      interactiveIndicators, selectedAppearance, selectedIndex, selectedSize, selectedSpacing,
    } = this.state;
    const buttonAppearance = selectedAppearance === 'inverted' ? 'primary' : selectedAppearance;

    return (
      <Page>
        <Header>
          <div>
            <Heading>Appearance</Heading>
            <ButtonGroup>
              {appearances.map(a => (
                <Button
                  key={a}
                  onClick={() => this.toggleAppearance(a)}
                  isSelected={selectedAppearance === a}
                  spacing="compact"
                >
                  {a}
                </Button>
              ))}
            </ButtonGroup>
          </div>
          <div>
            <Heading>Spacing</Heading>
            <ButtonGroup>
              {spacing.map(a => (
                <Button
                  key={a}
                  onClick={() => this.toggleSpacing(a)}
                  isSelected={selectedSpacing === a}
                  spacing="compact"
                >
                  {a}
                </Button>
              ))}
            </ButtonGroup>
          </div>
          <div>
            <Heading>Size</Heading>
            <ButtonGroup>
              {sizes.map(s => (
                <Button
                  key={s}
                  onClick={() => this.toggleSize(s)}
                  isSelected={selectedSize === s}
                  spacing="compact"
                >
                  {s}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </Header>
        <Label htmlFor="input">
          <Input
            checked={interactiveIndicators}
            id="input"
            onChange={this.toggleInteractivity}
            type="checkbox"
          />
          <span>Allow interaction with indicators</span>
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
            spacing={selectedSpacing}
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
