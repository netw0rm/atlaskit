import 'skatejs-web-components';

// Workaround for https://bugs.webkit.org/show_bug.cgi?id=160331
function fixSafari() {
  let oldAttachShadow = HTMLElement.prototype.attachShadow;

  // We observe a shadow root, but only need to know if the target that was mutated is a <style>
  // element as this is the only scenario where styles aren't recalculated.
  const moOpts = { childList: true, subtree: true };
  const mo = new MutationObserver((muts) => {
    muts.forEach((mut) => {
      const { target } = mut;
      if (target.tagName === 'STYLE') {
        const nextSibling = target.nextSibling;
        const parent = target.parentNode;

        // We actually have to remove and subsequently re-insert rather than doing insertBefore()
        // as it seems that doesn't trigger a recalc.
        parent.removeChild(target);
        parent.insertBefore(target, nextSibling);
      }
    });
  });

  // Our override simply calls the native (or overridden) attachShadow but it ensures that changes
  // to it are observed so that we can take any <style> elements and re-insert them.
  function newAttachShadow(opts) {
    const sr = oldAttachShadow.call(this, opts);
    mo.observe(sr, moOpts);
    return sr;
  }

  // We have to define a property because Safari won't take the override if it is set directly.
  Object.defineProperty(HTMLElement.prototype, 'attachShadow', {
    // Ensure polyfills can override it (hoping they call it back).
    configurable: true,

    // Always return our version even if it's assigned directly. Some polyfills try to assign a
    // function directly to the property, so we have to make sure our fix isn't overridden.
    get() {
      return newAttachShadow;
    },

    // If a polyfill tries to override it, we store the override and call it instead of the
    // native one.
    set(val) {
      oldAttachShadow = val;
    },
  });
}

// We target a specific version of Safari instead of trying to but detect as it seems to involve
// contriving a breaking case and detecting computed styles. We can remove this code when Safari
// fixes the bug.
if (navigator.userAgent.indexOf('10.0 Safari') > -1) {
  fixSafari();
}
