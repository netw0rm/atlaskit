import React from 'react';
import Navigation, {
  AkNavigationItemGroup,
  AkNavigationItem,
  AkContainerTitle,
  AkSearchDrawer,
  AkSearch,
  AkCreateDrawer,
  createGlobalTheme,
} from '@atlaskit/navigation';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import ArrowLeft from '@atlaskit/icon/glyph/arrow-left';
import SearchIcon from '@atlaskit/icon/glyph/search';
import AddIcon from '@atlaskit/icon/glyph/add';
import { colors } from '@atlaskit/theme';
import SingleSelect from '@atlaskit/single-select';

const items = Object.keys(colors)
  .filter(key => typeof colors[key] === 'string');

const selectItems = [
  {
    items: items.map(color => ({ content: color, value: colors[color] })),
  },
];

const CustomLinkComponent = ({ children }) => (
  <span>{children}</span>
);

class ExampleNavNav extends React.PureComponent {
  state = {
    searchDrawerOpen: false,
    isOpen: true,
    value: '',
    width: 304,
    secondaryColor: colors.N20,
    primaryColor: colors.B400,
  }
  onResize = ({ isOpen, width }) => {
    this.setState({ isOpen, width });
  }
  render() {
    const {
      createDrawerOpen,
      isOpen,
      primaryColor,
      searchDrawerOpen,
      secondaryColor,
      value,
      width,
    } = this.state;
    const containerTheme = createGlobalTheme(primaryColor, secondaryColor);
    const globalTheme = createGlobalTheme(secondaryColor, primaryColor);
    console.log(containerTheme);
    return (
      <Navigation
        // Styling
        containerTheme={containerTheme}
        globalTheme={globalTheme}
        // AkNavigationItems added will not gain this link component
        linkComponent={CustomLinkComponent}
        // All information relative to size and changing size/open state
        onResize={this.onResize}
        isOpen={isOpen}
        isResizeable
        width={width}
        // Props relevant to the global nav
        globalPrimaryIcon={<AtlassianIcon size="xlarge" label="Atlassian" />}
        globalPrimaryItemHref="/components/navigation"
        globalSearchIcon={<SearchIcon label="search" />}
        onSearchDrawerOpen={() => this.setState({ searchDrawerOpen: true })}
        globalCreateIcon={<AddIcon label="Create icon" secondaryColor="inherit" />}
        onCreateDrawerOpen={() => this.setState({ createDrawerOpen: true })}
        drawerBackIcon={<ArrowLeft label="Back icon" size="medium" />}
        drawers={[(
          <AkSearchDrawer
            backIcon={<ArrowLeft label="Back" />}
            primaryIcon={<SearchIcon label="Search" />}
            header="Some Header"
            isOpen={searchDrawerOpen}
            onBackButton={() => this.setState({ searchDrawerOpen: false })}
          >
            <AkSearch
              onSearchClear={() => this.setState({ value: '' })}
              onInput={e => this.setState({ value: e.target.value })}
              value={value}
            >
              {items.filter(item => item.includes(value)).map(item => (
                <AkNavigationItem text={item} />
              ))}
            </AkSearch>
          </AkSearchDrawer>
        ), (
          <AkCreateDrawer
            backIcon={<ArrowLeft label="Back" />}
            primaryIcon={<AddIcon label="Search" />}
            header="Some Header"
            isOpen={createDrawerOpen}
            onBackButton={() => this.setState({ createDrawerOpen: false })}
          />
        )]}
        // Props relevant to the container
        containerHeaderComponent={() => (
          <AkContainerTitle icon={<AtlassianIcon label="Atlassian" />} text="Example Navbar" />
        )}
      >
        <AkNavigationItemGroup>
          <AkNavigationItem text="Nav Item" subText="Some things have subtext" href="/components/navigation" />
          <AkNavigationItem text="Selected Item" isSelected href="/components/navigation" />
          <AkNavigationItem
            icon={<AtlassianIcon
              size="small"
              label="Atlassian"
            />}
            text="With an Icon"
            href="/components/navigation"
          />
          <SingleSelect
            items={selectItems}
            shouldFitContainer
            hasAutocomplete
            defaultSelected={{ content: 'B400', value: colors.B400 }}
            onSelected={({ item }) => this.setState({ primaryColor: item.value })}
            label="primary color"
          />
          <SingleSelect
            items={selectItems}
            defaultSelected={{ content: 'N20', value: colors.N20 }}
            shouldFitContainer
            hasAutocomplete
            onSelected={({ item }) => this.setState({ secondaryColor: item.value })}
            label="secondary color"
          />
        </AkNavigationItemGroup>
      </Navigation>
    );
  }
}

export default ExampleNavNav;
