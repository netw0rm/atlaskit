// @flow
import React from 'react';
import { describe, it } from 'mocha';
import styled, { ThemeProvider } from 'styled-components';
import sinon from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';
import * as presets from '../../src/theme/presets';
import { populateTheme, prefix, WithTheme } from '../../src/theme/util';

describe('theme', () => {
  describe('populate theme', () => {
    it('should create a prefixed entry for "provided" and "isCollapsed"', () => {
      const result = populateTheme(presets.settings, true);
      expect(result).to.deep.equal({
        [prefix('provided')]: presets.settings,
        [prefix('isCollapsed')]: true,
      });
    });
  });

  describe('WithTheme', () => {
    it('should provide theme values to styled components', () => {
      const stub = sinon.stub().returns('my-cool-rule');
      const Item = styled.div`
        fake: ${stub}
      `;

      mount(
        <WithTheme
          provided={presets.container}
        >
          <Item />
        </WithTheme>
      );

      expect(stub.calledWithExactly({
        theme: populateTheme(presets.container),
      })).to.equal(true);
    });
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
        <WithTheme
          provided={presets.container}
        >
          <Item />
        </WithTheme>
      </ThemeProvider>
    );

    const arg = stub.args[0][0];

    expect(arg).to.deep.equal({
      theme: {
        ...populateTheme(presets.container),
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
          [prefix('provided')]: 'hello there',
        }}
      >
        <WithTheme
          provided={presets.container}
        >
          <Item />
        </WithTheme>
      </ThemeProvider>
    );

    expect(stub.calledWithExactly({
      theme: populateTheme(presets.container),
    })).to.equal(true);
  });
});
