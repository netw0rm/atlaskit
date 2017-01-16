export interface ParseSpecNodeContentTreatment {
  content?: boolean | DOMNode;
  preserveWhitespace?: boolean;
}

export type ParseSpec = { [attr: string]: string } | null
    | [{ [attr: string]: string } | null, ParseSpecNodeContentTreatment];

export function parseDOMInContext($context: ResolvedPos, dom: DOMNode, options?: { [key: string]: any }): Slice;
