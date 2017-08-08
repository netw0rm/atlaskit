import { EmojiDescription } from '../../types';
import { isEmojiVariationDescription } from '../../type-helpers';
import { ChainedEmojiComparator, EmojiComparator } from '../EmojiComparator';

const MAX_NUMBER = Number.MAX_VALUE ? Number.MAX_VALUE : 100000;  // IE doesn't have MAX_VALUE

export function createFrequencyEmojiComparator(query: string, asciiQuery: string, orderedIds: Array<string>): EmojiComparator {
  const comparators = [
    new ExactShortNameMatchComparator(query),
    new UsageFrequencyComparator(orderedIds),
    new QueryStringPositionMatchComparator(query, 'shortName'),
    new QueryStringPositionMatchComparator(query, 'name'),
    OrderComparator.Instance,
    AlphabeticalShortnameComparator.Instance
  ];

  if (asciiQuery) {
    comparators.unshift(new AsciiEmoticonMatchComparator(asciiQuery));
  }

  return new ChainedEmojiComparator(...comparators);
}

export function createQueryMatchEmojiComparator(query: string, asciiQuery?: string): EmojiComparator {
  const comparators =[
    new ExactShortNameMatchComparator(query),
    new QueryStringPositionMatchComparator(query, 'shortName'),
    new QueryStringPositionMatchComparator(query, 'name'),
    OrderComparator.Instance,
    AlphabeticalShortnameComparator.Instance
  ];

  if (asciiQuery) {
    comparators.unshift(new AsciiEmoticonMatchComparator(asciiQuery));
  }

  return new ChainedEmojiComparator(...comparators);
}

// TODO create a test to ensure that EmojiDescription have a property called shortName and name
// TODO unit test each of the comparators

/**
 * Order two emoji such that the one with an ascii representation that equals the query is ordered
 * higher. If neither (or both) emoji have a matching ascii representation then they are considered
 * equal (return zero).
 */
class AsciiEmoticonMatchComparator implements EmojiComparator {

  private query: string;

  constructor(query: string) {
    this.query = query;
  }

  compare(e1: EmojiDescription, e2: EmojiDescription) {
    let a1 = e1.ascii && e1.ascii.indexOf(this.query) !== -1;
    let a2 = e2.ascii && e2.ascii.indexOf(this.query) !== -1;

    if (a1 === a2) {
      return 0; // both emoji have ascii matches (doesn't actually occur) or neither have matches (likely :-) )
    }

    return a1 ? -1 : 1;
  }
}

/**
 * Orders two emoji such that the one who's shortname matches the query exactly comes first.
 */
class ExactShortNameMatchComparator implements EmojiComparator {

  private colonQuery: string;

  constructor(query: string) {
    this.colonQuery = `:${query}:`;
  }

  compare(e1: EmojiDescription, e2: EmojiDescription) {
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
class UsageFrequencyComparator implements EmojiComparator {

  // A Map of emoji base Id to their order in a least of most frequently used
  private positionLookup: Map<string,number>;

  constructor(orderedIds: Array<string>) {
    this.positionLookup = new Map();
    orderedIds.map((id, index) => this.positionLookup.set(id, index));
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
class QueryStringPositionMatchComparator implements EmojiComparator {

  private propertyName: string;
  private query: string;

  /**
   * @param query the query to match
   * @param propertyToCompare the property of EmojiDescription to check for query within
   */
  constructor(query: string, propertyToCompare: string) {
    this.propertyName = propertyToCompare;
    this.query = query;
  }

  compare(e1: EmojiDescription, e2: EmojiDescription) {
    const i1 = e1[this.propertyName] ? e1[this.propertyName].indexOf(this.query) : MAX_NUMBER;
    const i2 = e1[this.propertyName] ? e2[this.propertyName].indexOf(this.query) : MAX_NUMBER;

    // Order used for matching on same index and shorter queries with default value assigned on initialisation
    return i1 - i2;
  }
}

class OrderComparator implements EmojiComparator {
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

class AlphabeticalShortnameComparator implements EmojiComparator {
  private static INSTANCE: AlphabeticalShortnameComparator;
  private constructor() {}

  public static get Instance()
  {
      return this.INSTANCE || (this.INSTANCE = new this());
  }


  compare(e1: EmojiDescription, e2: EmojiDescription) {
    return e1.shortName.slice(0, -1).localeCompare(e2.shortName.slice(0, -1));
  }
}

