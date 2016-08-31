/* eslint-disable */
import { posFromDOM } from 'prosemirror/dist/edit/dompos';
import { FacadeInput } from './facade-input';

const attachFacadeInput = function(elem) {
  const initialValue = elem.getAttribute('editor-data');
  const facadeInput = new FacadeInput(elem, {
    initialValue: initialValue,
    classList: ['fabric-editor-mention-overlay', 'bb-mention-input']
  });

  // set initial value as inner text
  elem.innerText = initialValue;

  facadeInput.sync = (value) => {
    elem.setAttribute('editor-data', value);
    elem.innerText = value;
  }

  // add a mutation observer on mention-results and remove the input when results are hidden
  // FIXME: Currently this runs on any mutation, optimize this!
  const list = document.querySelectorAll('.bb-mention-input-results');
  const listObserver = new MutationObserver((records) => {
    const resultsListHidden = Array.prototype.every.call(list, (listElem) => {
      return listElem.getAttribute('aria-hidden') === "true" ||
             listElem.getAttribute('aria-expanded') === "false"
    });

    // results are hidden, lets remove the input field
    if (resultsListHidden) {
      facadeInput.shouldRemove = true;
    }
  });

  Array.prototype.forEach.call(list, (nodeFactory) => {
    listObserver.observe(nodeFactory, { attributes: true });
  });

  // observe attribute changes and sync its ProseMirror node.
  const elemObserver = new MutationObserver((records) => {
    const shouldUpdate = records.some((r) => {
      return r.attributeName === "editor-data";
    });
    if (shouldUpdate) {
      return updateEditor(elem, facadeInput.removed);
    }
  });
  elemObserver.observe(elem, { attributes: true });
}

var currentUser;
const renderEntity = function(elem) {
  const data = elem.getAttribute('editor-data');
  var renderedContent;
  if (data.startsWith('@')) {
    const username = data.substring(1);

    // this is pretty Bitbucket specific
    if (!currentUser) {
      currentUser = JSON.parse(document.body.getAttribute('data-current-user'));
    }
    const currentUserID = currentUser.id;
    const recentMentions = JSON.parse(window.localStorage.getItem(`recent-mentions:${currentUserID}`));

    const matchingMention = recentMentions.find((m) => m.username === username);

    const link = `/${username}`;
    const displayName = matchingMention ? matchingMention.display_name : username;

    // TODO: Add class to highlight me
    elem.innerHTML = `<a href="${link}" rel="nofollow" title="${username}" class="mention">${displayName}<a/>`;
    return;
  }

  const emojiMatch = data.match(/^\:([^\:]+)\:$/);
  if (emojiMatch && emojiMatch.length) {
    const emojiName = emojiMatch[1];
    const staticBaseURL = document.body.getAttribute('data-static-url');
    // FIXME look up if emoji exist in local storage
    const emojiURL = `${staticBaseURL}/emoji/img/${emojiName}.svg`;

    const altName = emojiName.split('_').join(' ');
    elem.innerHTML = `<img class="emoji" alt="${altName}" title="${altName}" src="${emojiURL}"/>`;
    return;
  }
}

const updateEditor = function(elem, facadeRemoved) {
  // get ProseMirror position for the DOM element
  const pos = posFromDOM(elem, parseInt(elem.getAttribute('pm-offset'), 10));
  const data = elem.getAttribute('editor-data');

  // remove the prose mirror node when the field is empty
    if (data === "") {
      pm.tr.delete(pos, pos+1).apply();
      pm.setTextSelection(pos);
      pm.focus();
      return;
    }

    // if there's a space right after the lead character (@ or :),
    // replace the entity node with the text.
    const followedByWhitespace = data.match(/^(@\s+|\:\s+)$/);
    if (followedByWhitespace && followedByWhitespace.length) {
      const replacementText = followedByWhitespace[0];
      pm.tr.replaceWith(pos, pos+1, pm.schema.text(replacementText)).apply();
      pm.setTextSelection(pos+replacementText.length);
      pm.focus();
      return;
    }

    // update the value of prosemirror node
    // FIXME: Do this as a transform
    const pmNode = pm.doc.nodeAt(pos);
    pmNode.attrs['data'] = data;

    if (facadeRemoved) {
      renderEntity(elem);

      // HACK to set space after the entity
      const textPos = pos+1;
      pm.tr.insertText(textPos, ' ').apply();
      pm.setTextSelection(textPos+1);
      pm.focus();
    }
}

export const nodeLifecycleHandler = function(pm) {
  // check if there are any editor elements to activate
  const wrapper = pm.wrapper;
  const nodes = wrapper.querySelectorAll('[editor-activate]');

  // return if there are no elements to activate
  if (!nodes.length) {
    return
  }

  Array.prototype.forEach.call(nodes, (nodeFactory) => {
    node.removeAttribute('editor-activate');

    // FIXME: refactor this to have a nice, reusable API
    const nodeType = nodeFactory.getAttribute('editor-node-type');
    if (nodeType === "entity") {
      const data = nodeFactory.getAttribute('editor-data');

      // if the first character of data attribute matches one of the lead characters.
      // attach the facade input,
      if (['@', ':'].indexOf(data) !== -1) {
        attachFacadeInput(nodeFactory);
      } else {
        renderEntity(nodeFactory);
      }
    }
  });
}
