import { FocusEventHandler, PureComponent } from 'react';

export interface Props {
  appearance: 'standard' | 'compact' | 'none' | 'subtle';
  isInvalid?: boolean;
  isFocused?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isPaddingDisabled?: boolean;
  isReadOnly?: boolean;
  isFitContainerWidthEnabled?: boolean;
  onFocus?: FocusEventHandler<any>;
  onBlur?: FocusEventHandler<any>;
  shouldReset?: boolean;
  label?: string; // seems implicit
  isLabelHidden?: boolean; // has default, but no declaration
}

export default class AkFieldBase extends PureComponent<Props, {}> {}
