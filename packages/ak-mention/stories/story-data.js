import MentionResource from '../test/_mock-ak-mention-resource';
import PresenceResource from '../test/_mock-ak-presence-resource';
import { enableLogger } from '../src/util/logger';

enableLogger(true);

export const mentions = [
  {
    id: '666',
    avatarUrl: 'https://secure.gravatar.com/avatar/0eda4b603469d402e11e89a1dff51834?s=64',
    name: 'Craig Petchell',
    mentionName: 'petch',
    presence: {
      status: 'online',
      time: '11:57am',
    },
  },
  {
    id: '2234',
    avatarUrl: 'https://cdn-img.fimfiction.net/user/xb2v-1431833233-195398-64',
    name: 'Jack Sparrow',
    mentionName: 'captainjack',
    presence: {
      status: 'offline',
    },
  },
  {
    id: '55',
    avatarUrl: 'http://www.dystopianmovies.org/wp-content/uploads/malcolm-reynolds-serenity-nathon-fillion-64x64.jpg',
    name: 'Captain Mal',
    mentionName: 'captaintightpants',
    presence: {
      status: 'offline',
      time: '12:57pm',
    },
  },
  {
    id: '11',
    avatarUrl: 'http://66.media.tumblr.com/avatar_2072eeb45575_64.png',
    name: 'Doctor Who',
    mentionName: 'thedoctor',
    presence: {
      status: 'busy',
    },
  },
  {
    id: '27',
    avatarUrl: 'http://seatfleet.io/system/users/pictures/54a7/6630/7365/6111/ba00/0000/thumb/picard_s5hq_pbvariant.jpg?1420256904',
    name: 'Jean Luc Picard',
    mentionName: 'makeitso',
    presence: {
      status: 'none',
      time: '1:57am',
    },
  },
  {
    id: '1701',
    avatarUrl: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/ab/abee9ce4fbd1c9c94b695b16062b8fdf57a21de7_medium.jpg',
    name: 'James T. Kirk',
    mentionName: 'wheresmyshirt',
  },
  {
    id: '12312312',
    avatarUrl: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/cf/cf845e576741bd2db28c079b279c6a81dcc33666_medium.jpg',
    name: 'Dude with long name that doesn\'t seem to stop and should overflow',
    mentionName: 'Dudewithlongnamethatdoesn\'tseemtostopandshouldoverflow',
  },
  {
    id: '12312412',
    name: 'Dude with long name and time that doesn\'t seem to stop and should overflow',
    mentionName: 'Dudewithlongnamethatdoesn\'tseemtostopandshouldoverflowwithtime',
    presence: {
      time: '1:57pm',
    },
  },
];

export const slowResourceProvider = new MentionResource({
  minWait: 10,
  maxWait: 100,
});

export const resourceProvider = new MentionResource({
  minWait: 10,
  maxWait: 25,
});

export { PresenceResource as MockPresenceProvider };
