// @flow

import React, { Component, Element } from 'react';
import type { PropType } from 'babel-plugin-react-flow-props-to-prop-types'; // eslint-disable-line import/no-extraneous-dependencies

import {
  Outer,
  TitleWrapper,
  Title,
  ActionsWrapper,
  BottomBarWrapper,
  BreadcrumbsContainer,
} from '../styled/PageHeader';

type Props = {
  /** Page breadcrumbs to be rendered above the title. */
  breadcrumbs?: PropType<Element<any>, any>,
  /** Contents of the action bar to be rendere\d next to the page title. */
  actions?: PropType<Element<any>, any>,
  /** Contents of the header bar to be rendered below the page title. */
  bottomBar?: PropType<Element<any>, any>,
  /** Content of the page title. The text would be trimmed if it doesn't fit the
    header width and end with an ellipsis */
  children?: PropType<Array<Element<any>> | Element<any>, any>,
};

export default class PageHeader extends Component {
  props: Props;
  render() {
    const { breadcrumbs, actions, bottomBar, children } = this.props;

    return (
      <Outer>
        {breadcrumbs && <BreadcrumbsContainer> {breadcrumbs} </BreadcrumbsContainer>}
        <TitleWrapper>
          <Title>{children}</Title>
          <ActionsWrapper>{actions}</ActionsWrapper>
        </TitleWrapper>
        {bottomBar && <BottomBarWrapper> {bottomBar} </BottomBarWrapper>}
      </Outer>
    );
  }
}
