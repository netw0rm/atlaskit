import React, { FormEvent, PureComponent } from 'react';
import * as styles from './styles.global.less';

interface Props {
  autoFocus?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
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
        ref={this.handleRef}
      />
    );
  }

  private handleInput = (e: FormEvent<any>) => {
    const { onChange } = this.props;
    if (onChange && this.input) {
      onChange(this.input.value);
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
