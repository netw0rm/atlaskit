const hasNativeShadowRoot = !!((document.createElement('div') as any).createShadowRoot instanceof Function);


function recursivelyQueryInShadowRoots(element: Element, selector: string): Node[] {
  const result:Node[] = [];

  result.push(...element.querySelectorAll(selector));
  [...element.querySelectorAll('[defined]')].forEach((child: any)=> {
    if (!child.shadowRoot || !child.shadowRoot.querySelectorAll) {
      return; // a shady component or a closed shadow root
    }

    result.push(...recursivelyQueryInShadowRoots(child.shadowRoot, selector));
  });

  return result;
}

/**
 * P.O.C.
 *
 * Native Shadow DOM piercing querySelectorAll() method that emulates
 * the >>> and /deep/ descendant combinators
 */
export default function querySelectorAll(selector: string): NodeList | Node[] {
  if (selector.indexOf('>>>') === -1) {
    return document.querySelectorAll(selector);
  }

  if (!hasNativeShadowRoot) {
    // If there's no native shadow root, then normal selectors will work just fine
    return document.querySelectorAll(selector.replace(/(>>>|\/deep\/|::?shadow)/, ''));
  }

  const result: Node[] = [];

  let [outsideSelector, insideSelector] = selector.split('>>>');
  [...document.querySelectorAll(outsideSelector)].forEach((node: Node) => {
    if (!(node instanceof Element)) {
      return; // We're ignoring non-Element nodes
    }

    result.push(...recursivelyQueryInShadowRoots(node as Element, insideSelector));

    // WIP: sub-splits
    // const selectorFragments = insideSelector.split(/\s+/);
    //
    // if (selectorFragments.length <= 1) {
    //   return;
    // }
    //
    // for (let x = 0; x < selectorFragments.length - 2; x++) {
    //
    // }
    //
    // insideSelector.querySelector()
  });

  return result;
}
