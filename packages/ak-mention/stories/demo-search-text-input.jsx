import React, { Component, PropTypes } from 'react';

import uid from 'uid';

function noModifiers(event) {
  return !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey;
}


class SearchTextInput extends Component {
  static propTypes = {
    inputId: PropTypes.string,
    onUp: PropTypes.func,
    onDown: PropTypes.func,
    onEnter: PropTypes.func,
    onEscape: PropTypes.func,
    onChange: PropTypes.func,
    inputRef: PropTypes.func,
    label: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  _handleKeyDown(event) {
    if (noModifiers(event)) {
      let notify;
      switch (event.keyCode) { /* eslint default-case: 0 */
        case 38: // Up
          notify = this.props.onUp;
          break;
        case 40: // Down
          notify = this.props.onDown;
          break;
        case 13: // Enter
          notify = this.props.onEnter;
          break;
        case 27: // Escape
          notify = this.props.onEscape;
          break;

      }
      if (notify) {
        event.preventDefault();
        notify();
      }
    }
    // switch(event.keyCode)//
  }

  _inputRefUpdate(ref) {
    if (this.props.inputRef) {
      this.props.inputRef(ref);
    }
  }

  render() {
    /* eslint no-unused-vars: 0 */
    const { onUp, onDown, onEnter, onEscape, label, inputRef, inputId, ...other } = this.props;
    let labelComponent;
    const id = inputId || uid();
    if (label) {
      labelComponent = <label htmlFor={id}>{label}</label>;
    }
    return (
      <div id="search-text" className="pf-search-text-input">
        {labelComponent}
        <input
          {...other}
          id={id}
          type="text"
          onKeyDown={this._handleKeyDown}
          ref={ref => this._inputRefUpdate(ref)}
          style={{
            height: '20px',
            marginLeft: '10px',
          }}
        />
      </div>
    );
  }
}

export default SearchTextInput;
