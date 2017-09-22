import * as React from 'react';
import {Wrapper, Title, Description} from './styled';

export interface CardBorderProps {
  title?: string;
  description?: string;
}

export class CardDetails extends React.Component<CardBorderProps, {}> {
  render() {
    const {title, description} = this.props;
    return (
      <Wrapper>
        <Title>
          {title}
        </Title>
        <Description>
          {description}
        </Description>
      </Wrapper>
    );
  }
}
