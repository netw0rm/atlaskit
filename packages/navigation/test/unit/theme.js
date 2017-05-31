// @flow
import React from 'react';
import { describe, it } from 'mocha';
import styled, { ThemeProvider } from 'styled-components';
import sinon from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';
import * as presets from '../../src/theme/presets';
import { prefix, WithGroupTheme, WithRootTheme } from '../../src/theme/util';
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
});
