import AtlassianIcon from '../glyph/atlassian';
import { Component } from 'skatejs';
import { name } from '../package.json';

describe(name, () => {
  it('produces TypeScript definitions for icons', () => {
    // Test that TypeScript is aware the constructor creates
    // instances of Component.
    const icon: Component = new AtlassianIcon();
  });
});
