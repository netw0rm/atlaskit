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
    const pre = document.createElement('pre');
    pre.textContent = div.textContent;
    div.parentNode.insertBefore(pre, div);
    div.parentNode.removeChild(div);
  });

  // Convert mention containers, i.e.:
  //   <a href="/abodera/" rel="nofollow" title="@abodera" class="mention mention-me">Artur Bodera</a>
  Array.from(el.querySelectorAll('a.mention')).forEach((a: HTMLLinkElement) => {
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

    a.parentNode.insertBefore(span, a);
    a.parentNode.removeChild(a);
  });

  // Simplify <table>s into paragraphs
  Array.from(el.querySelectorAll('table')).forEach((table: HTMLTableElement) => {
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
      table.parentNode.insertBefore(p, table);
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
        table.parentNode.insertBefore(p, table);
      });
    }

    table.parentNode.removeChild(table);
  });

  // Parse emojis i.e.
  //     <img src="https://d301sr5gafysq2.cloudfront.net/207268dc597d/emoji/img/diamond_shape_with_a_dot_inside.svg" alt="diamond shape with a dot inside" title="diamond shape with a dot inside" class="emoji">
  Array.from(el.querySelectorAll('img.emoji')).forEach((img: HTMLImageElement) => {
    const src = img.getAttribute('src');
    const idMatch = !src ? false : src.match(/([^\/]+)\.[^\/]+$/);

    if (idMatch) {
      const span = document.createElement('span');
      span.setAttribute('editor-entity-type', 'emoji');
      span.setAttribute('editor-entity-id', idMatch[1]);
      span.setAttribute('contenteditable', 'false');
      img.parentNode.insertBefore(span, img);
    }

    img.parentNode.removeChild(img);
  });

  // Convert all automatic links to plain text, because they will be re-created on render by the server
  Array.from(el.querySelectorAll('a[rel="nofollow"]')).forEach((a: HTMLLinkElement) => {
    const text = document.createTextNode(a.innerText);
    a.parentNode.insertBefore(text, a);
    a.parentNode.removeChild(a);
  });

  return schema.parseDOM(el);
}
