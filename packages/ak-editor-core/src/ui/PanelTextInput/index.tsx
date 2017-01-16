import * as React from 'react';
import { FormEvent, KeyboardEvent, PureComponent } from 'react';
import * as styles from './styles';

export interface Props {
  autoFocus?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onCancel?: () => void;
  placeholder?: string;
}

export interface State {
  value?: string;
}

export default class PanelTextInput extends PureComponent<Props, State> {
  private input?: HTMLInputElement;

  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue || ''
    };
  }

  componentWillReceiveProps(props: Props) {
    this.setState({
      value: props.defaultValue
    });
  }

  render() {
    const { defaultValue, placeholder } = this.props;
    const { value } = this.state;
    return (
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={this.handleChange}
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

  private handleChange = () => {
    const { onChange } = this.props;
    if (this.input) {
      this.setState({
        value: this.input.value
      });
    }

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
