// @flow
import React, { PureComponent } from 'react';
import { PersonResult, RoomResult } from './results';
import { AkNavigationItemGroup } from '../../../src';

/**
 * Enumerate the result types available to SearchResults
 */

const availableResultTypes = {
  person: PersonResult,
  room: RoomResult,
};

type ResultShape = {|
  id: string,
  type: 'person' | 'room',
|}

type ResultGroup = {|
  items: Array<ResultShape>,
  title: string,
|}

type Props = {|
  results: Array<ResultGroup>,
  selectedItemId: number,
  onClick: () => null,
|}

export default class SearchResults extends PureComponent {
  static defaultProps = {
    onClick: () => {},
    results: [],
    selectedItemId: null,
  }

  props: Props

  renderResultItem = (props) => {
    const Result = availableResultTypes[props.type];
    const isSelected = props.id === this.props.selectedItemId;
    return Result ? (
      <Result
        {...props}
        key={props.id}
        isSelected={isSelected}
        onClick={this.props.onClick}
      />
     ) : null;
  }

  renderResultGroup = (group, index) => (
    group.items && group.items.length > 0 ? (
      <AkNavigationItemGroup key={group.title || index} title={group.title}>
        {group.items.map(this.renderResultItem)}
      </AkNavigationItemGroup>
    ) : null
  );

  render() {
    return (
      <div>
        {this.props.results.map(this.renderResultGroup)}
      </div>
    );
  }
}
