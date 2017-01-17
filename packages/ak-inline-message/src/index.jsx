import React, { PureComponent, PropTypes } from 'react';
import Button from 'ak-button';
import InlineDialog from 'ak-inline-dialog';
import {
  akGridSize,
  akColorN300,
  akColorN600,
} from 'akutil-shared-styles';
import styled from 'styled-components';
import IconForType from './internal/IconForType';
import { types, defaultType } from './internal/types';

export default class InlineMessage extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    type: PropTypes.oneOf(types),
    secondaryText: PropTypes.string,
  }

  static defaultProps = {
    type: defaultType,
  }

  state = {
    isHovered: false,
    isMouseDown: false,
    isOpen: false,
  }

  setIsHovered = isHovered => (
    () => {
      this.setState({ isHovered });
    }
  )

  setIsMouseDown = isMouseDown => (
    () => {
      this.setState({ isMouseDown });
    }
  )

  toggleDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  renderTitleText = () => {
    if (!this.props.title) return null;

    const TitleText = styled.span`
      color: ${akColorN600};
      flex: 0 0 auto;
      font-weight: 500;
      padding: 0 calc(${akGridSize} / 2);
    `;

    return (
      <TitleText>
        {this.props.title}
      </TitleText>
    );
  }

  renderSecondaryText = () => {
    if (!this.props.secondaryText) return null;

    const SecondaryText = styled.span`
      color: ${akColorN300};
      flex: 0 0 auto;
      padding: 0 calc(${akGridSize} / 2);
    `;

    return (
      <SecondaryText>
        {this.props.secondaryText}
      </SecondaryText>
    );
  }

  render = () => {
    const ButtonContents = styled.div`
      align-items: center;
      display: flex;
      color: ${akColorN600};
      text-decoration: ${this.state.isHovered && !this.state.isMouseDown ? 'underline' : 'none'};
    `;

    return (
      <div
        onMouseOver={this.setIsHovered(true)}
        onMouseOut={this.setIsHovered(false)}
        onMouseDown={this.setIsMouseDown(true)}
        onMouseUp={this.setIsMouseDown(false)}
        style={{ display: 'inline-block' }}
      >
        <InlineDialog
          content={this.props.children}
          isOpen={this.state.isOpen}
          position="bottom left"
          shouldFlip
        >
          <Button
            appearance="subtle-link"
            onClick={this.toggleDialog}
          >
            <ButtonContents>
              <IconForType
                isHovered={this.state.isHovered}
                isMouseDown={this.state.isMouseDown}
                type={this.props.type}
              />
              {this.renderTitleText()}
              {this.renderSecondaryText()}
            </ButtonContents>
          </Button>
        </InlineDialog>
      </div>
    );
  }
}
