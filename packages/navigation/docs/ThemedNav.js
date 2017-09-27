import React from 'react';
import Navigation, {
  createGlobalTheme,
  AkNavigationItemGroup,
  AkNavigationItem,
  AkContainerTitle,
} from '@atlaskit/navigation';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import { colors } from '@atlaskit/theme';

const containerTheme = createGlobalTheme(colors.N20, colors.P400);
const globalTheme = createGlobalTheme(colors.P400, colors.N20);

class ExampleNavNav extends React.PureComponent {
  state = {
    searchDrawerOpen: false,
  }
  render() {
    return (
      <Navigation
        containerTheme={containerTheme}
        globalTheme={globalTheme}
        globalPrimaryIcon={<AtlassianIcon size="xlarge" label="Atlassian" />}
        globalPrimaryItemHref="/components/navigation"
        containerHeaderComponent={() => (
          <AkContainerTitle icon={<AtlassianIcon label="Atlassian" />} text="Example Navbar" />
        )}
      >
        <AkNavigationItemGroup>
          <AkNavigationItem text="Nav Item" href="/components/navigation" />
          <AkNavigationItem text="Selected Item" isSelected href="/components/navigation" />
        </AkNavigationItemGroup>
      </Navigation>
    );
  }
}

export default ExampleNavNav;
