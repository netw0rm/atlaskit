import * as React from 'react';
import { Result } from '../types';
import { ResultListItem } from './ResultListItem';
import { AkNavigationItemGroup } from '@atlaskit/navigation';
import { OmitOverflowItems } from './OmitOverflowItems';

export interface Props {
  /**
   * Search result data.
   */
  results: Result[];

  /**
   * A callback to execute when a result is clicked.
   */
  onClick: (result: Result) => void;

  /**
   * If true, items that will overflow the container will be entirely omitted.
   *
   * EXPERIMENTAL!
   */
  omitOverflowItems?: boolean;
}

export class ResultList extends React.PureComponent<Props, {}> {
  render() {
    if (this.props.results.length === 0) {
      return <span>No matching search results</span>;
    }

    const grouped = groupResults(this.props.results);
    const items = grouped.map((group) => {
      return (
        <AkNavigationItemGroup title={group.category}>
          {group.items.map((item) => {
            return (
              <ResultListItem
                result={item}
                onClick={this.handleClick}
              />
            );
          })}
        </AkNavigationItemGroup>
      );
    });

    return this.props.omitOverflowItems
      ? <OmitOverflowItems minItems={3}>{items}</OmitOverflowItems>
      : <div>{items}</div>;
  }

  handleClick = (result: Result) => {
    this.props.onClick(result);
  }
}

/**
 * Group items based on category.
 *
 * This transforms a flat array of search results in an array of groups, which is a structure more
 * convenient for rendering search results. Group order is determined by order of occurence in the
 * input array.
 *
 * Example:
 *
 *     groupResults([
 *       {
 *         id: 'aaa',
 *         category: 'Foo',
 *         // ...
 *       },
 *       {
 *         id: 'bbb',
 *         category: 'Foo',
 *         // ...
 *       }
 *     ])
 *
 * Returns:
 *
 *     [
 *       {
 *         category: 'Foo',
 *         items: [
 *           {
 *             id: 'aaa',
 *             category: 'Foo',
 *             // ...
 *           },
 *           {
 *             id: 'bbb',
 *             category: 'Foo',
 *             // ...
 *           }
 *         ]
 *       }
 *     ]
 */
function groupResults(results: Result[]): Array<{ category: string, items: Result[] }> {
  const groupItems = {};
  const groups: Array<{ category: string, items: Result[] }> = [];

  for (const result of results) {
    const { category } = result;
    if (!groupItems.hasOwnProperty(category)) {
      const items = groupItems[category] = [] as Result[];
      groups.push({
        category,
        items,
      });
    }
  }

  return groups;
}
