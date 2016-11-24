import AtlassianIcon from '../glyph/atlassian';
import { Component } from 'react';
import { name } from '../package.json';

describe(name, () => {
 it('produces TypeScript definitions for icons', () => {
   // Test that TypeScript is aware the constructor creates instances of Component.
   const icon: Component<any, any> = new AtlassianIcon({ label: 'atlassian' });

   // Test JSX
   <AtlassianIcon label='atlassian' />;
 });
});
