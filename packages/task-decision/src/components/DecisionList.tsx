import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import DecisionItem from './DecisionItem';

export interface ContentRef {
  (ref: HTMLElement | undefined): void;
}

export interface Props {
  children?: Array<DecisionItem> | DecisionItem;
}

// tslint:disable-next-line:variable-name
const ListWrapper = styled.ul`
  list-style-type: none;
  margin: 0 4px;
  padding-left: 0;
`;

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
