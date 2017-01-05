import schema from './schema';
import { Node } from 'ak-editor-core';
import arrayFrom from './util/array-from';

/**
 * This function reads markup rendered by Bitbucket server and converts it into markup that
 * can be consumed by Prosemirror HTML parser, conforming to our schema. Note that all
 * unsupported elements will be discarded after parsing.
 */
export default function(html: string): Node {
  const el = document.createElement('div');
  el.innerHTML = html;

  // Remove zero-width-non-joiner
  arrayFrom(el.querySelectorAll('p')).forEach((p: HTMLParagraphElement) => {
    const zwnj = /\u200c/g;
    if (p.textContent && zwnj.test(p.textContent)) {
      p.textContent = p.textContent.replace(zwnj, '');
    }
  });

  // Convert "codehilite" containers to <pre>
  arrayFrom(el.querySelectorAll('div.codehilite')).forEach((div: HTMLDivElement) => {
    const parent = div.parentNode as HTMLElement;
    const pre = document.createElement('pre');
    pre.textContent = div.textContent;
    parent.insertBefore(pre, div);
    parent.removeChild(div);
  });

  // Convert mention containers, i.e.:
  //   <a href="/abodera/" rel="nofollow" title="@abodera" class="mention mention-me">Artur Bodera</a>
  arrayFrom(el.querySelectorAll('a.mention')).forEach((a: HTMLLinkElement) => {
    const span = document.createElement('span');
    span.setAttribute('class', 'editor-entity-mention');
    span.setAttribute('contenteditable', 'false');

    const title = a.getAttribute('title') || '';
    if (title) {
      const usernameMatch = title.match(/^@(.*?)$/);
      if (usernameMatch) {
        const username = usernameMatch[1];
        span.setAttribute('mention-id', username);
      }
    }

    span.textContent = a.textContent;

    a.parentNode!.insertBefore(span, a);
    a.parentNode!.removeChild(a);
  });

  // Simplify <table>s into paragraphs
  arrayFrom(el.querySelectorAll('table')).forEach((table: HTMLTableElement) => {
    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');

    // Convert <thead> into a paragraph of bold, comma-separated phrases.
    if (thead) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');

      strong.innerText = arrayFrom(thead.querySelectorAll('th'))
        .map((th) => th.innerText)
        .filter((v) => (!!v))   // skip zombie cells
        .join(', ')
      ;
      p.appendChild(strong);
      table.parentNode!.insertBefore(p, table);
    }

    // Convert <tr> into a paragraphs of comma-separated phrases.
    if (tbody) {
      arrayFrom(tbody.querySelectorAll('tr')).forEach((tr: HTMLTableRowElement) => {
        const p = document.createElement('p');
        p.innerText = arrayFrom(tr.querySelectorAll('td'))
          .map((td) => td.innerText)
          .filter((v) => (!!v))   // skip zombie cells
          .join(', ')
        ;
        table.parentNode!.insertBefore(p, table);
      });
    }

    table.parentNode!.removeChild(table);
  });

  // Parse emojis i.e.
  //     <img src="https://d301sr5gafysq2.cloudfront.net/207268dc597d/emoji/img/diamond_shape_with_a_dot_inside.svg" alt="diamond shape with a dot inside" title="diamond shape with a dot inside" class="emoji">
  arrayFrom(el.querySelectorAll('img.emoji')).forEach((img: HTMLImageElement) => {
    const src = img.getAttribute('src');
    const idMatch = !src ? false : src.match(/([^\/]+)\.[^\/]+$/);

    if (idMatch) {
      const emoji = document.createTextNode(`:${decodeURIComponent(idMatch[1])}:`);
      img.parentNode!.insertBefore(emoji, img);
    }

    img.parentNode!.removeChild(img);
  });

  // Convert all automatic links to plain text, because they will be re-created on render by the server
  arrayFrom(el.querySelectorAll('a[rel="nofollow"]')).forEach((a: HTMLLinkElement) => {
    const text = document.createTextNode(a.innerText);
    a.parentNode!.insertBefore(text, a);
    a.parentNode!.removeChild(a);
  });

  return schema.parseDOM(el);
}
