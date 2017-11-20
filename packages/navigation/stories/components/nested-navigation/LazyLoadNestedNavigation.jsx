import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Spinner from '@atlaskit/spinner';

import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import TrayIcon from '@atlaskit/icon/glyph/tray';
import InlineDialog from '@atlaskit/inline-dialog';
import Tooltip from '@atlaskit/tooltip';

import {
  AkContainerTitle,
  AkNavigationItem,
  AkContainerNavigationNested,
} from '../../../src/index';
import nucleusLogo from '../../nucleus.png';
import BasicNavigation from '../BasicNavigation';
import HtmlPage from '../HtmlPage';

class LazyLoadNavigationItem extends PureComponent {
  state = {
    isLoading: false,
  }

  onClick(callback) {
    this.setState({ isLoading: true });
    callback(this.onLoadComplete);
  }

  onLoadComplete = () => {
    this.setState({ isLoading: false });
  }

  render() {
    const { onClick, ...props } = this.props;
    return (
      <AkNavigationItem
        onClick={() => this.onClick(onClick)}
        textAfter={this.state.isLoading ? <Spinner /> : null}
        {...props}
      />
    );
  }
}

/* eslint-disable react/no-multi-comp */
export default class LazyLoadNestedNavigation extends PureComponent {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
  }

  state = {
    stack: [[]],
  }

  componentWillMount() {
    this.setState({ stack: [this.initialMenu()] });
  }

  getContainerHeaderComponent = () => {
    const backButton = this.state.stack.length > 1 ? (
      <AkNavigationItem
        icon={<ArrowLeftIcon label="Back" />}
        onClick={() => this.stackPop()}
        text="Back" key="2"
      />
    ) : null;

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return [
      <InlineDialog
        content={<div style={{ maxWidth: '200px' }}>Menu or something like the HipChat status form would go here</div>}
        isOpen={this.state.isHeaderInlineDialogOpen}
        position="bottom left"
      >
        <div
          onClick={() => {
            this.setState({ isHeaderInlineDialogOpen: !this.state.isHeaderInlineDialogOpen });
          }}
        >
          <Tooltip key="1" position="right" content="Header tooltip text">
            <AkContainerTitle
              href="#foo"
              icon={
                <img alt="nucleus" src={nucleusLogo} />
              }
              text="AtlasKit"
              subText="Is the king"
            />
          </Tooltip>
        </div>
      </InlineDialog>,
      backButton,
    ];
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  };

  initialMenu = () => [
    <LazyLoadNavigationItem
      icon={<DashboardIcon label="Dashboard" />}
      key={1}
      onClick={(loadComplete) => {
        window.setTimeout(() => {
          this.stackPush([
            <AkNavigationItem icon={<SettingsIcon label="Settings" />} key={1} text="The xx – coexist" />,
            <AkNavigationItem icon={<SettingsIcon label="Settings" />} key={2} text="Alt J – an awesome wave" />,
            <AkNavigationItem icon={<SettingsIcon label="Settings" />} key={3} text="The Beatles – Sgt. Peppers Lonely Hearts Club Band" />,
            <AkNavigationItem icon={<SettingsIcon label="Settings" />} key={4} text="Tame Impala – Lonerism" />,
          ]);
          loadComplete();
        }, 2000);
      }}
      text="I lazy load my children"
    />,
    <AkNavigationItem
      icon={<SettingsIcon label="Settings" />}
      key={2}
      onClick={() => this.stackPush([
        <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} key={1} text="The Matrix" />,
        <AkNavigationItem icon={<DashboardIcon label="Dashboard" />} key={2} text="Lord of the Rings" />,
      ])}
      text="I load my children up front"
    />,
    <AkNavigationItem
      icon={<TrayIcon label="Projects" />}
      key={3}
      text="I'm just a link"
    />,
  ]

  stackPush = (newPage) => {
    const stack = [...this.state.stack, newPage];
    this.setState({ stack });
  }

  stackPop = () => {
    if (this.state.stack.length <= 1) {
      return false;
    }

    const stack = this.state.stack.slice(0, this.state.stack.length - 1);
    return this.setState({ stack });
  }

  render() {
    return (
      <HtmlPage>
        <BasicNavigation
          containerHeaderComponent={() => this.getContainerHeaderComponent()}
        >
          <AkContainerNavigationNested stack={this.state.stack} />
        </BasicNavigation>
      </HtmlPage>
    );
  }
}
