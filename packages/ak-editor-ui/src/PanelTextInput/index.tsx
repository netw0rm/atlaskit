import React, { FormEvent, KeyboardEvent, PureComponent } from 'react';
import * as styles from './styles.global.less';

interface Props {
  autoFocus?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onCancel?: () => void;
  placeholder?: string;
}

interface State {}

export default class PanelTextInput extends PureComponent<Props, State> {
  state: State = {};
  private input?: HTMLInputElement;

  render() {
    const { defaultValue, placeholder } = this.props;
    return (
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onInput={this.handleInput}
        onKeyUp={this.handleKeyup}
        ref={this.handleRef}
      />
    );
  }

  focus() {
    const { input } = this;
    if (input) {
      input.focus();
    }
  }

  private handleInput = (e: FormEvent<any>) => {
    const { onChange } = this.props;
    if (onChange && this.input) {
      onChange(this.input.value);
    }
  }

  private handleKeyup = (e: KeyboardEvent<any>) => {
    if (e.keyCode === 13 && this.props.onSubmit) {
      this.props.onSubmit(this.input!.value);
    } else if (e.keyCode === 27 && this.props.onCancel) {
      this.props.onCancel();
    }
  }

  private handleRef = (input: HTMLInputElement | null) => {
    if (input instanceof HTMLInputElement) {
      if (this.props.autoFocus) {
        input.focus();
      }
      this.input = input;
    } else {
      this.input = undefined;
    }
  }
}
