// @flow
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Button from '@atlaskit/button';
import InlineDialog from '@atlaskit/inline-dialog';
import IconForType from './IconForType';
import { types, defaultType } from './types';
import { Root, ButtonContents, Text, Title } from '../styled/InlineMessage';

export default class InlineMessage extends PureComponent {
  static propTypes = {
    /** The elements to be displayed by the inline dialog. */
    children: PropTypes.node,
    /** Text to display first, bolded for emphasis. */
    title: PropTypes.string,
    /** Set the icon to be used before the title. Options are: connectivity,
    confirmation, info, warning, and error. */
    type: PropTypes.oneOf(types),
    /** Text to display second. */
    secondaryText: PropTypes.string,
    /** Position prop to be passed to the inline dialog. Determines where around
    the text the dialog is displayed. */
    position: InlineDialog.propTypes.position,
  }

  static defaultProps = {
    type: defaultType,
    position: 'bottom left',
  }

  state = {
    isOpen: false,
    isHovered: false,
  }

  onMouseEnter = () => {
    this.setState({ isHovered: true });
  }

  onMouseLeave = () => {
    this.setState({ isHovered: false });
  }

  toggleDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { children, position, secondaryText, title, type } = this.props;
    const { isHovered, isOpen } = this.state;
    return (
      <Root
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        appearance={type}
      >
        <InlineDialog
          content={children}
          isOpen={isOpen}
          position={position}
          shouldFlip
        >
          <Button
            appearance="subtle-link"
            onClick={this.toggleDialog}
          >
            <ButtonContents isHovered={isHovered}>
              <IconForType
                type={type}
                isHovered={isHovered}
                isOpen={isOpen}
              />
              {
                title ? (
                  <Title isHovered={isHovered}>
                    {title}
                  </Title>
                ) : null
              }
              {
                secondaryText ? (
                  <Text isHovered={isHovered}>{secondaryText}</Text>
                ) : null
              }
            </ButtonContents>
          </Button>
        </InlineDialog>
      </Root>
    );
  }
}
