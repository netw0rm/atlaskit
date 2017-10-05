import * as React from 'react';
import ProviderFactory, { WithProviders } from '../../../providerFactory';
import { Attributes as SchemaAttributes } from '../../../schema/nodes/extension';
import Extension, { ExtensionProvider } from '../../../ui/Extension';

interface Props extends SchemaAttributes {
  providers: ProviderFactory;
  children?: any;
}

export default class ExtensionWithProviders extends React.Component<Props, null> {
  private renderWithProvider = (providers) => {
    const { extensionId, extensionData, children } = this.props;
    const { extensionProvider: extensionProviderPromise } = providers;
    return (
      <Extension
        extensionProviderPromise={extensionProviderPromise as Promise<ExtensionProvider>}
        extensionId={extensionId}
        extensionData={extensionData}
      >
        {children}
      </Extension>
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
