import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import debounce from 'lodash.debounce';
import { AtlassianIcon } from '@atlaskit/icon';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { createGlobalTheme } from '../../src/theme/create-provided-theme';
import BasicNavigation from './BasicNavigation';
import * as presets from '../../src/theme/presets';

const debounceDuration = 100;
const famousThemes = [
  {
    name: 'Yellow',
    text: '#000000',
    background: '#FFCC00',
  },
  {
    name: 'Red',
    text: '#FFFFFF',
    background: '#fe001a',
  },
  {
    name: 'Pink',
    text: '#FFFFFF',
    background: '#F1396D',
  },
  {
    name: 'Black',
    text: '#FFFFFF',
    background: '#251F19',
  },
  {
    name: 'Purple',
    text: '#FFFFFF',
    background: '#550f9d',
  },
];

const SwatchContainer = styled.div`
  margin: ${akGridSizeUnitless * 2}px auto;
`;

const Item = styled.a`
  border-radius: ${akGridSizeUnitless * 2.5}px;
  width: ${akGridSizeUnitless * 5}px;
  height: ${akGridSizeUnitless * 5}px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.item.default.background};
  color: inherit;

  &:hover {
    background-color: ${props => props.theme.item.hover.background};
    color: inherit;
  }

  &:active {
    background-color: ${props => props.theme.item.active.background};
    color: inherit;
  }

  &:focus {
    outline-color: ${props => props.theme.item.focus.outline};
    color: inherit;
  }
`;

const Swatch = styled.div`
  background-color: ${props => props.theme.background.primary};
  color: ${props => props.theme.text};
  padding: ${akGridSizeUnitless}px;
  text-align: center;
  display: flex;
  justify-content: center;
`;

// eslint-disable-next-line react/prop-types
const ThemeSwatches = ({ theme }) => (
  <SwatchContainer>
    <Swatch theme={theme}>
      <Item href="#" theme={theme}>
        <AtlassianIcon label="Atlassian" size="medium" />
      </Item>
    </Swatch>
    <p>Actual createGlobalTheme(textColor, backgroundColor) output value:</p>
    <pre>{ JSON.stringify(theme, null, 2) }</pre>
  </SwatchContainer>
);

export default class ThemePreview extends PureComponent {
  state = {
    backgroundColor: famousThemes[0].background,
    textColor: famousThemes[0].text,
  }

  handleBackgroundColorChange = (e) => {
    e.persist();
    this.updateBackgroundColor(e);
  }

  updateBackgroundColor = debounce((e) => {
    this.setState({ backgroundColor: e.target.value });
  }, debounceDuration)

  handleTextColorChange = (e) => {
    e.persist();
    this.updateTextColor(e);
  }

  updateTextColor = debounce((e) => {
    this.setState({ textColor: e.target.value });
  }, debounceDuration)

  showBrand = (text, background) => (
    () => {
      this.setState({
        textColor: text,
        backgroundColor: background,
      });
    }
  )

  render() {
    const { textColor, backgroundColor } = this.state;
    const myTheme = createGlobalTheme(textColor, backgroundColor);
    return (
      <div>
        <BasicNavigation
          globalTheme={myTheme}
          containerTheme={presets.container}
        />
        <Container>
          <h3>Theme playground</h3>
          <p>Pick from one of the examples below:</p>
          <p>
            {
              famousThemes.map(({ name, text, background }) => (
                <Button
                  onClick={this.showBrand(text, background)}
                  key={name}
                >
                  {name}
                </Button>
              ))
            }
          </p>
          <p>Or choose your own custom colors:</p>
          <p>
            <ColorPickerParent>
              Background:
              <input
                type="color"
                onChange={this.handleBackgroundColorChange}
              />
            </ColorPickerParent>
            <ColorPickerParent>
              Text:
              <input
                type="color"
                onChange={this.handleTextColorChange}
              />
            </ColorPickerParent>
          </p>
          <pre>
            {`import { createGlobalTheme } from '@atlaskit/navigation';
const myTheme = createGlobalTheme('${textColor}', '${backgroundColor}');
<Navigation globalTheme={myTheme} />
// or
<GlobalNavigation theme={myTheme} />`}
          </pre>
          <ThemeSwatches theme={myTheme} />
        </Container>
      </div>
    );
  }
}

const Container = styled.div`
  margin: 0 auto;
  padding: ${akGridSizeUnitless * 3}px 0;
  width: 50vw;
`;

const ColorPickerParent = styled.span`
  display: inline-block;
  margin-right: ${akGridSizeUnitless}px;

  input {
    margin-left: ${akGridSizeUnitless}px;
  }
`;
