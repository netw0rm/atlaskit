import { name } from '../../../../package.json';
import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import DocumentIcon from '@atlaskit/icon/glyph/document';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import ToolbarButton from '../../../../src/ui/ToolbarButton';
import { AddonConfiguration, AddonToolbar, Addon } from '../../../../src/editor/ui/Addon';

describe(name, () => {
  // tslint:disable-next-line:variable-name
  const AddonComponentExample = () => <span>pig</span>;

  const addonConfigs: AddonConfiguration[] = [
    {
      text: 'Item one',
      icon: <DocumentIcon label="Item 1" />,
      renderOnClick: closePopup => <AddonComponentExample />
    },
    {
      text: 'Item two',
      icon: <AtlassianIcon label="Item 2" />,
      action: editorActions => editorActions.clear()
    }
  ];

  const addons = addonConfigs.map(({ text, icon, action, renderOnClick }, i) => (
    <Addon key={i} icon={icon} action={action} renderOnClick={renderOnClick}>
      {text}
    </Addon>
  ));

  describe('AddonToolbar', () => {
    it('should render ToolbarButton', () => {
      const toolbar = mount(<AddonToolbar dropdownItems={addons} />);
      expect(toolbar.find(ToolbarButton).length).to.equal(1);
    });

    it('should not render ToolbarButton if dropdownItems prop is missing', () => {
      const toolbar = mount(<AddonToolbar />);
      expect(toolbar.find(ToolbarButton).length).to.equal(0);
    });
  });
});
