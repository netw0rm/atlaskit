import React, { PureComponent, PropTypes } from 'react';
import styled, { ThemeProvider, withTheme } from 'styled-components';

import { defaultColumns, gridSize, layout, spacing } from './internal/vars';

const columnWidth = gridSize * 10;

const Grid = styled.div`
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  margin: 0 ${props => (props.theme.isNestedGrid ? (`-${spacing[props.theme.spacing]}px`) : 'auto')};
  ${props => (
    props.layout === 'fixed' ?
      `max-width: ${columnWidth * props.theme.columns}px` :
      null
    )
  }
  min-height: 100%;
  padding: 0 ${props => ((spacing[props.theme.spacing]) / 2)}px;
  position: relative;
`;

export default withTheme(class AkGrid extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    spacing: PropTypes.oneOf(Object.keys(spacing)),
    layout: PropTypes.oneOf(layout),
  }

  static defaultProps = {
    spacing: 'cosy',
    layout: 'fixed',
  }

  getTheme = props => ({
    columns: (props.theme && props.theme.columns) ?
      props.theme.columns :
      defaultColumns,
    spacing: (props.theme && props.theme.spacing) ?
      props.theme.spacing :
      props.spacing,
    isNestedGrid: (props.theme && props.theme.isNestedGrid) ?
      props.theme.isNestedGrid :
      false,
  });

  render() {
    return (
      <ThemeProvider theme={this.getTheme(this.props)}>
        <Grid spacing={this.props.spacing} layout={this.props.layout}>
          {this.props.children}
        </Grid>
      </ThemeProvider>
    );
  }
});
