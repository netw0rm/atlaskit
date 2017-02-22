import React, { PureComponent, PropTypes } from 'react';
import Droplist from '@atlaskit/droplist';
import Item from '@atlaskit/droplist-item';
import Group from '@atlaskit/droplist-group';
import { Label, FieldBase } from '@atlaskit/field-base';
import styles from 'style!./styles.less';
import classNames from 'classnames';
import ExpandIcon from '@atlaskit/icon/glyph/expand';

import NothingWasFound from './internal/NothingWasFound';

export const itemShape = PropTypes.shape({
  content: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isDisabled: PropTypes.bool,
  isSelected: PropTypes.bool,
  elemBefore: PropTypes.node,
  elemAfter: PropTypes.node,
});

export default class StatelessSelect extends PureComponent {
  static propTypes = {
    filterValue: PropTypes.string,
    hasAutocomplete: PropTypes.bool,
    id: PropTypes.string,
    isDisabled: PropTypes.bool,
    isFirstChild: PropTypes.bool,
    isOpen: PropTypes.bool,
    isRequired: PropTypes.bool,
    isInvalid: PropTypes.bool,
    items: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    label: PropTypes.string,
    name: PropTypes.string,
    noMatchesFound: PropTypes.string,
    onSelected: PropTypes.func,
    onFilterChange: PropTypes.func,
    onOpenChange: PropTypes.func,
    placeholder: PropTypes.string,
    position: PropTypes.string,
    shouldFocus: PropTypes.bool,
    selectedItem: itemShape,
    shouldFitContainer: PropTypes.bool,
  }

  static defaultProps = {
    filterValue: '',
    hasAutocomplete: false,
    isOpen: false,
    isRequired: false,
    items: [],
    label: '',
    noMatchesFound: 'No matches found',
    onFilterChange: () => {},
    onSelected: () => {},
    onOpenChange: () => {},
    placeholder: '',
    position: 'bottom left',
    shouldFocus: false,
    selectedItem: {},
  }

  state = {
    isFocused: this.props.isOpen,
    focusedItemIndex: null,
  }

  componentDidMount = () => {
    if (this.state.isFocused && this.inputNode) {
      this.inputNode.focus();
    }
  }

  componentDidUpdate = (prevProps) => {
    if (!prevProps.shouldFocus && this.props.shouldFocus && this.inputNode) {
      this.inputNode.focus();
    }
  }

  onFocus = () => {
    if (!this.props.isDisabled) {
      this.setState({ isFocused: true });
      if (this.inputNode) {
        this.inputNode.focus();
      }
    }
  }

  onBlur = () => {
    if (!this.props.isDisabled) {
      this.setState({ isFocused: false });
    }
  }

  onOpenChange = (attrs) => {
    this.props.onOpenChange(attrs);

    if (this.inputNode) {
      this.inputNode.focus();
    }
  }

  getNextFocusable = (indexItem, length) => {
    let currentItem = indexItem;

    if (currentItem === null) {
      currentItem = 0;
    } else if (currentItem < length) {
      currentItem++;
    } else {
      currentItem = 0;
    }

    return currentItem;
  }

  getPrevFocusable = (indexItem, length) => {
    let currentItem = indexItem;

    if (currentItem > 0) {
      currentItem--;
    } else {
      currentItem = length;
    }

    return currentItem;
  }

  getAllItems = (groups) => {
    let allItems = [];
    groups.forEach((val) => {
      allItems = allItems.concat(val.items);
    });
    return allItems;
  }

  getAllVisibleItems = (groups) => {
    let allFilteredItems = [];
    groups.forEach((val) => {
      allFilteredItems = allFilteredItems.concat(this.filterItems(val.items));
    });
    return allFilteredItems;
  }

  getNextNativeSearchItem = (items, key, currentIndex, isSecondStep) => {
    let res = items.find((item, index) => {
      const content = item.content && item.content.toLowerCase();
      if (index <= currentIndex) {
        return false;
      }
      return content && content.indexOf(key) === 0;
    });

    if (!res && !isSecondStep) {
      res = this.getNextNativeSearchItem(items, key, 0, true);
    }

    return res;
  }

  setNativeSearchCounter = () => setTimeout(() => {
    this.nativeSearchKey = '';
  }, 200)

  filterItems = (items) => {
    const value = this.props.filterValue;
    const trimmedValue = value && value.toLowerCase().trim();
    const selectedItem = this.props.selectedItem;
    const unselectedItems = items.filter(item => selectedItem.value !== item.value);

    return trimmedValue &&
      (trimmedValue !== (selectedItem.content && selectedItem.content.toLowerCase())) ?
      unselectedItems.filter(item => (item.content.toLowerCase().indexOf(trimmedValue) > -1)) :
      unselectedItems;
  }

  focusNextItem = () => {
    const filteredItems = this.getAllVisibleItems(this.props.items);
    const length = filteredItems.length - 1;
    this.setState({
      focusedItemIndex: this.getNextFocusable(this.state.focusedItemIndex, length),
    });
  }

  focusPreviousItem = () => {
    const filteredItems = this.getAllVisibleItems(this.props.items);
    const length = filteredItems.length - 1;
    this.setState({
      focusedItemIndex: this.getPrevFocusable(this.state.focusedItemIndex, length),
    });
  }

  handleNativeSearch = (event) => {
    if (this.props.hasAutocomplete) return;
    const { selectedItem, items } = this.props;
    const { key: eventKey } = event;
    let { nativeSearchKey } = this;
    const allItems = this.getAllItems(items);

    if (!this.nativeSearchCounter) {
      nativeSearchKey = eventKey;
    } else {
      nativeSearchKey += eventKey;
    }

    const matchingItem = this.getNextNativeSearchItem(
      allItems,
      nativeSearchKey,
      allItems.indexOf(selectedItem),
    );

    if (matchingItem) {
      this.handleItemSelect(matchingItem, { event });
    }

    clearTimeout(this.nativeSearchCounter);
    this.nativeSearchCounter = this.setNativeSearchCounter();
    this.previousKey = eventKey;
    this.nativeSearchKey = nativeSearchKey;
  }

  handleKeyboardInteractions = (event) => {
    const isSelectOpen = this.props.isOpen;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!isSelectOpen) {
          this.onOpenChange({ event, isOpen: true });
        }
        this.focusNextItem();
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isSelectOpen) {
          this.focusPreviousItem();
        }
        break;
      case 'Enter':
        if (isSelectOpen && this.state.focusedItemIndex !== null) {
          this.handleItemSelect(
            this.getAllVisibleItems(this.props.items)[this.state.focusedItemIndex], { event }
          );
        }
        break;
      default:
        this.handleNativeSearch(event);
        break;
    }
  }

  handleInputOnChange = (event) => {
    const value = event.target.value;

    if (value !== this.props.filterValue) {
      this.props.onFilterChange(value);
      this.onOpenChange({ event, isOpen: true });
    }
  }

  handleTriggerClick = (event) => {
    if (!this.props.isDisabled) {
      this.onOpenChange({ event, isOpen: true });
    }
  }

  handleItemSelect = (item, attrs) => {
    if (!item.isDisabled) {
      this.props.onOpenChange({ isOpen: false, event: attrs.event });
      this.props.onSelected(item);
      this.props.onFilterChange(item.content);
      this.setState({ focusedItemIndex: null });
    }
  }

  renderItems = (items) => {
    const filteredItems = this.filterItems(items);

    if (filteredItems.length) {
      return filteredItems.map((item, itemIndex) => (<Item
        {...item}
        isFocused={itemIndex === this.state.focusedItemIndex}
        key={itemIndex}
        onActivate={(attrs) => {
          this.handleItemSelect(item, attrs);
        }}
      >
        {item.content}
      </Item>));
    }

    return (<NothingWasFound noMatchesFound={this.props.noMatchesFound} />);
  }

  renderGroups = groups => groups.map((group, groupIndex) =>
    <Group
      heading={group.heading}
      key={groupIndex}
    >
      {this.renderItems(group.items)}
    </Group>
  )

  renderOptions = items => items.map((item, itemIndex) => (<option
    disabled={item.isDisabled}
    key={itemIndex}
    value={item.value}
  >{item.content}</option>))

  renderOptGroups = groups => groups.map((group, groupIndex) =>
    <optgroup
      label={group.heading}
      key={groupIndex}
    >
      {this.renderOptions(group.items)}
    </optgroup>
  )

  renderSelect = () => (<select
    disabled={this.props.isDisabled}
    id={this.props.id}
    name={this.props.name}
    readOnly
    required={this.props.isRequired}
    style={{ display: 'none' }}
    value={this.props.selectedItem.value}
  >
    <option value="" />
    {this.renderOptGroups(this.props.items)}
  </select>)

  render() {
    const classes = classNames([styles.selectWrapper, {
      [styles.fitContainer]: this.props.shouldFitContainer,
    }]);

    const triggerClasses = classNames([styles.trigger, {
      [styles.isOpen]: this.props.isOpen,
    }]);

    // disabled because all of the accessibility is handled manually
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        className={classes}
        onKeyDown={this.handleKeyboardInteractions}
      >
        {this.renderSelect()}
        {this.props.label ? <Label
          htmlFor={this.props.id}
          isFirstChild={this.props.isFirstChild}
          isRequired={this.props.isRequired}
          label={this.props.label}
        /> : null}
        <Droplist
          isKeyboardInteractionDisabled
          isOpen={this.props.isOpen}
          isTriggerDisabled
          isTriggerNotTabbable
          onOpenChange={this.onOpenChange}
          position={this.props.position}
          shouldFitContainer
          trigger={
            <FieldBase
              isDisabled={this.props.isDisabled}
              isFitContainerWidthEnabled
              isFocused={this.props.isOpen || this.state.isFocused}
              isInvalid={this.props.isInvalid}
              isPaddingDisabled
              onBlur={this.onBlur}
              onFocus={this.onFocus}
            >
              <div
                className={triggerClasses}
                onClick={this.handleTriggerClick}
                tabIndex="0"
              >
                {
                  !this.props.hasAutocomplete || this.props.isDisabled ?
                    <div className={styles.content}>
                      {
                        this.props.selectedItem.content ||
                        <span className={styles.placeholder}>{this.props.placeholder}</span>
                      }
                    </div> :
                    <div className={styles.contentAutocomplete}>
                      <input
                        onChange={this.handleInputOnChange}
                        placeholder={this.props.placeholder}
                        ref={ref => (this.inputNode = ref)}
                        type="text"
                        value={this.props.filterValue}
                      />
                    </div>
                }
                <div className={styles.expand}>
                  <ExpandIcon label="" />
                </div>
              </div>
            </FieldBase>
          }
        >
          {this.renderGroups(this.props.items)}
        </Droplist>
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}
