import React, { PropTypes, PureComponent } from 'react';
import Button from 'ak-button';
import {
  akColorB400,
  akColorN100,
  akColorN500,
  akGridSizeInt,
} from 'akutil-shared-styles';
import styled from 'styled-components';

// eslint-disable-next-line react/prefer-stateless-function
export default class ActionItems extends PureComponent {
  static propTypes = {
    actions: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.node,
      onClick: PropTypes.func,
    })),
  };

  static defaultProps = {
    actions: [],
  }

  render() {
    if (!this.props.actions.length) return null;

    const ActionsContainer = styled.ul`
      display: flex;
      flex-wrap: wrap;
      list-style-type: none;
      margin: 0;
      padding: ${akGridSizeInt}px 0 0 0;
    `;

    const ActionItemWrapper = styled.li`
      display: flex;
      justify-content: center;
      margin: 0;

      &:not(:first-child)::before {
        color: ${akColorN500};
        content: "\\b7\\a0";
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        width: ${akGridSizeInt * 2}px;
      }
    `;

    const ActionButton = styled(Button)`
      span {
        color: ${akColorN100};
      }

      &:hover span {
        color: ${akColorB400};
      }
    `;

    const items = this.props.actions.map(action => (
      <ActionItemWrapper>
        <ActionButton
          appearance="link"
          onClick={action.onClick}
          spacing="none"
        >
          <span>{action.content}</span>
        </ActionButton>
      </ActionItemWrapper>
    ));

    return <ActionsContainer>{items}</ActionsContainer>;
  }
}
