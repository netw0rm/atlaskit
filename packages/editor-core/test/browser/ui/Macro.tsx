import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import ProviderFactory from '../../../src/providerFactory';
import Macro from '../../../src/ui/Macro';
import MacroComponent from '../../../src/ui/Macro/MacroComponent';

const macroId = 'd29cadc8-bf65-4f15-a1fa-1f31e646acd6';
const placeholderUrl = '/wiki/plugins/servlet/confluence/placeholder/macro?definition=e3N0YXR1czpzdWJ0bGU9dHJ1ZXxjb2xvdXI9R3JlZW58dGl0bGU9T0t9&locale=en_GB&version=2';

describe('@atlaskit/editor-core/ui/Macro', () => {
  it('should render macro component', () => {
    const macro = mount(<Macro macroId={macroId} placeholderUrl={placeholderUrl} />);
    const macroComponent = macro.find(MacroComponent);
    expect(macroComponent.prop('macroId')).to.equal(macroId);
    expect(macroComponent.prop('placeholderUrl')).to.equal(placeholderUrl);
    macro.unmount();
  });

  it('should pass macroProvider into MacroComponent', () => {
    const providerFactory = new ProviderFactory();
    const macroProvider = Promise.resolve({});
    providerFactory.setProvider('macroProvider', macroProvider);

    const macro = mount(<Macro macroId={macroId} placeholderUrl={placeholderUrl} providerFactory={providerFactory}/>);
    const macroComponent = macro.find(MacroComponent);

    expect(macroComponent.prop('macroProvider')).to.equal(macroProvider);
    macro.unmount();
  });

  it('should render placeholder image if macroProvider is set', () => {
    const providerFactory = new ProviderFactory();
    const macroProvider = Promise.resolve({});
    providerFactory.setProvider('macroProvider', macroProvider);

    const macro = mount(<Macro macroId={macroId} placeholderUrl={placeholderUrl} providerFactory={providerFactory}/>);
    expect(macro.find(`img[src*="${placeholderUrl}"]`)).to.have.length(0);
    macro.unmount();
  });
});
