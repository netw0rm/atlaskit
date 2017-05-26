import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ButtonGroupDiv from '../styled/ButtonGroup';

export default class ButtonGroup extends PureComponent {
  static propTypes = {
    /** Button elements to be displayed inside the group. */
    children: PropTypes.node,
  }

  render() {
    return (
      <ButtonGroupDiv>
        {this.props.children}
      </ButtonGroupDiv>
    );
  }
}
