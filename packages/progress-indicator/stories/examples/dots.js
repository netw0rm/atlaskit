import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Lorem from 'react-lorem-component';
import Button, { ButtonGroup } from '@atlaskit/button';
import { AtlasKitThemeProvider, colors, themed } from '@atlaskit/theme';

// FIXME: resolve package when available on npm
// import { ProgressIndicator } from '@atlaskit/progress-indicator';

import { ProgressDots } from '../../src';

const appearances = ['default', 'primary', 'help', 'inverted'];
const themes = ['light', 'dark'];
const sizes = ['small', 'default', 'large'];
const spacing = ['comfortable', 'cozy', 'compact'];
const values = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];

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
const Heading = styled.div`
  color: ${colors.subtleText};
  font-size: 0.8em;
  font-weight: 500;
  margin-bottom: 0.8em;
  text-transform: uppercase;
`;
const Header = styled(Bar)`margin-bottom: 2em;`;
const Page = styled.div`
  margin: 0 auto;
  padding: 2em 0;
  max-width: 840px;
`;
const Input = styled.input`
  margin-right: 0.5em;
`;
const Label = styled.label`
  display: block;
`;
const Panels = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default class ProgressIndicatorDots extends PureComponent {
  state = {
    isInteractive: true,
    selectedIndex: 0,
    selectedAppearance: appearances[1],
    selectedSize: sizes[1],
    selectedSpacing: spacing[0],
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
  toggleSize = (selectedSize) => this.setState({ selectedSize });
  toggleSpacing = (selectedSpacing) => this.setState({ selectedSpacing });
  toggleInteractivity = (event) => this.setState({ isInteractive: event.target.checked });

  render() {
    const {
      isInteractive, selectedAppearance, selectedIndex, selectedSpacing,
      selectedSize, themeIndex,
    } = this.state;
    const selectedTheme = themes[themeIndex % 2];
    const buttonAppearance = selectedAppearance === 'inverted' ? 'primary' : selectedAppearance;

    return (
      <AtlasKitThemeProvider mode={selectedTheme}>
        <Page>
          <Header>
            <div>
              <Heading>Appearance</Heading>
              <ButtonGroup>
                {appearances.map(app => (
                  <Button
                    isSelected={selectedAppearance === app}
                    key={app}
                    onClick={() => this.toggleAppearance(app)}
                    spacing="compact"
                  >
                    {app}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
            <div>
              <Heading>Spacing</Heading>
              <ButtonGroup>
                {spacing.map(spc => (
                  <Button
                    isSelected={selectedSpacing === spc}
                    key={spc}
                    onClick={() => this.toggleSpacing(spc)}
                    spacing="compact"
                  >
                    {spc}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
            <div>
              <Heading>Size</Heading>
              <ButtonGroup>
                {sizes.map(sz => (
                  <Button
                    isSelected={selectedSize === sz}
                    key={sz}
                    onClick={() => this.toggleSize(sz)}
                    spacing="compact"
                  >
                    {sz}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
          </Header>
          <Header>
            <Label htmlFor="input">
              <Input
                checked={isInteractive}
                id="input"
                onChange={this.toggleInteractivity}
                type="checkbox"
              />
              <strong>Allow interaction with indicators</strong>
            </Label>
            <Button onClick={this.toggleTheme}>
              Theme: {selectedTheme}
            </Button>
          </Header>
          <Panels>
            {values.map((v, i) => {
              const selected = i === selectedIndex;
              const panelId = `panel${i}`;

              return (
                <div
                  aria-hidden={!selected}
                  aria-labelledby={`tab${i}`}
                  key={v}
                  id={panelId}
                  role="tabpanel"
                  style={{ display: selected ? 'inline-block' : 'none' }}
                >
                  <h4 style={{ marginBottom: '0.66em' }}>Panel {i + 1}</h4>
                  <Lorem count={3} />
                </div>
              );
            })}
          </Panels>
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
              onSelect={isInteractive ? this.handleSelect : null}
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
      </AtlasKitThemeProvider>
    );
  }
}
