import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Lorem from 'react-lorem-component';
import Button, { ButtonGroup } from '@atlaskit/button';
import { AtlasKitThemeProvider, colors, themed } from '@atlaskit/theme';

// FIXME: resolve package when available on npm
// import { ProgressIndicator } from '@atlaskit/progress-indicator';
import { ProgressDots } from '../../src';

const values = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
const themes = ['light', 'dark'];
const appearances = ['default', 'help', 'inverted', 'primary'];

const Bar = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
const Footer = styled(Bar)`
  background-color: ${p => (p.appearance === 'inverted'
    ? themed({ light: colors.DN30, dark: colors.N0 })
    : null
  )};
  margin: 1em -1em;
  padding: 1em;
`;
const Header = styled(Bar)`margin-bottom: 2em;`;
const Page = styled.div`
  margin: 0 auto;
  padding: 2em 0;
  width: 640px;
`;
const Input = styled.input`
  margin-right: 0.5em;
`;
const Label = styled.label`
  display: block;
  margin-bottom: 2em;
`;

export default class ProgressIndicatorDots extends PureComponent {
  state = {
    interactiveIndicators: true,
    selectedIndex: 0,
    selectedAppearance: appearances[0],
    themeIndex: 0,
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
  toggleTheme = () => this.setState((state) => ({ themeIndex: state.themeIndex + 1 }));
  toggleAppearance = (selectedAppearance) => this.setState({ selectedAppearance });
  toggleInteractivity = (event) => this.setState({ interactiveIndicators: event.target.checked });

  render() {
    const { interactiveIndicators, selectedAppearance, selectedIndex, themeIndex } = this.state;
    const selectedTheme = themes[themeIndex % 2];
    const buttonAppearance = selectedAppearance === 'inverted' ? 'primary' : selectedAppearance;

    return (
      <AtlasKitThemeProvider mode={selectedTheme}>
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
            <Button onClick={this.toggleTheme}>
              Theme: {selectedTheme}
            </Button>
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
          <Lorem count={3} />
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
      </AtlasKitThemeProvider>
    );
  }
}
