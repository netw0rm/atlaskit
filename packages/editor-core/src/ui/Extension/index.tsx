import * as React from 'react';
import { Attributes as SchemaAttributes } from '../../schema/nodes/extension';

export interface ExtensionProvider {
  renderExtension: (extensionId: string, extensionData: { [key: string]: any }, children?: any) => JSX.Element | null;
}

interface Props extends SchemaAttributes {
  extensionProviderPromise?: Promise<ExtensionProvider>;
  children?: any;
}

interface State {
  extensionProvider: ExtensionProvider | null;
}

export default class Extension extends React.Component<Props, State> {
  state: State = {
    extensionProvider: null
  };

  componentWillMount() {
    this.updateExtensionProviderPromise(this.props.extensionProviderPromise);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.extensionProviderPromise !== this.props.extensionProviderPromise) {
      this.updateExtensionProviderPromise(nextProps.extensionProviderPromise);
    }
  }

  private updateExtensionProviderPromise(extensionProviderPromise?: Promise<ExtensionProvider>) {
    if (extensionProviderPromise) {
      extensionProviderPromise.then(extensionProvider => {
        this.setState({ extensionProvider });
      });
    } else {
      this.setState({ extensionProvider: null });
    }
  }

  render() {
    const { extensionProvider } = this.state;
    if (extensionProvider) {
      const { extensionId, extensionData, children } = this.props;
      return extensionProvider.renderExtension(extensionId, extensionData, children);
    }
    return null;
  }
}
