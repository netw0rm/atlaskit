import { Context } from '@atlaskit/media-core';
import {
  atTheEndOfDoc,
  endPositionOfParent
} from '../../utils';
import {
  EditorView,
  AddMarkStep,
  ReplaceStep,
  Transaction,
  Fragment,
  MarkType,
} from '../../prosemirror';
import { posOfMediaGroupBelow, posOfParentMediaGroup } from './utils';
import { normalizeUrl } from '../hyperlink/utils';

export interface RangeWithUrls {
  start: number;
  end: number;
  urls: string[];
}

export const insertLinks = async (view: EditorView, linkRanges: RangeWithUrls[], linkCreateContext: Context, collection?: string): Promise<Array<string> | undefined> => {
  return new Promise<Array<string> | undefined>((resolve, reject) => {
    if (linkRanges.length <= 0 || !collection) {
      return resolve();
    }

    const { state } = view;
    const trQueue: Array<Transaction> = [];
    const links = mapLinksInfo(state, linkRanges);

    let queueSize = 0;
    let linkIds: Array<string> = [];
    const resolveWhenFinished = () => --queueSize === 0 && resolve(linkIds);

    links.forEach(({ urls, pos }) => {
      urls.map(url => {
        // TODO: Remove the following line once we've solved https://product-fabric.atlassian.net/browse/ED-2321
        url = normalizeUrl(url);

        queueSize++;

        try {
          const observable = linkCreateContext.getUrlPreviewProvider(url).observable();
          observable.subscribe(
            metadata => {
              linkCreateContext.addLinkItem(url, collection, metadata).then(id => {
                const { state, dispatch } = view;
                const { tr } = state;
                const node = state.schema.nodes.media.create({ id, type: 'link', collection });

                // If there's multiple replace steps, make sure subsequent transactions are mapped onto new positions
                trQueue.forEach(tr => {
                  pos = tr.mapping.map(pos);
                });

                const $latestPos = tr.doc.resolve(pos);
                const insertPos = posOfMediaGroupBelow(state, $latestPos, false)
                  || posOfParentMediaGroup(state, $latestPos, false)
                  || endPositionOfParent($latestPos);

                // insert an empty paragraph in case we've reached the end of the document
                if (atTheEndOfDoc(state)) {
                  tr.insert(insertPos, state.schema.nodes.paragraph.create());
                }

                tr.replaceWith(insertPos, insertPos, node);
                trQueue.push(tr);
                dispatch(tr);
                linkIds.push(id);
                resolveWhenFinished();
              }).catch(() => {
                resolveWhenFinished();
              });
            },
            e => {
              resolveWhenFinished();
            }
          );
        } catch(e) {
          resolveWhenFinished();
        }
      });
    });
  });
};

export const detectLinkRangesInSteps = (tr: Transaction, link: MarkType): RangeWithUrls[] => {
  const linkRanges: RangeWithUrls[] = [];

  tr.steps.forEach((step) => {
    let rangeWithUrls;
    if (step instanceof AddMarkStep) {
      rangeWithUrls = findRangesWithUrlsInAddMarkStep(step, link);
    } else if (step instanceof ReplaceStep) {
      rangeWithUrls = findRangesWithUrlsInReplaceStep(step, link);
    }

    if (rangeWithUrls) {
      linkRanges.push(rangeWithUrls);
    }
  });

  return linkRanges;
};

const mapLinksInfo = (state, linkRanges: RangeWithUrls[]): Array<{ pos: number, urls: string[] }> => {
  const posAtTheEndOfDoc = state.doc.nodeSize - 4;

  return linkRanges.map(rangeWithUrls => ({
    urls: rangeWithUrls.urls,
    pos: posAtTheEndOfDoc < rangeWithUrls.end ? posAtTheEndOfDoc : rangeWithUrls.end
  }));
};

const findRangesWithUrlsInAddMarkStep = (step: AddMarkStep, link: MarkType): RangeWithUrls | undefined => {
  const { mark } = step;

  if (link.isInSet([ mark ]) && mark.attrs.href) {
    return { start: step.from, end: step.to, urls: [mark.attrs.href] };
  }
};

const findRangesWithUrlsInReplaceStep = (step: ReplaceStep, link: MarkType): RangeWithUrls | undefined => {
  const { slice } = step;
  const urls: string[] = findLinksInNodeContent([], slice.content, link);

  if (urls.length > 0) {
    return {
      start: step.from,
      end:   step.from + slice.size,
      urls
    };
  }
};

const findLinksInNodeContent = (urls: string[], content: Fragment, link: MarkType) => {
  content.forEach((child) => {
    const linkMark = link.isInSet(child.marks);

    if (linkMark && linkMark.attrs.href) {
      urls.push(linkMark.attrs.href);
    }

    findLinksInNodeContent(urls, child.content, link);
  });

  return urls;
};
