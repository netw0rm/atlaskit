import { CommentTime } from '../../src/';

const now = new Date(2017, 6, 28, 16, 30, 10, 123);

const relativeTimes = [
  {
    description: "within the last 5 seconds should return 'just now'",
    match: /^just now$/,
    timestamp: new Date(2017, 6, 28, 16, 30, 7, 0),
  },
  {
    description: "exactly 5 seconds ago should return 'just now'",
    match: /^just now$/,
    timestamp: new Date(2017, 6, 28, 16, 30, 5, 123),
  },
  {
    description: "within the last minute should return 'a minute ago'",
    match: /^a minute ago$/,
    timestamp: new Date(2017, 6, 28, 16, 30, 0, 123),
  },
  {
    description: "one minute ago should return 'a minute ago'",
    match: /^a minute ago$/,
    timestamp: new Date(2017, 6, 28, 16, 29, 10, 0),
  },
  {
    description: "within the last hour should return 'X minutes ago",
    match: /^[0-9]{1,2} minutes? ago$/,
    timestamp: new Date(2017, 6, 28, 16, 15, 7, 0),
  },
  {
    description: "one hour ago should return '1 hour ago'",
    match: /1 hour ago/,
    timestamp: new Date(2017, 6, 28, 15, 30, 10, 0),
  },
  {
    description: "earlier today should return 'X hours ago'",
    match: /^[0-9]{1,2} hours? ago$/,
    timestamp: new Date(2017, 6, 28, 0, 1, 0, 0),
  },
  {
    description: "yesterday, within the last 24 hours should return 'yesterday'",
    match: /^yesterday$/,
    timestamp: new Date(2017, 6, 27, 23, 59, 0, 0),
  },
  {
    description: "more than 24 hours ago but still yesterday should return 'yesterday'",
    match: /^yesterday$/,
    timestamp: new Date(2017, 6, 27, 10, 30, 10, 123),
  },
  {
    description: "within the last week should return 'X days ago'",
    match: /^[0-9] days? ago$/,
    timestamp: new Date(2017, 6, 22, 16, 30, 10, 123),
  },
  {
    description: "one week ago should return '1 week ago'",
    match: /1 week ago/,
    timestamp: new Date(2017, 6, 21, 16, 30, 10, 0),
  },
];

const absoluteTimes = [
  Date(2017, 0, 1, 0, 0, 0, 0),
  Date(2017, 1, 1, 0, 0, 0, 0),
  Date(2017, 2, 1, 0, 0, 0, 0),
  Date(2017, 3, 1, 0, 0, 0, 0),
  Date(2017, 4, 1, 0, 0, 0, 0),
  Date(2017, 5, 1, 0, 0, 0, 0),
  Date(2017, 6, 1, 0, 0, 0, 0),
  Date(2017, 7, 1, 0, 0, 0, 0),
  Date(2017, 8, 1, 0, 0, 0, 0),
  Date(2017, 9, 1, 0, 0, 0, 0),
  Date(2017, 10, 1, 0, 0, 0, 0),
  Date(2017, 11, 1, 0, 0, 0, 0),
];

const absoluteTimeSpec = /^[0-9]{1,2} (Jan|Feb|Mar|Apr|May|June|July|Aug|Sept|Oct|Nov|Dec) [0-9]{4}$/;

describe(name, () => {
  describe('CommentTime', () => {
    describe('CommentTime.getRelativeTime', () => {
      relativeTimes.forEach(({ description, timestamp, match }) => {
        it(description, () => {
          expect(CommentTime.getRelativeTime(timestamp, now)).to.match(match);
        });
      });

      it('more than a week ago should return false (outside the range of relative dates)', () => (
        expect(
          CommentTime.getRelativeTime(new Date(2017, 6, 20, 16, 30, 10, 123), now)
        ).to.equal(false)
      ));
    });
    describe('CommentTime.getAbsoluteTime', () => {
      it('absolute date string should conform to the spec', () => (
        absoluteTimes.forEach(timestamp => (
          expect(CommentTime.getAbsoluteTime(timestamp)).to.match(absoluteTimeSpec)
        ))
      ));
    });
  });
});
