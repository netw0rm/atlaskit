// @flow

import React, { PureComponent, Element } from 'react';
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
  breadcrumbs?: PropType<Element<any>, any>,
  actions?: PropType<Element<any>, any>,
  bottomBar?: PropType<Element<any>, any>,
  children?: PropType<Array<Element<any>> | Element<any>, any>,
};

export default class PageHeader extends PureComponent {
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
