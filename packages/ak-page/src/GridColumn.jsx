import React, { PureComponent, PropTypes } from 'react';
import styled, { ThemeProvider, withTheme } from 'styled-components';

import { defaultColumns, spacing } from './internal/vars';

const defaultSpacing = 'cosy';

const Col = styled.div`
  flex: 1 0 auto;
  ${props => (props.medium ?
    `flex-basis: calc(100% / ${props.theme.columns} * ${props.medium} - ${spacing[props.theme.spacing]}px);`
    : null
    )}
  margin: 0 ${props => (spacing[props.theme.spacing] / 2)}px;
  max-width: calc(100% / ${props => props.theme.columns} * ${props => props.medium} - ${props => (spacing[props.theme.spacing])}px);
  min-width: calc(100% / ${props => props.theme.columns} - ${props => (spacing[props.theme.spacing])}px);
  word-wrap: break-word;
`;

export default withTheme(class AkGridColumn extends PureComponent {

  static propTypes = {
    xsmall: PropTypes.number,
    small: PropTypes.number,
    medium: PropTypes.number,
    large: PropTypes.number,
    xlarge: PropTypes.number,
    children: PropTypes.node,
  }

  static defaultProps = {
    xsmall: 12,
    small: 12,
    medium: null,
    large: 12,
    xlarge: 12,
  }

  getTheme = props => ({
    columns: (props.theme && props.theme.columns) ?
      props.theme.columns :
      defaultColumns,
    spacing: (props.theme && props.theme.spacing) ?
      props.theme.spacing :
      defaultSpacing,
    isNestedGrid: false,
  });

  getNestedTheme = props => ({
    columns: props.medium,
    spacing: (props.theme && props.theme.spacing) ?
      props.theme.spacing :
      defaultSpacing,
    isNestedGrid: true,
  });

  render() {
    return (
      <ThemeProvider theme={this.getTheme(this.props)}>
        <Col
          xsmall={this.props.xsmall}
          small={this.props.small}
          medium={this.props.medium}
          large={this.props.large}
          xlarge={this.props.xlarge}
        >
          <ThemeProvider theme={this.getNestedTheme(this.props)}>
            <div>
              {this.props.children}
            </div>
          </ThemeProvider>
        </Col>
      </ThemeProvider>
    );
  }
});
