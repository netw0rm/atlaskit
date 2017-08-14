import * as React from 'react';
import { PureComponent } from 'react';
import DecisionItem from './DecisionItem';
import ListWrapper from '../styled/ListWrapper';

export interface ContentRef {
  (ref: HTMLElement | undefined): void;
}

export interface Props {
  children?: Array<DecisionItem> | DecisionItem;
}

export default class DecisionList extends PureComponent<Props,{}> {
  render() {
    const { children } = this.props;

    if (!children) {
      return null;
    }

    return (
      <ListWrapper>
        {React.Children.map(children, (child, idx) =>
          <li key={idx}>{child}</li>
        )}
      </ListWrapper>
    );
  }
}
