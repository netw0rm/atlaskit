import React, { PureComponent, PropTypes } from 'react';
import Lorem from 'react-lorem-component';
import { AkContainerNavigationNested, AkContainerItem } from '../../../src/index';

const pageStyle = {
  height: 300,
};

export default class PagedContainerNavigation extends PureComponent {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
  }

  static defaultProps = {
    children: [
      <div style={pageStyle}>
        <h4>Page 1</h4>
        <Lorem count={1} />
      </div>,
      <div style={pageStyle}>
        <h4>Page 2</h4>
        <Lorem count={1} />
      </div>,
      <div style={pageStyle}>
        <h4>Page 3</h4>
        <Lorem count={1} />
      </div>,
      <div style={pageStyle}>
        <h4>Page 4</h4>
        <Lorem count={1} />
      </div>,
    ],
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  render() {
    return (
      <div>
        <AkContainerNavigationNested
          pages={this.props.children}
          selectedIndex={this.state.selectedIndex}
        />
        <a
          href="#prev"
          onClick={() => this.setState({
            selectedIndex: Math.max(this.state.selectedIndex - 1, 0),
          })}
        >
          <AkContainerItem icon="←" text="Previous" />
        </a>
        <a
          href="#next"
          onClick={() => this.setState({
            selectedIndex: Math.min(this.state.selectedIndex + 1, this.props.children.length - 1),
          })}
        >
          <AkContainerItem icon="→" text="Next" />
        </a>
      </div>
    );
  }
}
