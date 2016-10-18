import React, { PropTypes } from 'react';
import uid from 'uid';

const SearchTextInput = React.createClass({

  displayName: 'SearchTextInput',

  propTypes: {
    onUp: PropTypes.func,
    onDown: PropTypes.func,
    onEnter: PropTypes.func,
    onEscape: PropTypes.func,
    onChange: PropTypes.func,
    inputRef: PropTypes.func,
    label: PropTypes.string,
  },

  _noModifiers(event) {
    return !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey;
  },

  _handleKeyDown(event) {
    if (this._noModifiers(event)) {
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
  },

  _inputRefUpdate(ref) {
    if (this.props.inputRef) {
      this.props.inputRef(ref);
    }
  },

  render() {
    /* eslint no-unused-vars: 0 */
    const { onUp, onDown, onEnter, onEscape, label, inputRef, ...other } = this.props;
    let labelComponent;
    const id = uid();
    if (label) {
      labelComponent = <label htmlFor={id}>{label}</label>;
    }
    return (
      <div className="pf-search-text-input">
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
  },
});

export default SearchTextInput;
