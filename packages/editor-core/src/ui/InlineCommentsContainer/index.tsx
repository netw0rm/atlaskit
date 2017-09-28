import * as React from 'react';
import { PureComponent } from 'react';
import {
  default as ProviderFactory,
  WithProviders
} from '../../providerFactory';

export interface Props {
  id: string;
  providers?: ProviderFactory;
}

export default class InlineCommentContainer extends PureComponent<Props, {}> {
  private providerFactory: ProviderFactory;

  constructor(props) {
    super(props);
    this.providerFactory = props.providers || new ProviderFactory();
  }

  componentWillUnmount() {
    if (!this.props.providers) {
      // new ProviderFactory is created if no `providers` has been set
      // in this case when component is unmounted it's safe to destroy this providerFactory
      this.providerFactory.destroy();
    }
  }

  private renderWithProvider = (providers) => {
    const {
      InlineCommentsProvider,
    } = providers;

    return (
      <span>{InlineCommentsProvider}</span>
    );
  }

  render() {
    return (
      <WithProviders
        providers={['InlineCommentsProvider']}
        providerFactory={this.providerFactory}
        renderNode={this.renderWithProvider}
      />
    );
  }
}
