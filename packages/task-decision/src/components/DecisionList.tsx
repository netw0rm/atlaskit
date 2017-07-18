import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';

export interface ContentRef {
  (ref: HTMLElement | undefined): void;
}

export interface Props {
  children?: Array<DecisionItem>;
}

// tslint:disable-next-line:variable-name
const ListWrapper = styled.ul`
  list-style-type: none;
  margin: 0 4px;
  padding-left: 0;
`;

export default class DecisionItem extends PureComponent<Props,{}> {
  render() {
    const { children } = this.props;

    if (!children) {
      return null;
    }

    if (Array.isArray(children)) {
      const childArray = children as Array<DecisionItem>;
      return (
        <ListWrapper>
          {childArray.map((child, idx) =>
            <li key={idx}>{child}</li>
          )}
        </ListWrapper>
      );
    }

    // Not array
    return (
      <ListWrapper>
        <li>{children}</li>
      </ListWrapper>
    );
  }
}
