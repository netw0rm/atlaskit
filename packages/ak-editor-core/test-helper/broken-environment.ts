const getSelectionMissingFromShadowRoot =
    typeof document
        .createElement('div')
        .attachShadow({ mode: 'open' })
        .getSelection !== 'function';

export default getSelectionMissingFromShadowRoot;