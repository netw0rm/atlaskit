// @flow
import React, { PureComponent } from 'react';
import { ConfluenceSpaceResult,
  AtlassianContainerResult,
  AtlassianObjectResult,
  JiraProjectResult,
  PersonResult,
  ResultBase,
  RoomResult,
} from './results';
import { AkNavigationItemGroup } from '../../../src';

const noOp = () => {};

/**
 * Enumerate the result types available to SearchResults
 */

const availableResultTypes = {
  confluenceSpace: ConfluenceSpaceResult,
  container: AtlassianContainerResult,
  jiraProject: JiraProjectResult,
  object: AtlassianObjectResult,
  person: PersonResult,
  room: RoomResult,
};

type ResultShape = {|
  resultId: string,
  type: 'confluenceSpace' | 'container' | 'jiraProject' | 'object' | 'person' | 'room',
|}

type ResultGroup = {|
  items: Array<ResultShape>,
  title: string,
|}

type Props = {|
  isTabbingDisabled?: boolean,
  onResultMouseEnter?: () => null,
  onResultMouseLeave?: () => null,
  results?: Array<ResultGroup>,
  selectedItemId?: number | string,
|}

export default class SearchResults extends PureComponent {
  static defaultProps = {
    isTabbingDisabled: false,
    onResultMouseEnter: noOp,
    onResultMouseLeave: noOp,
    results: [],
  }

  props: Props

  renderResultItem = (props) => {
    const Result = availableResultTypes[props.type] || ResultBase;
    const isSelected = props.resultId === this.props.selectedItemId;
    return Result ? (
      <Result
        // SearchResult-provided props
        isSelected={isSelected}
        key={props.resultId}
        onMouseEnter={this.props.onResultMouseEnter}
        onMouseLeave={this.props.onResultMouseLeave}
        isTabbingDisabled={this.props.isTabbingDisabled}

        // Individual props take precedence over SearchResult-provided presets
        {...props}
      />
     ) : null;
  }

  renderResultGroup = (group: ResultGroup, index: number) => (
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
