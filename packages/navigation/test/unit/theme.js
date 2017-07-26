// @flow
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { mount } from 'enzyme';
import chromatism from 'chromatism';
import * as presets from '../../src/theme/presets';
import { prefix, getProvided, WithGroupTheme, WithRootTheme, whenCollapsed } from '../../src/theme/util';
import { createGlobalTheme } from '../../src/theme/create-provided-theme';
import { getRootTheme, getGroupTheme } from './_theme-util';

describe('theme', () => {
  describe('WithRootTheme', () => {
    it('should provide theme values to styled components', () => {
      const stub = jest.fn(() => 'my-cool-rule');
      const Item = styled.div`
        fake: ${stub}
      `;

      mount(
        <WithRootTheme
          provided={presets.container}
        >
          <Item />
        </WithRootTheme>
      );

      expect(stub).toHaveBeenCalledWith({
        theme: getRootTheme(presets.container),
      });
    });

    it('should publish updates to children', () => {
      const stub = jest.fn(() => 'my-cool-rule');
      const Item = styled.div`
        fake: ${stub}
    `;

      const wrapper = mount(
        <WithRootTheme
          provided={presets.container}
        >
          <Item />
        </WithRootTheme>
      );
      wrapper.setProps({
        provided: presets.settings,
      });

      expect(stub.mock.calls[0][0]).toEqual({
        theme: getRootTheme(presets.container),
      });
      expect(stub.mock.calls[1][0]).toEqual({
        theme: getRootTheme(presets.settings),
      });
    });

    it('should preserve parent styled-component theme values', () => {
      const stub = jest.fn(() => 'my-cool-rule');
      const Item = styled.div`
        fake: ${stub}
      `;

      mount(
        <ThemeProvider
          theme={{
            myCustomRule: 'hello',
          }}
        >
          <WithRootTheme
            provided={presets.container}
          >
            <Item />
          </WithRootTheme>
        </ThemeProvider>
      );

      const arg = stub.mock.calls[0][0];

      expect(arg).toEqual({
        theme: {
          ...getRootTheme(presets.container),
          myCustomRule: 'hello',
        },
      });
    });

    it('should override clashing theme values', () => {
      const stub = jest.fn(() => 'my-cool-rule');
      const Item = styled.div`
      fake: ${stub}
    `;

      mount(
        <ThemeProvider
          theme={{
            [prefix('root')]: 'hello there',
          }}
        >
          <WithRootTheme
            provided={presets.container}
          >
            <Item />
          </WithRootTheme>
        </ThemeProvider>
      );

      expect(stub).toHaveBeenCalledWith({
        theme: getRootTheme(presets.container),
      });
    });
  });

  // These tests are the same as those found in WithRootTheme.
  // This could be simplified into a common helper. However,
  // keeping them separate is very explicit for now.
  // If WithRootTheme and WithGroup theme become more generic then these
  // tests could be collapsed into a single test suite.
  describe('WithGroupTheme', () => {
    it('should provide theme values to styled components', () => {
      const stub = jest.fn(() => 'my-cool-rule');
      const Item = styled.div`
        fake: ${stub}
      `;
      const isCompact = true;

      mount(
        <WithGroupTheme
          isCompact={isCompact}
        >
          <Item />
        </WithGroupTheme>
      );

      expect(stub).toHaveBeenCalledWith({
        theme: getGroupTheme(isCompact),
      });
    });

    it('should publish updates to children', () => {
      const stub = jest.fn(() => 'my-cool-rule');
      const Item = styled.div`
        fake: ${stub}
    `;

      const wrapper = mount(
        <WithGroupTheme
          isCompact
        >
          <Item />
        </WithGroupTheme>
      );
      wrapper.setProps({
        isCompact: false,
      });

      expect(stub.mock.calls[0][0]).toEqual({
        theme: getGroupTheme(true),
      });
      expect(stub.mock.calls[1][0]).toEqual({
        theme: getGroupTheme(false),
      });
    });

    it('should preserve parent styled-component theme values', () => {
      const stub = jest.fn(() => 'my-cool-rule');
      const Item = styled.div`
        fake: ${stub}
      `;
      const isCompact = true;

      mount(
        <ThemeProvider
          theme={{
            myCustomRule: 'hello',
          }}
        >
          <WithGroupTheme
            isCompact={isCompact}
          >
            <Item />
          </WithGroupTheme>
        </ThemeProvider>
      );

      const arg = stub.mock.calls[0][0];

      expect(arg).toEqual({
        theme: {
          ...getGroupTheme(isCompact),
          myCustomRule: 'hello',
        },
      });
    });

    it('should override clashing theme values', () => {
      const stub = jest.fn(() => 'my-cool-rule');
      const Item = styled.div`
        fake: ${stub}
      `;
      const isCompact = false;

      mount(
        <ThemeProvider
          theme={{
            [prefix('group')]: 'hello there',
          }}
        >
          <WithGroupTheme
            isCompact={isCompact}
          >
            <Item />
          </WithGroupTheme>
        </ThemeProvider>
      );

      expect(stub).toHaveBeenCalledWith({
        theme: getGroupTheme(isCompact),
      });
    });
  });

  describe('WithRootTheme used with nested GroupTheme', () => {
    // This is already indirectly tested in other tests.
    // But given that this is such a common use case I thought it
    // was worth having an explicit test for it.
    it('should the nesting of a group theme within a root theme', () => {
      const stub = jest.fn(() => 'my-cool-rule');
      const Item = styled.div`
        fake: ${stub}
      `;
      const isCompact = false;

      mount(
        <WithRootTheme
          provided={presets.settings}
        >
          <WithGroupTheme
            isCompact={isCompact}
          >
            <Item />
          </WithGroupTheme>
        </WithRootTheme>
      );

      expect(stub).toHaveBeenCalledWith({
        theme: {
          ...getRootTheme(presets.settings),
          ...getGroupTheme(isCompact),
        },
      });
    });
  });

  // Note: the tests for createGlobalTheme do not include a test the checks the exact
  // shape of the output, as this is already tested by Flow. The createGlobalTheme tests
  // check the mapping and calculation of output values.

  describe('createGlobalTheme function', () => {
    describe('should map the text color to the output', () => {
      let generatedTheme;
      const textColor = '#FF0000';

      beforeEach(() => {
        generatedTheme = createGlobalTheme(textColor, '#000000');
      });

      it('text color', () => {
        expect(generatedTheme.text).toBe(textColor);
      });

      it('subText color', () => {
        expect(generatedTheme.subText).toBe(chromatism.brightness(20, textColor).hex);
      });

      it('global item focus outline color', () => {
        expect(generatedTheme.item.focus.outline).toBe(textColor);
      });
    });

    describe('should map the background color to the output', () => {
      let generatedTheme;
      const backgroundColor = '#FF0000';

      beforeEach(() => {
        generatedTheme = createGlobalTheme('#000000', backgroundColor);
      });

      it('background primary color', () => {
        expect(generatedTheme.background.primary).toBe(backgroundColor);
        expect(generatedTheme.background.secondary).toBe(backgroundColor);
      });

      describe('global item', () => {
        it('hover color (background color 10% less bright)', () => {
          expect(generatedTheme.item.hover.background).toBe(
            chromatism.brightness(-10, backgroundColor).hex
          );
        });

        it('active color (background color 10% brighter)', () => {
          expect(generatedTheme.item.active.background).toBe(
            chromatism.brightness(10, backgroundColor).hex
          );
        });

        it('selected color (background color 20% less bright)', () => {
          expect(generatedTheme.item.selected.background).toBe(
            chromatism.brightness(-20, backgroundColor).hex
          );
        });

        it('default background color should always be transparent', () => {
          expect(generatedTheme.item.default.background).toBe('transparent');
        });
      });
    });
  });

  describe('whenCollapsed', () => {
    it('should return the provided rules when collapsed', () => {
      const stub = jest.fn();
      const Item = styled.div`
        ${whenCollapsed`
          my-rule: ${stub}
        `}
      `;

      mount(
        <WithRootTheme
          provided={presets.container}
          isCollapsed
        >
          <Item />
        </WithRootTheme>
      );

      expect(stub).toHaveBeenCalled();
    });

    it('should not return the provided rules when not collapsed', () => {
      const stub = jest.fn();
      const Item = styled.div`
        ${whenCollapsed`
          my-rule: ${stub}
        `}
      `;

      mount(
        <WithRootTheme
          provided={presets.container}
          isCollapsed={false}
        >
          <Item />
        </WithRootTheme>
      );

      expect(stub).not.toHaveBeenCalled();
    });

    it('should allow access to props within the rules', () => {
      const stub = jest.fn();
      const Item = styled.div`
        ${whenCollapsed`
          my-rule: ${props => stub(props.name)}
        `}
      `;

      mount(
        <WithRootTheme
          provided={presets.container}
          isCollapsed
        >
          <Item name="Alex" />
        </WithRootTheme>
      );

      expect(stub).toHaveBeenCalledWith('Alex');
    });

    it('should allow access to the theme within the rules', () => {
      const stub = jest.fn();
      const Item = styled.div`
        ${whenCollapsed`
          my-rule: ${props => stub(getProvided(props.theme))}
        `}
      `;

      mount(
        <WithRootTheme
          provided={presets.settings}
          isCollapsed
        >
          <Item />
        </WithRootTheme>
      );

      expect(stub).toHaveBeenCalledWith(presets.settings);
    });
  });

  describe('getProvided() should fall back to container theme', () => {
    it('when no theme provided', () => {
      expect(getProvided()).toBe(presets.container);
    });

    it('when theme provided that does not contain private root theme key', () => {
      expect(getProvided({})).toBe(presets.container);
    });
  });
});
