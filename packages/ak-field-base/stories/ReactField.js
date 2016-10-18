import reactify from 'akutil-react';
import WebComponent, { events } from '../src/index';
import React from 'react';

const FieldBase = reactify(WebComponent);

function valueToViewString(value) {
  return `"${value}" has an even length!`;
}

class ReactField extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      value: this.props.value,
      editing: this.props.editing,
      waiting: this.props.waiting,
      invalid: this.props.invalid,
      label: this.props.label,
    };
    this.showViewingViewHandler = this.showViewingViewHandler.bind(this);
    this.showEditingViewHandler = this.showEditingViewHandler.bind(this);
  }

  componentDidMount() {
    this.wrapper.addEventListener(events.showViewingView, this.showViewingViewHandler);
    this.wrapper.addEventListener(events.showEditingView, this.showEditingViewHandler);
  }

  componentWillUnmount() {
    this.wrapper.removeEventListener(events.showViewingView, this.showViewingViewHandler);
    this.wrapper.removeEventListener(events.showEditingView, this.showEditingViewHandler);
  }

  showViewingViewHandler(e) {
    if (!e.detail.cancelButtonPressed) {
      // lets perform some fake async validation
      this.setState({ waiting: true });
      // cancel the event so the view doesn't switch (making sure we set editing=false if valid)
      e.preventDefault();
      setTimeout(() => {
        if (this.inputField.value.length % 2 !== 0) {
          this.setState({
            waiting: false,
            invalid: true,
          });
        } else {
          this.setState({
            value: this.inputField.value,
            waiting: false,
            editing: false,
            invalid: false,
          });
        }
      }, 2000);
    }
  }

  showEditingViewHandler() {
    this.setState({ editing: true });
  }

  render() {
    const inputStyles = {
      background: 'transparent',
      border: '0',
      outline: '0',
      width: '100%',
      fontSize: '14px',
    };
    return (
      <div ref={ref => (this.wrapper = ref)}>
        <FieldBase
          label={this.state.label}
          waiting={this.state.waiting}
          editing={this.state.editing}
          invalid={this.state.invalid}
          ref={ref => (this.fieldBase = ref)}
        >
          <div is slot="editmode">
            <input
              type="text"
              id="editmodeInput"
              defaultValue={this.state.value}
              style={inputStyles}
              ref={ref => (this.inputField = ref)}
            />
          </div>
          <div is slot="viewmode">
            <span id="viewmodeValue">{valueToViewString(this.state.value)}</span>
          </div>
        </FieldBase>
      </div>
    );
  }
}

ReactField.displayName = 'ReactField';
ReactField.propTypes = {
  value: React.PropTypes.string,
  label: React.PropTypes.string,
  editing: React.PropTypes.bool,
  waiting: React.PropTypes.bool,
  invalid: React.PropTypes.bool,
};

export default ReactField;
