import { ProseMirror, Schema, Node, posFromDOM } from 'ak-editor-prosemirror';
import FacadeInput from 'ak-editor-facade-input';

export const attachFacadeInput = (elem: HTMLElement, pm: ProseMirror) => {
  const initialValue = '@';
  elem.innerText = initialValue;

  const facadeInput = new FacadeInput(elem, {
    initialValue: initialValue,
    classList: ['fabric-editor-mention-overlay', 'bb-mention-input']
  });

  this.mentionsTypeaheadCompleted(() => facadeInput.markForRemoval());

  facadeInput.onSync = (value, willRemove) => {
    if (willRemove) {
      const offset = elem.getAttribute('pm-offset');
      if (offset && offset.length) {
        const pos = posFromDOM(elem, parseInt(offset, 10)).pos;
        const node = pm.schema.node('mention', { id: value });
        pm.tr.replaceWith(pos, pos+1, node).apply();
        pm.setTextSelection(pos+1);
        pm.focus();
      }
      return;
    }

    // When the value is empty, remove the mention node and facade input.
    if (value === '') {
      const offset = elem.getAttribute('pm-offset');
      if (offset && offset.length) {
        const pos = posFromDOM(elem, parseInt(offset, 10)).pos;
        pm.tr.delete(pos, pos+1).apply();
        facadeInput.markForRemoval();
        pm.focus();
        return;
      }
    }

    // When @ symbol is followed by a space remove the facade input
    if (value.match(/^@\s+/)) {
      const offset = elem.getAttribute('pm-offset');
      if (offset && offset.length) {
        const pos = posFromDOM(elem, parseInt(offset, 10)).pos;
        const node = pm.schema.text(value);
        pm.tr.replaceWith(pos, pos+1, node).apply();
        facadeInput.markForRemoval();
        pm.focus();
        return;
      }
    }
  };
}

export const renderMention = (elem: HTMLElement, pm: ProseMirror) => {
  const entityId = elem.getAttribute('editor-entity-id');
  if (!entityId || !entityId.length) {
    return
  }

  const username = (entityId as string).substring(1).trim(); // remove the @ symbol and trailing whitespace
  const matchingMention = this.getMentionsList().find((m: any) => m.username === username);

  if (matchingMention) {
    const link = `/${username}`;
    const displayName = matchingMention.display_name;
    const styles = `
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 3px;
      background-color: #f5f5f5;
      color: #3572b0;
      padding: 0 3px;
    `;
    elem.innerHTML = `<a href="${link}" target="_blank" style="${styles}" rel="nofollow" title="${username}" class="mention">${displayName}</a>`;
  } else {
    const offset = elem.getAttribute('pm-offset');
    if (offset && offset.length) {
      const pos = posFromDOM(elem, parseInt(offset, 10)).pos;
      const node = pm.schema.text(entityId);
      pm.tr.replaceWith(pos, pos+1, node).apply();
    }
  }
}
