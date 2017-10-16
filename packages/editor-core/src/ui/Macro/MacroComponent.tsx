import * as React from 'react';
import { Component } from 'react';
import { MacroProvider } from '../../editor/plugins/macro/types';

export interface Props {
  macroProvider?: Promise<MacroProvider>;
  macroId: string;
  placeholderUrl: string;
}

export interface State {
  macroProvider?: MacroProvider;
}

export default class MacroComponent extends Component<Props, State> {
  state: State = {};

  constructor(props: Props) {
    super(props);
  }

  componentWillMount() {
    const { macroProvider } = this.props;

    if (macroProvider) {
      macroProvider.then(this.handleMacroProvider);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { macroProvider } = nextProps;

    if (this.props.macroProvider !== macroProvider) {
      if (macroProvider) {
        macroProvider.then(this.handleMacroProvider);
      } else {
        this.setState({ macroProvider });
      }
    }
  }

  render() {
    const { macroProvider } = this.state;
    const { macroId, placeholderUrl } = this.props;

    return (
      <span data-macro-id={macroId}>
        {macroProvider && <img src={`${macroProvider.config.placeholderBaseUrl}${placeholderUrl}`} />}
      </span>
    );
  }

  private handleMacroProvider = (macroProvider: MacroProvider) => {
    this.setState({ macroProvider });
  }
}
