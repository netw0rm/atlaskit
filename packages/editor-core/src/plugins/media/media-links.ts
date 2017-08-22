import { Context, MediaStateManager, MediaState } from '@atlaskit/media-core';
import {
  EditorView,
  AddMarkStep,
  ReplaceStep,
  Transaction,
  MarkType,
  Node as PMNode,
} from '../../prosemirror';
import { endPositionOfParent } from '../../utils';
import { posOfMediaGroupBelow, posOfParentMediaGroup } from './utils';
import { uuid } from '../utils';
import { unsupportedNodeTypesForMediaCards } from '../../schema/unsupported';
import analyticsService from '../../analytics/service';

export interface URLInfo {
  href: string;
  pos: number;
}

export async function appendLinkCards(
  view: EditorView,
  linkCreateContext: Context,
  collection: string
): Promise<PMNode> {
  const { schema, doc, tr } = view.state;
  const { marks: { link }  } = schema;
  const hrefs = new Array<string>();
  doc.descendants(node => {
    const linkMark = link.isInSet(node.marks);
    if (linkMark) {
      hrefs.push(linkMark.attrs.href);
    }
  });

  const linkNodes = (await Promise.all(hrefs.map(href => new Promise<PMNode | undefined>(resolve => {
    linkCreateContext.getUrlPreviewProvider(href).observable().subscribe(async (metadata) => {
      try {
        const publicId = await linkCreateContext.addLinkItem(href, collection, metadata);
        const linkNode = schema.nodes.media.createChecked({ id: publicId, type: 'link', collection });
        resolve(linkNode);
      } catch (error) {
        resolve(undefined);
      }
    }, () => resolve(undefined));
  })))).filter(node => !!node);

  if (linkNodes.length) {
    const mediaGroup = schema.nodes.mediaGroup.createChecked({}, linkNodes);
    return tr.insert(doc.nodeSize - 2, mediaGroup).doc;
  } else {
    return doc;
  }
}

export const insertLinks = async (
  view: EditorView,
  stateManager: MediaStateManager,
  handleMediaState: (state: MediaState) => void,
  linkRanges: Array<URLInfo>,
  linkCreateContext: Context,
  collection?: string
) : Promise<Array<string | undefined> | undefined> => {
  if (!linkRanges || linkRanges.length <= 0 || !collection) {
    return;
  }

  // Don't support media in unsupported node types (this can be removed when ED-2478 is done)
  const { state } = view;
  const { $to } = state.selection;
  if (unsupportedNodeTypesForMediaCards.has($to.parent.type.name)) {
    analyticsService.trackEvent('atlassian.editor.media.file.unsupported.node');
    return;
  }

  const trQueue = new Array<Transaction>();
  return Promise.all(
    linkRanges.map(({ href, pos }) => {
      return new Promise<string | undefined>(resolve => {
        const { state, dispatch } = view;
        const posAtTheEndOfDoc = state.doc.nodeSize - 4;

        const { tr } = state;
        const id = `temporary:${uuid()}:${href}`;
        const node = state.schema.nodes.media.create({ id, type: 'link', collection });
        stateManager.subscribe(id, handleMediaState);

        // If there's multiple replace steps, make sure subsequent transactions are mapped onto new positions
        trQueue.forEach(tr => pos = tr.mapping.map(pos));

        const $latestPos = tr.doc.resolve(pos > posAtTheEndOfDoc ? posAtTheEndOfDoc : pos);
        const insertPos = posOfMediaGroupBelow(state, $latestPos, false)
          || posOfParentMediaGroup(state, $latestPos, false)
          || endPositionOfParent($latestPos);

        // Insert an empty paragraph in case we've reached the end of the document
        if (insertPos === state.doc.nodeSize - 2) {
          tr.insert(insertPos, state.schema.nodes.paragraph.create());
        }

        tr.replaceWith(insertPos, insertPos, node);
        trQueue.push(tr);
        dispatch(tr);
        analyticsService.trackEvent('atlassian.editor.media.link');

        const updateStateWithError = error => stateManager.updateState(id, {
          id,
          status: 'error',
          error,
        }) || resolve();

        const isAppWithoutURL = metadata => metadata && metadata.resources && metadata.resources.app && !metadata.resources.app.url;

        // Unfurl URL using media API
        linkCreateContext.getUrlPreviewProvider(href).observable().subscribe(metadata => {
          // Workaround for problem with missing fields preventing Twitter links from working
          if(isAppWithoutURL(metadata))  {
            (metadata as any).resources.app.url = metadata.url;
          }
          linkCreateContext.addLinkItem(href, collection, metadata)
            .then(publicId =>
              stateManager.updateState(id, {
                id,
                publicId,
                status: 'unfinalized'
              }) || resolve(publicId)
            )
            .catch(updateStateWithError);
        }, updateStateWithError);
      });
    })
  );
};

export const detectLinkRangesInSteps = (tr: Transaction, link: MarkType, offset: number): Array<URLInfo> => {
  return tr.steps.reduce((linkRanges, step) => {
    let rangeWithUrls;
    if (step instanceof AddMarkStep) {
      rangeWithUrls = findRangesWithUrlsInAddMarkStep(step, link);
    } else if (step instanceof ReplaceStep) {
      rangeWithUrls = findRangesWithUrlsInReplaceStep(step, link, offset);
    }

    return linkRanges.concat(rangeWithUrls || []);
  }, []);
};

const findRangesWithUrlsInAddMarkStep = (step: AddMarkStep, link: MarkType): Array<URLInfo> | undefined => {
  const { mark } = step;

  if (link.isInSet([ mark ]) && mark.attrs.href) {
    return [{
      href: mark.attrs.href,
      pos: step.from,
    }];
  }
};

const findRangesWithUrlsInReplaceStep = (step: ReplaceStep, link: MarkType, offset: number): Array<URLInfo> | undefined => {
  const urls = new Array<URLInfo>();
  step.slice.content.descendants((child, pos, parent) => {
    const linkMark = link.isInSet(child.marks);

    if (linkMark && linkMark.attrs.href) {
      urls.push({
        href: linkMark.attrs.href,
        pos: pos + offset,
      });
    }
  });
  return urls;
};
