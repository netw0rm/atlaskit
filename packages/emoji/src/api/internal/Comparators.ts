import { EmojiDescription } from '../../types';
import { isEmojiVariationDescription } from '../../type-helpers';
import { ChainedEmojiComparator, EmojiComparator } from '../EmojiComparator';

const MAX_NUMBER = Number.MAX_VALUE ? Number.MAX_VALUE : 100000;  // chercking since IE doesn't have MAX_VALUE

/**
 * Create the default sort comparator to be used for the user queries against emoji
 *
 * @param query the query used in the search to be sorted. Any colons will be stripped from the query and it will be
 * converted to lowercase.
 * @param orderedIds the id of emoji ordered by how frequently they are used
 */
export function createFrequencyEmojiComparator(query?: string, orderedIds?: Array<string>): EmojiComparator {
  const textQuery = query ? query.replace(/:/g, '').toLowerCase().trim() : undefined;

  const comparators: EmojiComparator[] = [];

  if (query) {
    comparators.push(new AsciiMatchComparator(query));
  }

  // Build the comparators for the chain, in the correct order based on the parameters
  if (textQuery) {
    comparators.push(new ExactShortNameMatchComparator(textQuery));
  }

  if (orderedIds && orderedIds.length) {
    comparators.push(new UsageFrequencyComparator(orderedIds));
  }

  if (textQuery) {
    comparators.push(new QueryStringPositionMatchComparator(textQuery, 'shortName'), new QueryStringPositionMatchComparator(textQuery, 'name'));
  }

  comparators.push(OrderComparator.Instance, AlphabeticalShortnameComparator.Instance);

  return new ChainedEmojiComparator(...comparators);
}

/**
 * Orders two emoji such that if one of them has an ascii representation that exactly matches the query then it will
 * be ordered first.
 */
export class AsciiMatchComparator implements EmojiComparator {

  private query: string;

  constructor(query: string) {
    this.query = query;
  }

  compare(e1: EmojiDescription, e2: EmojiDescription) {
    const e1HasAscii = e1.ascii && e1.ascii.indexOf(this.query) !== -1;
    const e2HasAscii = e2.ascii && e2.ascii.indexOf(this.query) !== -1;

    if (e1HasAscii && !e2HasAscii) {
      return -1;
    } else if (!e1HasAscii && e2HasAscii) {
      return 1;
    }

    return 0;
  }
}

/**
 * Orders two emoji such that the one who's shortname matches the query exactly comes first.
 */
export class ExactShortNameMatchComparator implements EmojiComparator {

  private colonQuery: string;

  constructor(query: string) {
    this.colonQuery = `:${query}:`;
    // console.log(`PAC: ExactShortNameMatchComparator#constructor - colonQuery = ${this.colonQuery}`);
  }

  compare(e1: EmojiDescription, e2: EmojiDescription) {
    // console.log(`PAC: ExactShortNameMatchComparator#compare = e1.shortName = ${e1.shortName} and e2.shortName = ${e2.shortName}`);
    if (e1.shortName === this.colonQuery && e2.shortName === this.colonQuery) {
      return ExactShortNameMatchComparator.emojiTypeToOrdinal(e1) - ExactShortNameMatchComparator.emojiTypeToOrdinal(e2);
    } else if (e1.shortName === this.colonQuery) {
      return -1;
    } else if (e2.shortName === this.colonQuery) {
      return 1;
    }

    return 0;
  }

  /**
   * Returns a number for the type of emoji to ensure that site, comes before, atlassian,
   * comes before standard. If the type is unknown it is given a high number to ensure that emoji will be
   * orderered last.
   */
  private static emojiTypeToOrdinal(emoji: EmojiDescription): number {
    switch (emoji.type) {
      case 'SITE':
        return 0;
      case 'ATLASSIAN':
        return 1;
      case 'STANDARD':
        return 2;
      default:
        return 3;
    }
  }
}

/**
 * Order two emoji such as the one which is more frequently used comes first. If neither have any usage
 * information then leave their order unchanged.
 */
export class UsageFrequencyComparator implements EmojiComparator {

  // A Map of emoji base Id to their order in a least of most frequently used
  private positionLookup: Map<string,number>;

  constructor(orderedIds: Array<string>) {
    this.positionLookup = new Map();
    // Make ordering start from 1 to avoid having zero in the map (which is falsey)
    orderedIds.map((id, index) => this.positionLookup.set(id, index + 1));
  }

  compare(e1: EmojiDescription, e2: EmojiDescription) {
    if (!e1.id || !e2.id) {
      return 0; // this shouldn't occur. Leave position unchanged if there is any missing id.
    }

    let i1 = this.getPositionInOrder(e1);
    let i2 = this.getPositionInOrder(e2);

    return i1 - i2;
  }

  /**
   * Get the ordinal representing the position of this emoji.
   *
   * @param id the id of the emoji
   */
  private getPositionInOrder(emoji: EmojiDescription) {
    let id = emoji.id ? emoji.id : '0';
    if (isEmojiVariationDescription(emoji)) {
      id = emoji.baseId;
    }

    const position = this.positionLookup.get(id);
    if (position) {
      return position;
    } else {
      return MAX_NUMBER;
    }
  }
}

/**
 * A comparator that will sort higher an emoji which matches the query string earliest in the indicated
 * property.
 */
export class QueryStringPositionMatchComparator implements EmojiComparator {

  private propertyName: string;
  private query: string;

  /**
   * @param query the query to match
   * @param propertyToCompare the property of EmojiDescription to check for query within
   */
  constructor(query: string, propertyToCompare: string) {
    this.query = query;
    this.propertyName = propertyToCompare;
  }

  compare(e1: EmojiDescription, e2: EmojiDescription) {
    let i1 = e1[this.propertyName] ? e1[this.propertyName].indexOf(this.query) : MAX_NUMBER;
    let i2 = e2[this.propertyName] ? e2[this.propertyName].indexOf(this.query) : MAX_NUMBER;

    i1 = i1 === -1 ? MAX_NUMBER : i1;
    i2 = i2 === -1 ? MAX_NUMBER : i2;

    return i1 - i2;
  }
}

export class OrderComparator implements EmojiComparator {
  private static INSTANCE: OrderComparator;
  private constructor() {}

  public static get Instance()
  {
      return this.INSTANCE || (this.INSTANCE = new this());
  }

  compare(e1: EmojiDescription, e2: EmojiDescription) {
    let o1 = e1.order ? e1.order : MAX_NUMBER;
    let o2 = e2.order ? e2.order : MAX_NUMBER;

    return o1 - o2;
  }
}

export class AlphabeticalShortnameComparator implements EmojiComparator {
  private static INSTANCE: AlphabeticalShortnameComparator;
  private constructor() {}

  public static get Instance()
  {
      return this.INSTANCE || (this.INSTANCE = new this());
  }

  compare(e1: EmojiDescription, e2: EmojiDescription) {
    return e1.shortName.localeCompare(e2.shortName);
  }
}

