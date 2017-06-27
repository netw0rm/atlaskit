// @flow
import React from 'react';
import { describe, it } from 'mocha';
import styled, { ThemeProvider } from 'styled-components';
import sinon from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';
import chromatism from 'chromatism';
import * as presets from '../../src/theme/presets';
import { prefix, getProvided, WithGroupTheme, WithRootTheme, whenCollapsed } from '../../src/theme/util';
import { createGlobalTheme } from '../../src/theme/create-provided-theme';
import { getRootTheme, getGroupTheme } from '../theme-util';

describe('theme', () => {
  describe('WithRootTheme', () => {
    it('should provide theme values to styled components', () => {
      const stub = sinon.stub().returns('my-cool-rule');
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

      expect(stub.calledWith({
        theme: getRootTheme(presets.container),
      })).to.equal(true);
    });

    it('should publish updates to children', () => {
      const stub = sinon.stub().returns('my-cool-rule');
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

      expect(stub.getCall(0).calledWith({
        theme: getRootTheme(presets.container),
      })).to.equal(true);
      expect(stub.getCall(1).calledWith({
        theme: getRootTheme(presets.settings),
      })).to.equal(true);
    });

    it('should preserve parent styled-component theme values', () => {
      const stub = sinon.stub().returns('my-cool-rule');
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

      const arg = stub.args[0][0];

      expect(arg).to.deep.equal({
        theme: {
          ...getRootTheme(presets.container),
          myCustomRule: 'hello',
        },
      });
    });

    it('should override clashing theme values', () => {
      const stub = sinon.stub().returns('my-cool-rule');
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

      expect(stub.calledWithExactly({
        theme: getRootTheme(presets.container),
      })).to.equal(true);
    });
  });

  // These tests are the same as those found in WithRootTheme.
  // This could be simplified into a common helper. However,
  // keeping them separate is very explicit for now.
  // If WithRootTheme and WithGroup theme become more generic then these
  // tests could be collapsed into a single test suite.
  describe('WithGroupTheme', () => {
    it('should provide theme values to styled components', () => {
      const stub = sinon.stub().returns('my-cool-rule');
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

      expect(stub.calledWith({
        theme: getGroupTheme(isCompact),
      })).to.equal(true);
    });

    it('should publish updates to children', () => {
      const stub = sinon.stub().returns('my-cool-rule');
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

      expect(stub.getCall(0).calledWith({
        theme: getGroupTheme(true),
      })).to.equal(true);
      expect(stub.getCall(1).calledWith({
        theme: getGroupTheme(false),
      })).to.equal(true);
    });

    it('should preserve parent styled-component theme values', () => {
      const stub = sinon.stub().returns('my-cool-rule');
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

      const arg = stub.args[0][0];

      expect(arg).to.deep.equal({
        theme: {
          ...getGroupTheme(isCompact),
          myCustomRule: 'hello',
        },
      });
    });

    it('should override clashing theme values', () => {
      const stub = sinon.stub().returns('my-cool-rule');
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

      expect(stub.calledWithExactly({
        theme: getGroupTheme(isCompact),
      })).to.equal(true);
    });
  });

  describe('WithRootTheme used with nested GroupTheme', () => {
    // This is already indirectly tested in other tests.
    // But given that this is such a common use case I thought it
    // was worth having an explicit test for it.
    it('should the nesting of a group theme within a root theme', () => {
      const stub = sinon.stub().returns('my-cool-rule');
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

      expect(stub.calledWith({
        theme: {
          ...getRootTheme(presets.settings),
          ...getGroupTheme(isCompact),
        },
      })).to.equal(true);
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
        expect(generatedTheme.text).to.equal(textColor);
      });

      it('subText color', () => {
        expect(generatedTheme.subText).to.equal(chromatism.brightness(20, textColor).hex);
      });

      it('global item focus outline color', () => {
        expect(generatedTheme.item.focus.outline).to.equal(textColor);
      });
    });

    describe('should map the background color to the output', () => {
      let generatedTheme;
      const backgroundColor = '#FF0000';

      beforeEach(() => {
        generatedTheme = createGlobalTheme('#000000', backgroundColor);
      });

      it('background primary color', () => {
        expect(generatedTheme.background.primary).to.equal(backgroundColor);
        expect(generatedTheme.background.secondary).to.equal(backgroundColor);
      });

      describe('global item', () => {
        it('hover color (background color 10% less bright)', () => {
          expect(generatedTheme.item.hover.background).to.equal(
            chromatism.brightness(-10, backgroundColor).hex
          );
        });

        it('active color (background color 10% brighter)', () => {
          expect(generatedTheme.item.active.background).to.equal(
            chromatism.brightness(10, backgroundColor).hex
          );
        });

        it('selected color (background color 20% less bright)', () => {
          expect(generatedTheme.item.selected.background).to.equal(
            chromatism.brightness(-20, backgroundColor).hex
          );
        });

        it('default background color should always be transparent', () => {
          expect(generatedTheme.item.default.background).to.equal('transparent');
        });
      });
    });
  });

  describe('whenCollapsed', () => {
    it('should return the provided rules when collapsed', () => {
      const stub = sinon.stub();
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

      expect(stub.called).to.equal(true);
    });

    it('should not return the provided rules when not collapsed', () => {
      const stub = sinon.stub();
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

      expect(stub.called).to.equal(false);
    });

    it('should allow access to props within the rules', () => {
      const stub = sinon.stub();
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

      expect(stub.calledWith('Alex')).to.equal(true);
    });

    it('should allow access to the theme within the rules', () => {
      const stub = sinon.stub();
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

      expect(stub.calledWith(presets.settings)).to.equal(true);
    });
  });

  describe('getProvided() should fall back to container theme', () => {
    it('when no theme provided', () => {
      expect(getProvided()).to.equal(presets.container);
    });

    it('when theme provided that does not contain private root theme key', () => {
      expect(getProvided({})).to.equal(presets.container);
    });
  });
});
