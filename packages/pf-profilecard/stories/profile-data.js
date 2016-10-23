import sample from 'lodash.sample';
import avatar1 from 'file!./data/1.jpg';
import avatar2 from 'file!./data/2.jpg';
import avatar3 from 'file!./data/3.jpg';
import avatar4 from 'file!./data/4.jpg';
import avatar5 from 'file!./data/5.jpg';
import avatar6 from 'file!./data/6.jpg';

const avatarImages = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  '', // to test invalid img src
];

const getAvatar = () => sample(avatarImages);

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
