import schema from './schema';
import { Node } from 'ak-editor-prosemirror';

/**
 * This function reads markup rendered by Bitbucket server and converts it into markup that
 * can be consumed by Prosemirror HTML parser, conforming to our schema. Note that all
 * unsupported elements will be discarded after parsing.
 */
export default function(html: string): Node {
  const el = document.createElement('div');
  el.innerHTML = html;

  // Remove zero-width-non-joiner
  Array.from(el.querySelectorAll('p')).forEach((p: HTMLParagraphElement) => {
    const zwnj = /\u200c/g;
    if (p.textContent && zwnj.test(p.textContent)) {
      p.textContent = p.textContent.replace(zwnj, '');
    }
  });

  // Convert "codehilite" containers to <pre>
  Array.from(el.querySelectorAll('div.codehilite')).forEach((div: HTMLDivElement) => {
    const parent = div.parentNode as HTMLElement;
    const pre = document.createElement('pre');
    pre.textContent = div.textContent;
    parent.insertBefore(pre, div);
    parent.removeChild(div);
  });

  // Convert mention containers, i.e.:
  //   <a href="/abodera/" rel="nofollow" title="@abodera" class="mention mention-me">Artur Bodera</a>
  Array.from(el.querySelectorAll('a.mention')).forEach((a: HTMLLinkElement) => {
    const parent = a.parentNode as HTMLElement;
    const span = document.createElement('span');
    span.setAttribute('contenteditable', 'false');
    span.setAttribute('editor-mention-display-name', a.textContent ? a.textContent : '');
    span.setAttribute('editor-entity-type', 'mention');

    const title = a.getAttribute('title') || '';
    if (title) {
      const usernameMatch = title.match(/^@(.*?)$/);
      if (usernameMatch) {
        const username = usernameMatch[1];
        span.setAttribute('editor-entity-id', username);
      }
    }

    parent.insertBefore(span, a);
    parent.removeChild(a);
  });

  // Simplify <table>s into paragraphs
  Array.from(el.querySelectorAll('table')).forEach((table: HTMLTableElement) => {
    const parent = table.parentNode as HTMLElement;
    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');

    // Convert <thead> into a paragraph of bold, comma-separated phrases.
    if (thead) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');

      strong.innerText = Array.from(thead.querySelectorAll('th'))
        .map((th) => th.innerText)
        .filter((v) => (!!v))   // skip zombie cells
        .join(', ')
      ;
      p.appendChild(strong);
      parent.insertBefore(p, table);
    }

    // Convert <tr> into a paragraphs of comma-separated phrases.
    if (tbody) {
      Array.from(tbody.querySelectorAll('tr')).forEach((tr: HTMLTableRowElement) => {
        const p = document.createElement('p');
        p.innerText = Array.from(tr.querySelectorAll('td'))
          .map((td) => td.innerText)
          .filter((v) => (!!v))   // skip zombie cells
          .join(', ')
        ;
        parent.insertBefore(p, table);
      });
    }

    parent.removeChild(table);
  });

  // Parse emojis i.e.
  //     <img src="https://d301sr5gafysq2.cloudfront.net/207268dc597d/emoji/img/diamond_shape_with_a_dot_inside.svg" alt="diamond shape with a dot inside" title="diamond shape with a dot inside" class="emoji">
  Array.from(el.querySelectorAll('img.emoji')).forEach((img: HTMLImageElement) => {
    const parent = img.parentNode as HTMLElement;
    const src = img.getAttribute('src');
    const idMatch = !src ? false : src.match(/([^\/]+)\.[^\/]+$/);

    if (idMatch) {
      const span = document.createElement('span');
      span.setAttribute('editor-entity-type', 'emoji');
      span.setAttribute('editor-entity-id', idMatch[1]);
      span.setAttribute('contenteditable', 'false');
      parent.insertBefore(span, img);
    }

    parent.removeChild(img);
  });

  // Convert all automatic links to plain text, because they will be re-created on render by the server
  Array.from(el.querySelectorAll('a[rel="nofollow"]')).forEach((a: HTMLLinkElement) => {
    const parent = a.parentNode as HTMLElement;
    const text = document.createTextNode(a.innerText);
    parent.insertBefore(text, a);
    parent.removeChild(a);
  });

  return schema.parseDOM(el);
}
