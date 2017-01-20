import React, { PropTypes, PureComponent } from 'react';
import TabsNav from './TabsNav';

export default class ResponsiveTabsNav extends PureComponent {
  static propTypes = {
    onKeyboardNav: PropTypes.func.isRequired,
    tabs: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.node,
      label: PropTypes.string.isRequired,
      onSelect: PropTypes.func.isRequired,
      isSelected: PropTypes.bool,
    })),
  }

  static defaultProps = {
    tabs: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      tabs: props.tabs,
      secondaryTabs: [],
    };
  }

  componentDidUpdate() {
    // Check the DOM to see which tabs should be displayed, update state

  }

  render() {
    return (
      <TabsNav
        onKeyboardNav={this.props.onKeyboardNav}
        tabs={this.state.tabs}
        secondaryTabs={this.state.secondaryTabs}
      />
    );
  }
}
