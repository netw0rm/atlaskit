import { vdom } from 'skatejs';
import classNames from 'classnames';
import shadowStyles from './pf-profilecard-shadow.less';
const styles = shadowStyles.locals;

// eslint-disable-next-line max-len
const onlinePresenceIcon = () => (<svg width="100%" height="100%" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg"><g id="User---presence" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Available" fill="#48CC8C"><circle id="Oval-3-Copy-7" cx="4" cy="4" r="4"></circle></g></g></svg>);

// eslint-disable-next-line max-len
const busyPresenceIcon = () => (<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 8 8" style="enable-background:new 0 0 8 8;" ><g id="User---presence"><g id="Busy-light"><circle id="Combined-Shape-Copy-5" fill="#ED5451" cx="4" cy="4" r="4" /><path id="Rectangle" fill="#FFFFFF" d="M3.3,1.9l2.8,2.8c0.2,0.2,0.2,0.5,0,0.7L5.4,6.1c-0.2,0.2-0.5,0.2-0.7,0L1.9,3.3c-0.2-0.2-0.2-0.5,0-0.7l0.7-0.7C2.8,1.7,3.1,1.7,3.3,1.9z" /></g></g></svg>);

// eslint-disable-next-line max-len
const offlinePresenceIcon = () => (<svg width="100%" height="100%" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg"><g id="User---presence" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Unavailable"><g id="presence---offline"><path d="M4,8 C6.209139,8 8,6.209139 8,4 C8,1.790861 6.209139,0 4,0 C1.790861,0 0,1.790861 0,4 C0,6.209139 1.790861,8 4,8 Z M4,6 C5.1045695,6 6,5.1045695 6,4 C6,2.8954305 5.1045695,2 4,2 C2.8954305,2 2,2.8954305 2,4 C2,5.1045695 2.8954305,6 4,6 Z" id="Combined-Shape-Copy-14" fill="#6C798E"></path><path d="M4,6 C5.1045695,6 6,5.1045695 6,4 C6,2.8954305 5.1045695,2 4,2 C2.8954305,2 2,2.8954305 2,4 C2,5.1045695 2.8954305,6 4,6 Z" id="Combined-Shape-Copy-14" fill="#CFD4DB"></path></g></g></g></svg>);

// eslint-disable-next-line max-len
const iconLocation = () => (<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="timezone" fill="currentColor"><path d="M18,9 C18,5.6862915 15.3137085,3 12,3 C8.6862915,3 6,5.6862915 6,9 C6,9 5.50203689,12.9837024 11.9603214,20.9511073 C11.9721164,21.0004543 11.9854233,21.0182953 12.0003762,21.0004559 C12.0153291,21.0182953 12.028636,21.0004543 12.0404311,20.9511073 C18.4987155,12.9837024 18.0007524,9 18.0007524,9 L18,9 Z M12,12 C13.6568542,12 15,10.6568542 15,9 C15,7.34314575 13.6568542,6 12,6 C10.3431458,6 9,7.34314575 9,9 C9,10.6568542 10.3431458,12 12,12 Z" id="Combined-Shape"></path></g></g></svg>);

// eslint-disable-next-line max-len
const iconTime = () => (<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="time" fill="currentColor"><path d="M11.7460317,12.8888889 L11.5555556,12.8888889 L11.5555556,12.4938272 L11.5555556,6.17283951 L11.5555556,5.77777778 L12.4444444,5.77777778 L12.4444444,6.17283951 L12.4444444,12 L16.5079365,12 L16.8888889,12 L16.8888889,12.8888889 L16.5079365,12.8888889 L11.9365079,12.8888889 L11.7460317,12.8888889 Z M12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 Z" id="Combined-Shape"></path></g></g></svg>);

// eslint-disable-next-line max-len
const iconMention = () => (<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="24x24" fill="currentColor"><path d="M12.0012385,18.8592797 C9.55129441,18.8592797 7.37485517,17.6882661 6.00110342,15.8754216 C6.87387856,14.4584831 8.44104898,13.5135575 10.2254676,13.5135575 L13.7770094,13.5135575 C15.5633917,13.5135575 17.1290208,14.4599135 18.0011034,15.8757782 C16.6273365,17.6884197 14.451022,18.8592797 12.0012385,18.8592797 L12.0012385,18.8592797 Z M11.9397024,5 C13.6894035,5 15.1075378,6.41919024 15.1075378,8.16783536 C15.1075378,9.91753643 13.6894035,11.3356707 11.9397024,11.3356707 C10.1900013,11.3356707 8.77186703,9.91753643 8.77186703,8.16783536 C8.77186703,6.41919024 10.1900013,5 11.9397024,5 L11.9397024,5 Z" id="Combined-Shape"></path></g></g></svg>);

const icons = {
  location: iconLocation,
  time: iconTime,
  mention: iconMention,
  online: onlinePresenceIcon,
  busy: busyPresenceIcon,
  offline: offlinePresenceIcon,
};

export default (opt) => {
  const IconToDisplay = icons[opt.icon] || (() => null);

  const classes = classNames({
    [styles.pfCardIconLabel]: true,
    [opt.className]: opt.className,
  });

  return (
    <div className={classes}>
      <div className={styles.pfIcon}>
        {<IconToDisplay />}
      </div>
      <span>{opt.label}</span>
    </div>
  );
};
