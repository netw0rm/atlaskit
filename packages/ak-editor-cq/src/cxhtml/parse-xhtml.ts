/// <reference path="./collapse-whitespace.d.ts" />
import collapse from 'collapse-whitespace';

export default function(xhtml: string): Document {
  const nsHtml = `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ac="http://example.com/ac" xmlns:ri="http://example.com/ri"><body>${stripCDATA(xhtml)}</body></html>`;
  const tree = new DOMParser().parseFromString(nsHtml, 'application/xhtml+xml')
  collapse(tree.documentElement, isBlock)
  return tree
}

function isBlock(node: Node) {
  // these blocks are mainly used to collapse whitespace between the blocks
  // (preventing spurious text nodes of ' ')
  switch (node.nodeName.toUpperCase()) {
    case "ADDRESS":
    case "ARTICLE":
    case "ASIDE":
    case "AUDIO":
    case "BLOCKQUOTE":
    case "BODY":
    case "CANVAS":
    case "CENTER":
    case "DD":
    case "DIR":
    case "DIV":
    case "DL":
    case "DT":
    case "FIELDSET":
    case "FIGCAPTION":
    case "FIGURE":
    case "FOOTER":
    case "FORM":
    case "FRAMESET":
    case "H1":
    case "H2":
    case "H3":
    case "H4":
    case "H5":
    case "H6":
    case "HEADER":
    case "HGROUP":
    case "HR":
    case "HTML":
    case "ISINDEX":
    case "LI":
    case "MAIN":
    case "MENU":
    case "NAV":
    case "NOFRAMES":
    case "NOSCRIPT":
    case "OL":
    case "OUTPUT":
    case "P":
    case "PRE":
    case "SECTION":
    case "TABLE":
    case "TBODY":
    case "TD":
    case "TFOOT":
    case "TH":
    case "THEAD":
    case "TR":
    case "UL":
    case "AC:IMAGE":
    case "AC:LINK":
    case "AC:MACRO":
    case "AC:STRUCTURED-MACRO":
    case "AC:PLAIN-TEXT-BODY":
    case "AC:RICH-TEXT-BODY":
    case "AC:PARAMETER":
    case "AC:TASK-LIST":
    case "AC:TASK":
    case "AC:TASK-BODY":
    case "AC:TASK-ID":
    case "AC:TASK-STATUS":
    case "AC:LAYOUT":
    case "AC:LAYOUT-SECTION":
    case "AC:LAYOUT-CELL":
    case "RI:USER":
    case "RI:PAGE":
    case "RI:URL":
    case "RI:ATTACHMENT":
      return true;
  }
  return false;
}

/**
 * Inline CDATA sections by HTML encoding them.
 */
function stripCDATA(content: string): string {
	var contentFragments = content.split(/(<!\[CDATA\[(.*?)\]\]>)/g);
	if (contentFragments.length <= 1) { // no CDATA, no need to fix
		return content;
	}

	var fixed = '';
	for (var i = 0; i < contentFragments.length; i++) {
		var fragment = contentFragments[i];
		if (fragment.substring(0, 9) === '<![CDATA[') {
			i++;
			fixed += htmlEscape(contentFragments[i]); // the next fragment is the one we want now
			continue;
		}
		fixed += fragment;
	}

	return fixed;
}

function htmlEscape(string: string): string {
  const div = document.createElement('div');
  div.innerText = string;
  return div.innerHTML;
}
