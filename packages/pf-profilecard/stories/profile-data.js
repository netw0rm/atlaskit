const avatar1 = require('file!./data/f1.jpg');
const avatar2 = require('file!./data/f2.jpg');
const avatar3 = require('file!./data/f3.jpg');
const avatar4 = require('file!./data/m1.jpg');
const avatar5 = require('file!./data/m2.jpg');
const avatar6 = require('file!./data/m3.jpg');

const avatarImages = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  '', // to test invalid img src
];

const getAvatar = () => avatarImages[Math.floor(Math.random() * 6)];

const profiles = [
  {
    avatarUrl: getAvatar(),
    fullname: 'Kramer Hatfield',
    nickname: 'khatfield',
    email: 'khatfield@gluid.com',
    location: 'Vienna, Austria',
    utcOffset: 120,
    role: 'Manager',
    presence: 'online',
  },
  {
    avatarUrl: getAvatar(),
    fullname: 'Schwartz Mclaughlin',
    nickname: 'smclaughlin',
    email: 'smclaughlin@corecom.com',
    location: 'Perth, Australia',
    utcOffset: 480,
    role: 'Senior Developer',
    presence: 'offline',
  },
  {
    avatarUrl: getAvatar(),
    fullname: 'Nichole Walter',
    nickname: 'nwalter',
    email: 'nwalter@limage.com',
    location: 'Sydney, Australia',
    utcOffset: 600,
    role: 'Senior Developer',
    presence: 'offline',
  },
  {
    avatarUrl: getAvatar(),
    fullname: 'Cleveland Rodriquez',
    nickname: 'crodriquez',
    email: 'crodriquez@slofast.com',
    location: 'Sydney, Australia',
    utcOffset: 600,
    role: 'Manager',
    presence: 'online',
  },
  {
    avatarUrl: getAvatar(),
    fullname: 'Rosalyn Franklin',
    nickname: 'rfranklin',
    email: 'rfranklin@assurity.com',
    location: 'London, England',
    utcOffset: 60,
    role: 'Manager',
    presence: 'offline',
  },
  {
    avatarUrl: getAvatar(),
    fullname: 'Hess Stone',
    nickname: 'hstone',
    email: 'hstone@hawkster.com',
    location: 'Sydney, Australia',
    utcOffset: 600,
    role: 'Designer',
    presence: 'busy',
  },
  {
    avatarUrl: getAvatar(),
    fullname: 'Lewis Cervantes',
    nickname: 'lcervantes',
    email: 'lcervantes@apextri.com',
    location: 'Perth, Australia',
    utcOffset: 480,
    role: 'Senior Developer',
    presence: 'online',
  },
  {
    avatarUrl: getAvatar(),
    fullname: 'Abbott Lamb',
    nickname: 'alamb',
    email: 'alamb@xeronk.com',
    location: 'Sydney, Australia',
    utcOffset: 600,
    role: 'Senior Developer',
    presence: 'busy',
  },
  {
    avatarUrl: getAvatar(),
    fullname: 'Conner Duncan',
    nickname: 'cduncan',
    email: 'cduncan@magmina.com',
    location: 'Hanover, Germany',
    utcOffset: 120,
    role: 'Head of Something',
    presence: 'offline',
  },
  {
    avatarUrl: getAvatar(),
    fullname: 'Bauer Burch',
    nickname: 'bburch',
    email: 'bburch@xleen.com',
    location: 'Austin, TX',
    utcOffset: -360,
    role: 'Senior Designer',
    presence: 'busy',
  },
  {
    avatarUrl: getAvatar(),
    fullname: 'Mcbride Haynes',
    nickname: 'mhaynes',
    email: 'mhaynes@geeky.com',
    location: 'London, England',
    utcOffset: 60,
    role: 'Senior Designer',
    presence: 'online',
  },
];

export default profiles;
