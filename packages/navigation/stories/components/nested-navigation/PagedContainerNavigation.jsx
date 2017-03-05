import React, { PureComponent, PropTypes } from 'react';
import Lorem from 'react-lorem-component';
import { ArrowleftIcon, ArrowrightIcon } from '@atlaskit/icon';
import { AkContainerNavigationNested, AkContainerItem } from '../../../src/index';

const pageStyle = {
  height: 300,
};

const disabledLinkStyles = {
  color: 'grey',
  cursor: 'default',
  textDecoration: 'none',
};

const enabledLinkStyles = {
  color: 'inherit',
  cursor: 'default',
  textDecoration: 'none',
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

  isNextEnabled = () => this.state.selectedIndex < (this.props.children.length - 1)

  isPrevEnabled = () => this.state.selectedIndex > 0

  goToNext = () => {
    if (!this.isNextEnabled()) {
      return;
    }
    const selectedIndex = Math.min(this.state.selectedIndex + 1, this.props.children.length - 1);
    this.setState({
      animationDirection: 'left',
      selectedIndex,
    });
  }

  goToPrev = () => {
    if (!this.isPrevEnabled()) {
      return;
    }
    const selectedIndex = Math.max(this.state.selectedIndex - 1, 0);
    this.setState({
      animationDirection: 'right',
      selectedIndex,
    });
  }

  render() {
    return (
      <div>
        <AkContainerNavigationNested animationDirection={this.state.animationDirection}>
          {this.props.children[this.state.selectedIndex]}
        </AkContainerNavigationNested>
        <a
          href="#prev"
          onClick={this.goToPrev}
          style={!this.isPrevEnabled() ? disabledLinkStyles : enabledLinkStyles}
        >
          <AkContainerItem icon={<ArrowleftIcon label="Previous" />} text="Previous" />
        </a>
        <a
          href="#next"
          onClick={this.goToNext}
          style={!this.isNextEnabled() ? disabledLinkStyles : enabledLinkStyles}
        >
          <AkContainerItem icon={<ArrowrightIcon label="Next" />} text="Next" />
        </a>
      </div>
    );
  }
}
