function matchesSelector(e, selector) {
    const path = [...e.path];

    let item = null;
    let match = null;

    while (item = path.shift()) {
        if (item && item.matches && item.matches(selector)) {
            match = item;
            break;
        }
    }

    return match;
}

function eventDelegate(parent, eventName, selector, handler) {
    parent.addEventListener(eventName, function(e) {
        const target = matchesSelector(e, selector);

        if (target) {
            handler(target);
        }
    });
}

export function bindExpanderHandler() {
    const parent = document.querySelector('.wiki-content');
    const targetSelector = '.expand-control';

    eventDelegate(parent, 'click', targetSelector, (target) => {
        const expanderIcon = target.querySelector('.expand-control-icon');
        const expanderContent = target.parentElement.querySelector('.expand-content');
        const isClosed = expanderContent.classList.contains('expand-hidden');

        expanderContent.classList.toggle("expand-hidden");
        expanderIcon.classList.toggle("expanded");
    });
}

