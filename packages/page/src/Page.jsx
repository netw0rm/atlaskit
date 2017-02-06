import React, { PureComponent, PropTypes } from 'react';
import styled, { ThemeProvider } from 'styled-components';

const Wrapper = styled.div`
  min-height: 100%;
  width: 100%;
`;

const PageContent = styled.div`
  min-height: 100%;
  width: 100%;
`;

export default class Page extends PureComponent {
  static displayName = 'AkPage';

  static propTypes = {
    children: PropTypes.node,
    navigation: PropTypes.node,
  }

  render = () => (
    <Wrapper>
      <ThemeProvider theme={{}}>
        <PageContent>
          {this.props.navigation}
          {this.props.children}
        </PageContent>
      </ThemeProvider>
    </Wrapper>
  );
}
