import React, { PureComponent, PropTypes } from 'react';
import { ThemeProvider, withTheme } from 'styled-components';

/*
================================================
layout and spacing prop were imported from ./internal/vars
so that documentation will be clear. It must be kept in sync.
================================================
*/

import { defaultGridColumns } from './internal/vars';
import Grid from './internal/GridElement';

export default withTheme(class AkGrid extends PureComponent {

  static propTypes = {
    /** Components to render in grid. All children should be GridColumns. */
    children: PropTypes.node,
    /** How much spacing should be placed between columns in the grid. */
    spacing: PropTypes.oneOf([
      'comfortable',
      'cosy',
      'compact',
    ]),
    /** Whether the columns should have a fixed maximum width, or no maximum width. */
    layout: PropTypes.oneOf(['fixed', 'fluid']),
  }

  static defaultProps = {
    spacing: 'cosy',
    layout: 'fixed',
  }

  getTheme = props => ({
    columns: (props.theme && props.theme.columns) ?
      props.theme.columns :
      defaultGridColumns,
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
