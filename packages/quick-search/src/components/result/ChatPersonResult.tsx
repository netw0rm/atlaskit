import * as React from 'react';
import styled from 'styled-components';
import { AkAvatar } from '@atlaskit/avatar';
import { Result } from './Result';
import { akColorN100 } from '@atlaskit/util-shared-styles';

interface Props {
  /**
   * A URL to the person's avatar.
   */
  avatarUrl: string;

  /**
   * The person's name.
   */
  name: string;

  /**
   * The @-mention name for a user, without leading @ symbol.
   */
  mentionName?: string;

  /**
   * A callback for when this item is selected.
   */
  onClick: () => void;
}

// tslint:disable-next-line:variable-name
const MentionName = styled.span`
  color: ${akColorN100}
`;

export class ChatPersonResult extends React.PureComponent<Props, {}> {
  render() {
    const text = this.props.mentionName
      ? <div>
          {this.props.name}
          <MentionName>{` @${this.props.mentionName}`}</MentionName>
        </div>
      : this.props.name;

    return (
      <Result
        avatar={<AkAvatar src={this.props.avatarUrl} size="small" />}
        body={text}
        onClick={this.props.onClick}
      />
    );
  }
}
