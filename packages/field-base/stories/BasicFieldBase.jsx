import React from 'react';
import AkFieldBase, { Label } from '../src';

const containerStyles = {
  display: 'inline-flex',
  flexDirection: 'column',
};

/* eslint-disable react/prop-types */
export default props => (
  <div style={{ ...containerStyles, ...{ padding: props.disablePadding ? '0' : '20px' } }}>
    <Label
      label={props.label}
      htmlFor={props.id}
      isLabelHidden={props.isLabelHidden}
      isRequired={props.isRequired}
      type={props.type}
      isFirstChild={props.isFirstChild}
    />
    <AkFieldBase
      isInvalid={props.isInvalid}
      isDisabled={props.isDisabled}
      isReadOnly={props.isReadOnly}
      appearance={props.appearance}
      isPaddingDisabled={props.isPaddingDisabled}
      isFitContainerWidthEnabled={props.isFitContainerWidthEnabled}
    >
      {props.children}
    </AkFieldBase>
  </div>
);
