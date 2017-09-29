import * as React from 'react';
import { PureComponent } from 'react';
import InlineCommentWrapper from './InlineCommentWrapper';
import styled from 'styled-components';

export interface Props {
  authorAvatarUrl: string;
  authorDisplayName: string;
  body: string;
}

// tslint:disable-next-line:variable-name
const Title: any = styled.div`
  color: #5E6C84;
  font-size: 12px;
  font-weight: 500;
  line-height: 12px;
`;

// tslint:disable-next-line:variable-name
const Content: any = styled.div`
  color: #172B4D;
  font-size: 14px;
  line-height: 20px;
  padding-top: 4px;
`;

export default class InlineComment extends PureComponent<Props, {}> {
  render() {
    const {
      authorAvatarUrl,
      body,
      authorDisplayName,
    } = this.props;
    return (
      <InlineCommentWrapper authorAvatarUrl={authorAvatarUrl}>
        <Title>{authorDisplayName}</Title>
        <Content dangerouslySetInnerHTML={{ __html: body }} />
      </InlineCommentWrapper>
    );
  }
}
