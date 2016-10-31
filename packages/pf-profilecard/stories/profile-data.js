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
    fullName: 'Kramer Hatfield',
    nickName: 'khatfield',
    email: 'khatfield@gluid.com',
    location: 'Vienna, Austria',
    meta: 'Manager',
    presence: 'online',
  },
  {
    avatarUrl: getAvatar(),
    fullName: 'Schwartz Mclaughlin',
    nickName: 'smclaughlin',
    email: 'smclaughlin@corecom.com',
    location: 'Perth, Australia',
    meta: 'Senior Developer',
    presence: 'offline',
  },
  {
    avatarUrl: getAvatar(),
    fullName: 'Nichole Walter',
    nickName: 'nwalter',
    email: 'nwalter@limage.com',
    location: 'Sydney, Australia',
    meta: 'Senior Developer',
    presence: 'offline',
  },
  {
    avatarUrl: getAvatar(),
    fullName: 'Cleveland Rodriquez',
    nickName: 'crodriquez',
    email: 'crodriquez@slofast.com',
    location: 'Sydney, Australia',
    meta: 'Manager',
    presence: 'online',
  },
  {
    avatarUrl: getAvatar(),
    fullName: 'Rosalyn Franklin',
    nickName: 'rfranklin',
    email: 'rfranklin@assurity.com',
    location: 'London, England',
    meta: 'Manager',
    presence: 'offline',
  },
  {
    avatarUrl: getAvatar(),
    fullName: 'Hess Stone',
    nickName: 'hstone',
    email: 'hstone@hawkster.com',
    location: 'Sydney, Australia',
    meta: 'Designer',
    presence: 'busy',
  },
  {
    avatarUrl: getAvatar(),
    fullName: 'Lewis Cervantes',
    nickName: 'lcervantes',
    email: 'lcervantes@apextri.com',
    location: 'Perth, Australia',
    meta: 'Senior Developer',
    presence: 'online',
  },
  {
    avatarUrl: getAvatar(),
    fullName: 'Abbott Lamb',
    nickName: 'alamb',
    email: 'alamb@xeronk.com',
    location: 'Sydney, Australia',
    meta: 'Senior Developer',
    presence: 'busy',
  },
  {
    avatarUrl: getAvatar(),
    fullName: 'Conner Duncan',
    nickName: 'cduncan',
    email: 'cduncan@magmina.com',
    location: 'Hanover, Germany',
    meta: 'Head of Something',
    presence: 'offline',
  },
  {
    avatarUrl: getAvatar(),
    fullName: 'Bauer Burch',
    nickName: 'bburch',
    email: 'bburch@xleen.com',
    location: 'Austin, TX',
    meta: 'Senior Designer',
    presence: 'busy',
  },
  {
    avatarUrl: getAvatar(),
    fullName: 'Mcbride Haynes',
    nickName: 'mhaynes',
    email: 'mhaynes@geeky.com',
    location: 'London, England',
    meta: 'Senior Designer',
    presence: 'online',
  },
];

export default profiles;
