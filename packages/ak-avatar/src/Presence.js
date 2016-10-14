import { vdom } from 'skatejs';

// TODO move this to ak-icon
// eslint-disable-next-line max-len
const onlinePresenceIcon = () => (<svg width="100%" height="100%" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg"><g id="User---presence" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Available" fill="#48CC8C"><circle id="Oval-3-Copy-7" cx="4" cy="4" r="4" /></g></g></svg>);

// TODO move this to ak-icon
// eslint-disable-next-line max-len, react/style-prop-object
const busyPresenceIcon = () => (<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 8 8" style="enable-background:new 0 0 8 8;" ><g id="User---presence"><g id="Busy-light"><circle id="Combined-Shape-Copy-5" fill="#ED5451" cx="4" cy="4" r="4" /><path id="Rectangle" fill="#FFFFFF" d="M3.3,1.9l2.8,2.8c0.2,0.2,0.2,0.5,0,0.7L5.4,6.1c-0.2,0.2-0.5,0.2-0.7,0L1.9,3.3c-0.2-0.2-0.2-0.5,0-0.7l0.7-0.7C2.8,1.7,3.1,1.7,3.3,1.9z" /></g></g></svg>);

// TODO move this to ak-icon
// eslint-disable-next-line max-len
const offlinePresenceIcon = () => (<svg width="100%" height="100%" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg"><g id="User---presence" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Unavailable"><g id="presence---offline"><path d="M4,8 C6.209139,8 8,6.209139 8,4 C8,1.790861 6.209139,0 4,0 C1.790861,0 0,1.790861 0,4 C0,6.209139 1.790861,8 4,8 Z M4,6 C5.1045695,6 6,5.1045695 6,4 C6,2.8954305 5.1045695,2 4,2 C2.8954305,2 2,2.8954305 2,4 C2,5.1045695 2.8954305,6 4,6 Z" id="Combined-Shape-Copy-14" fill="#6C798E" /><path d="M4,6 C5.1045695,6 6,5.1045695 6,4 C6,2.8954305 5.1045695,2 4,2 C2.8954305,2 2,2.8954305 2,4 C2,5.1045695 2.8954305,6 4,6 Z" id="Combined-Shape-Copy-14" fill="#CFD4DB" /></g></g></g></svg>);

// TODO add @enum JSDoc here
const presences = {
  online: onlinePresenceIcon,
  busy: busyPresenceIcon,
  offline: offlinePresenceIcon,
};

/* eslint-disable react/prop-types */
export default (props) => {
  const PresenceToDisplay = presences[props.presence] || (() => null);

  return (<PresenceToDisplay />);
};
