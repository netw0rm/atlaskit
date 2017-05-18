import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import SearchBox from '../styled/SearchBox';
import SearchClearButton from '../styled/SearchClearButton';
import SearchClearButtonOuter from '../styled/SearchClearButtonOuter';
import SearchInner from '../styled/SearchInner';
import SearchInput from '../styled/SearchInput';
import SearchResults from '../styled/SearchResults';

export default class Search extends PureComponent {
  static propTypes = {
    busyIcon: PropTypes.node,
    clearIcon: PropTypes.node,
    children: PropTypes.node,
    delayBusyStateBy: PropTypes.number,
    isBusy: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onSearchClear: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  }

  static defaultProps = {
    delayBusyStateBy: 500,
    isBusy: false,
    placeholder: 'Search',
  }

  state = {
    clearBtnIsUnderMouse: false,
  }

  componentDidMount() {
    this.handleIsBusyProp(this.props.isBusy);
  }

  componentWillReceiveProps(nextProps) {
    this.handleIsBusyProp(nextProps.isBusy);
  }

  // Attaching a mouse down handler to the whole search box rather than
  // just the button. This is done so that the input field never looses
  // focus when the user is clearing the input. This is really useful
  // on devices that close the keyboard input if the text field looses
  // focus.
  onSearchBoxMouseDown = (event) => {
    const { target } = event;
    const shouldClearInput = target === this.clearButtonRef ||
                             this.clearButtonRef.contains(target);

    if (!shouldClearInput) {
      return;
    }

    event.preventDefault();
    this.clear();
  }

  // clear the input when the user hits Escape
  onInputKeyDown = (event) => {
    if (event.key !== 'Escape') {
      return;
    }

    event.stopPropagation();
    this.clear();
  }

  setInputRef = (ref) => {
    this.inputRef = ref;
  }

  setClearButtonRef = (ref) => {
    this.clearButtonRef = ref;
  }

  // Delay switching the clearIcon to the busyIcon to prevent flicker
  handleIsBusyProp = (isBusy) => {
    clearTimeout(this.isBusyStateTimeoutId);
    if (isBusy) {
      this.isBusyStateTimeoutId = setTimeout(() => {
        this.setState({ isBusyState: true });
      }, this.props.delayBusyStateBy);
    } else {
      this.setState({ isBusyState: false });
    }
  }

  clear() {
    const { value, onSearchClear } = this.props;

    // only executing callback if there is something to clear
    if (value) {
      onSearchClear();
    }

    // always give focus to search input
    if (this.inputRef && this.inputRef !== document.activeElement) {
      this.inputRef.focus();
    }
  }

  handleClearBtnMouseEnter = () => {
    this.setState({ clearBtnIsUnderMouse: true });
  }

  handleClearBtnMouseLeave = () => {
    this.setState({ clearBtnIsUnderMouse: false });
  }

  render() {
    const {
      children,
      value,
      onChange,
      placeholder,
    } = this.props;
    return (
      <SearchInner>
        <SearchBox
          onMouseDown={this.onSearchBoxMouseDown}
        >
          <SearchInput
            autoFocus
            innerRef={this.setInputRef}
            onChange={onChange}
            placeholder={placeholder}
            spellCheck={false}
            type="text"
            value={value}
            onKeyDown={this.onInputKeyDown}
          />
          <SearchClearButtonOuter>
            {/*
              Actively preventing tabbing to the close button
              so that users can tab directly to results.
              Users can still clear the input with the keyboard
              by pressing 'Escape'.
            */}
            <SearchClearButton
              type="button"
              tabIndex="-1"
              innerRef={this.setClearButtonRef}
            >
              <span
                style={{ display: 'inherit' }}
                onMouseEnter={this.handleClearBtnMouseEnter}
                onMouseLeave={this.handleClearBtnMouseLeave}
              >
                {
                  this.props.busyIcon && this.state.isBusyState && !this.state.clearBtnIsUnderMouse
                    ? this.props.busyIcon
                    : this.props.clearIcon
                }
              </span>
            </SearchClearButton>
          </SearchClearButtonOuter>
        </SearchBox>
        <SearchResults>
          {children}
        </SearchResults>
      </SearchInner>
    );
  }
}
