import * as React from 'react';
import { PureComponent } from 'react';
import { akColorN20 } from '@atlaskit/util-shared-styles';
import Spinner from '@atlaskit/spinner';

import { Participant } from '../types';

export interface Props {
  participants: Participant[];
}

export interface State {
  AvatarGroup?: React.ComponentClass<any>;
}

export default class Partipants extends PureComponent<Props, State> {
  state: State = {};

  componentWillMount() {
    require.ensure([], (require) => {
      const { AvatarGroup } = require('@atlaskit/avatar');
      this.setState({ AvatarGroup });
    });
  }

  private getAvatarData() {
    return this.props.participants.map(p => ({
      src: p.avatarUrl,
      name: p.displayName,
    }));
  }

  render() {
    const { AvatarGroup } = this.state;
    if (!AvatarGroup) {
      return <Spinner />;
    }

    return (
      <AvatarGroup
        appearance="stack"
        borderColor={akColorN20}
        maxCount={4}
        size="small"
        data={this.getAvatarData()}
      />
    );
  }
}
