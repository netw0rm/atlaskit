import React, { PropTypes, PureComponent } from 'react';
import {
  akColorB100,
  akColorN0,
  akColorN20A,
  akColorN30,
  akColorN50A,
  akColorN500,
  akColorN900,
  akGridSizeInt,
} from 'akutil-shared-styles';
import styled from 'styled-components';
import CancelIcon from 'ak-icon/glyph/cancel';
import ActionItems from './internal/ActionItems';

const flagWidth = akGridSizeInt * 50;

// eslint-disable-next-line react/prefer-stateless-function
export default class Flag extends PureComponent {
  static propTypes = {
    actions: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.node,
      onClick: PropTypes.func,
    })),
    description: PropTypes.string,
    icon: PropTypes.element.isRequired,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    isDismissAllowed: PropTypes.bool,
    onDismissed: PropTypes.func,
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {
    actions: [],
    isDismissAllowed: false,
    onDismissed: () => {},
  }

  flagDismissed = () => {
    this.props.onDismissed(this.props.id);
  }

  render() {
    const Root = styled.div`
      background-color: ${akColorN0};
      border: 1px solid ${akColorN30};
      border-radius: ${akGridSizeInt / 2}px;
      box-sizing: border-box;
      box-shadow: 0 ${akGridSizeInt * 2.5}px ${akGridSizeInt * 4}px ${akGridSizeInt * -1}px ${akColorN50A},
                  0 0 1px ${akColorN20A};
      display: flex;
      padding: ${akGridSizeInt * 2}px;
      width: 100%;

      &:focus {
        outline: none;
        box-shadow: 0px 0px 0px 2px ${akColorB100};
      }
    `;

    const PrimaryIcon = styled.div`
      flex: 0 0 auto;
      width: ${akGridSizeInt * 4}px;
    `;

    const TextContent = styled.div`
      flex: 1 1 auto;
    `;

    const TitleAndDismiss = styled.div`
      display: flex;
    `;

    const Title = styled.span`
      font-weight: 600;
      flex: 1 0 auto;
      max-width: ${flagWidth - (akGridSizeInt * 12)}px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;

    const DismissButton = styled.button`
      appearance: none;
      background: none;
      border: none;
      color: ${akColorN500};
      cursor: pointer;
      display: flex;
      flex: 0 1 auto;
      justify-content: flex-end;
      margin: 0;
      padding: 0;
      width: ${akGridSizeInt * 4}px;

      &:focus {
        outline: none;
        box-shadow: 0px 0px 0px 2px ${akColorB100};
      }

      &:hover {
        color: ${akColorN900};
      }
    `;

    const Description = styled.div`
      color: ${akColorN500};
      margin-top: ${akGridSizeInt}px;
    `;

    return (
      <Root role="alert" tabIndex="0">
        <PrimaryIcon>{this.props.icon}</PrimaryIcon>
        <TextContent>
          <TitleAndDismiss>
            <Title>{this.props.title}</Title>
            {
              this.props.isDismissAllowed ? (
                <DismissButton onClick={this.flagDismissed}>
                  <CancelIcon label="Dismiss flag" />
                </DismissButton>
              ) : null
            }
          </TitleAndDismiss>
          {
            this.props.description ? (
              <Description>{this.props.description}</Description>
            ) : null
          }
          <ActionItems actions={this.props.actions} />
        </TextContent>
      </Root>
    );
  }
}
