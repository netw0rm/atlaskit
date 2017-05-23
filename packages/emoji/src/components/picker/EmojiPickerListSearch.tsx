import * as React from 'react';
import { PureComponent } from 'react';
import AkFieldBase from '@atlaskit/field-base';
import SearchIcon from '@atlaskit/icon/glyph/search';

import {
  PickerSearchIconStyle,
  PickerSearchInputStyle,
  PickerSearchStyle,
} from './styles';
import { Styles, } from '../../types';

export interface Props {
  style?: Styles;
  query?: string;
  onChange: any;
}

export interface State {
  query?: string;
}

export default class EmojiPickerListSearch extends PureComponent<Props, State> {

  static defaultProps = {
    style: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      query: props.query
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ query: nextProps.query });
  }

  private onChange = (e) => {
    this.setState({ query: e.target.value });
    this.props.onChange(e);
  }

  render() {
    const { style } = this.props;
    const { query } = this.state;

    return (
      <PickerSearchStyle style={style}>
        <AkFieldBase
          appearance="standard"
          label="Search"
          isCompact={true}
          isLabelHidden={true}
          isFitContainerWidthEnabled={true}
        >
          <PickerSearchIconStyle>
            <SearchIcon label="Search" />
          </PickerSearchIconStyle>
          <PickerSearchInputStyle
            type="text"
            autoComplete="off"
            disabled={false}
            name="search"
            placeholder="Search..."
            required={false}
            onChange={this.onChange}
            value={query}
            innerRef={this.handleInputRef}
          />
        </AkFieldBase>
      </PickerSearchStyle>
    );
  }

  private handleInputRef = (input) => {
    if (input) {
      input.focus();
    }
  }
}
