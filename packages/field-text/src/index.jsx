import React, { PropTypes, PureComponent } from 'react';
import FieldText from './FieldText';

export { FieldText };

export default class extends PureComponent {
  static propTypes = {
    /** The default value on component render. */
    value: PropTypes.string,
    /** Handler to be called after the value is updated. */
    onChange: PropTypes.func,
  }

  static defaultProps = {
    onChange: () => {},
  }

  state = {
    value: this.props.value,
  }

  handleOnChange = (e) => {
    this.setState({ value: e.target.value });
    this.props.onChange(e);
  }

  focus = () => {
    this.input.focus();
  }

  render() {
    return (
      <FieldText
        {...this.props}
        value={this.state.value}
        onChange={this.handleOnChange}
        ref={(fieldRef) => { this.input = fieldRef; }}
      />
    );
  }
}
