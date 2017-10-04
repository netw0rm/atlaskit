import * as React from 'react';
import ProviderFactory, { WithProviders } from '../../../providerFactory';
import { Attributes as SchemaAttributes } from '../../../schema/nodes/extension';
import Extension from '../../../ui/Extension';

interface Props extends SchemaAttributes {
  providers: ProviderFactory;
}

export default class ExtensionWithProviders extends React.Component<Props, null> {
  private renderWithProvider = (providers) => {
    const { extensionId, extensionData } = this.props;
    const { extensionProvider: extensionProviderPromise } = providers;
    return (
      <Extension
        extensionProviderPromise={extensionProviderPromise}
        extensionId={extensionId}
        extensionData={extensionData}
      />
    );
  }

  render() {
    const { providers } = this.props;
    return (
      <WithProviders
        providers={['extensionProvider']}
        providerFactory={providers}
        renderNode={this.renderWithProvider}
      />
    );
  }
}
