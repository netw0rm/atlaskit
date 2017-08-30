import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import InlineDialog from '@atlaskit/inline-dialog';
import { Content, ContentWrapper } from '../styled/Content';
import ValidationElement from './ValidationElement';

const DialogWrapper = styled.div`
  ${p => (p.grow ? 'flex: 1 1 auto;' : '')}
  max-width: 100%;
`;

 /* eslint-disable react/no-unused-prop-types */
export default class FieldBaseStateless extends PureComponent {
  static propTypes = {
    /**
      * controls the appearance of the field.
      * subtle shows styling on hover.
      * none hides all field styling.
      */
    appearance: PropTypes.oneOf(['standard', 'none', 'subtle']),
    /** children to render as dialog */
    children: PropTypes.node,
    /** message to show on the dialog when isInvalid and isDialogOpen  are true */
    invalidMessage: PropTypes.node,
    /** applies compact styling, making the field smaller */
    isCompact: PropTypes.bool,
    /** controls whether to show or hide the dialog */
    isDialogOpen: PropTypes.bool,
    /** disable the field and apply disabled styling */
    isDisabled: PropTypes.bool,
    /** whether the fit the field to the enclosing container */
    isFitContainerWidthEnabled: PropTypes.bool,
    /** apply styling based on whether the field is focused */
    isFocused: PropTypes.bool,
    /** set the field as invalid, triggering style and message */
    isInvalid: PropTypes.bool,
    /** show a loading indicator */
    isLoading: PropTypes.bool,
    /** disable padding styles */
    isPaddingDisabled: PropTypes.bool,
    /** apply read only styling */
    isReadOnly: PropTypes.bool,
    /** mark the field as required */
    isRequired: PropTypes.bool,
    /** handler for the onBlur event on the field element */
    onBlur: PropTypes.func.isRequired,
    /** handler for the onBlur event on the dialog element */
    onDialogBlur: PropTypes.func,
    /** handler for the click event on the dialog element */
    onDialogClick: PropTypes.func,
    /** handler for the focus event on the dialog element */
    onDialogFocus: PropTypes.func,
    /** handler for the focus event on the field element */
    onFocus: PropTypes.func.isRequired,
    /** whether to call the onBlur handler inside componentDidUpdate */
    shouldReset: PropTypes.bool,
  }

  static defaultProps = {
    appearance: 'standard',
    invalidMessage: '',
    isCompact: false,
    isDialogOpen: false,
    isDisabled: false,
    isFitContainerWidthEnabled: false,
    isFocused: false,
    isInvalid: false,
    isLoading: false,
    isPaddingDisabled: false,
    isReadOnly: false,
    isRequired: false,
    onDialogBlur: () => {},
    onDialogClick: () => {},
    onDialogFocus: () => {},
    shouldReset: false,
  }

  componentDidUpdate() {
    if (this.props.shouldReset) {
      this.props.onBlur();
    }
  }

  render() {
    const {
      appearance,
      children,
      invalidMessage,
      isCompact,
      isDialogOpen,
      isDisabled,
      isFitContainerWidthEnabled,
      isFocused,
      isInvalid,
      isLoading,
      isPaddingDisabled,
      isReadOnly,
      onBlur,
      onDialogBlur,
      onDialogClick,
      onDialogFocus,
      onFocus,
    } = this.props;

    function getAppearance(a) {
      if (isDisabled) return 'disabled';
      if (isInvalid) return 'invalid';

      return a;
    }

    return (
      <ContentWrapper disabled={isDisabled} grow={isFitContainerWidthEnabled}>
        <DialogWrapper grow={isFitContainerWidthEnabled}>
          <InlineDialog
            content={invalidMessage}
            isOpen={isDialogOpen && !!invalidMessage}
            onContentBlur={onDialogBlur}
            onContentClick={onDialogClick}
            onContentFocus={onDialogFocus}
            position="right middle"
            shouldFlip={['top']}
          >
            <Content
              appearance={getAppearance(appearance)}
              compact={isCompact}
              disabled={isDisabled}
              fitContainerWidth={isFitContainerWidthEnabled}
              isFocused={isFocused}
              invalid={isInvalid && !isFocused}
              none={appearance === 'none'}
              onBlurCapture={onBlur}
              onFocusCapture={onFocus}
              paddingDisabled={isPaddingDisabled}
              readOnly={isReadOnly}
              subtle={appearance === 'subtle'}
            >
              {children}
              <ValidationElement
                isDisabled={isDisabled}
                isInvalid={isInvalid}
                isLoading={isLoading}
              />
            </Content>
          </InlineDialog>
        </DialogWrapper>
      </ContentWrapper>
    );
  }
}
