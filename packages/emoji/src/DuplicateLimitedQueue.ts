/**
 * The options used to configure a newly constructed queue.
 */
export interface QueueOptions {

  /**
   * The maximum number of duplicates allowed per item in the queue.
   */
  maxDuplicates: number;

  /**
   * The minimum number of unique items the queue should try to contain.
   * This number constrains the absolute size of the queue. It needs to be
   * large enough to contain maxDuplicates * minUniqueItems.
   */
  minUniqueItems: number;
}

/**
 * A queue which will limit the number of duplicates that it holds. When the duplicate limit is reached
 * the earliest inserted duplicate (the "original") is removed to make room for the new insertion.
 */
export default class DuplicateLimitedQueue {

  private maximumSize: number;
  private perItemSize: number;

  private items: Array<string>;
  private itemCountMap: Map<string, number>;

  /**
   * An array derived from items and itemCountMap which holds each item once and is ordered by
   * how often an item is duplicated in the items array.
   */
  private itemsOrderedByFrequency: Array<string>;

  /**
   * Construct a new DuplicateLimitedQueue.
   *
   * @param options the options for this queue.
   */
  constructor(options: QueueOptions) {
    if (options.maxDuplicates < 1) {
      throw new RangeError('The maxDuplicates option must be at least 1');
    }

    if (options.minUniqueItems < 1) {
      throw new RangeError('The minUniqueItems option must be at least 1');
    }

    this.maximumSize = options.maxDuplicates * options.minUniqueItems;
    this.perItemSize = options.maxDuplicates;

    this.items = new Array<string>();
    this.itemCountMap = new Map<string, number>();
    this.itemsOrderedByFrequency = new Array<string>();
  }

  /**
   * @param item the item to add to the queue.
   */
  enqueue(item: string): void {
    const count = this.itemCountMap.get(item);
    if (count && count >= this.perItemSize) {
      // find the first item with that key in the array and remove it
      this.removeFirstOccurrence(item);
    } else {
      if (this.items.length >= this.maximumSize) {
        this.remove();
      }
    }

    this.add(item);

    // enqueues are less time sensitive (and may happen less frequently) than queries against the queue
    // so do the ordering work on each enqueue.
    this.itemsOrderedByFrequency = this.orderItemsByFrequency();
  }

  /**
   * Return the items in the queue, ordered by how often they are duplicated. The items with the
   * most duplicates come first in the returned Array.
   *
   * If there are no items in the queue then an empty Array will be returned.
   */
  getItemsOrderedByDuplicateCount(): Array<string> {
    return this.itemsOrderedByFrequency;
  }

  /**
   * Get an array of items from the queue ordered by how often they are duplicated in the queue.
   */
  private orderItemsByFrequency(): Array<string> {
    const orderedEntries = Array.from(this.itemCountMap.entries())
      .sort((a: [string, number], b: [string, number]) => {
        return b[1] - a[1];
    });

    return orderedEntries.map((value: [string, number]) => value[0]);
  }

  private decrementCount(item: string): void {
    let count = this.itemCountMap.get(item);
    if (count) {
      count--;
      if (count > 0) {
        this.itemCountMap.set(item, count);
      } else {
        this.itemCountMap.delete(item);
      }
    }
  }

  /**
   * Walk the list of items and remove the first occurrence of the matching item.
   *
   * @param item the item to be removed.
   */
  private removeFirstOccurrence(item: string) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.decrementCount(item);
    }
  }

  /**
   * Remove the first item from the queue and update the itemCountMap accordingly.
   * @return the item add the front of the queue or undefined if the queue is empty
   */
  private remove(): string | undefined {
    const removed = this.items.shift();
    if (removed !== undefined) {
      this.decrementCount(removed);
    }

    return removed;
  }

  /**
   * Add the supplied item to the end of the queue and update the itemCountMap accordingly.
   * @param item the item to be added to the queue
   */
  private add(item: string): void {
    this.items.push(item);
    const count = this.itemCountMap.get(item);
    if (count) {
        this.itemCountMap.set(item, count + 1);
    } else {
      this.itemCountMap.set(item, 1);
    }
  }
}
