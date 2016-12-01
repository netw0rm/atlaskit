import React from 'react';

// TODO add @enum JSDoc here
export default {
  available: () => (<svg width="100%" height="100%" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g fill="#48CC8C"><circle cx="4" cy="4" r="4" /></g></g></svg>),

  // TODO move this to ak-icon
  // eslint-disable-next-line max-len, react/style-prop-object
  busy: () => (<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 8 8" style={{ enableBackground: 'new 0 0 8 8' }}><g id="User---presence"><g id="Busy-light"><circle fill="#ED5451" cx="4" cy="4" r="4" /><path fill="#FFFFFF" d="M3.3,1.9l2.8,2.8c0.2,0.2,0.2,0.5,0,0.7L5.4,6.1c-0.2,0.2-0.5,0.2-0.7,0L1.9,3.3c-0.2-0.2-0.2-0.5,0-0.7l0.7-0.7C2.8,1.7,3.1,1.7,3.3,1.9z" /></g></g></svg>),

  // TODO move this to ak-icon
  // eslint-disable-next-line max-len
  unavailable: () => (<svg width="100%" height="100%" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="Unavailable"><g id="presence---offline"><path d="M4,8 C6.209139,8 8,6.209139 8,4 C8,1.790861 6.209139,0 4,0 C1.790861,0 0,1.790861 0,4 C0,6.209139 1.790861,8 4,8 Z M4,6 C5.1045695,6 6,5.1045695 6,4 C6,2.8954305 5.1045695,2 4,2 C2.8954305,2 2,2.8954305 2,4 C2,5.1045695 2.8954305,6 4,6 Z" fill="#6C798E" /><path d="M4,6 C5.1045695,6 6,5.1045695 6,4 C6,2.8954305 5.1045695,2 4,2 C2.8954305,2 2,2.8954305 2,4 C2,5.1045695 2.8954305,6 4,6 Z" fill="#CFD4DB" /></g></g></g></svg>),

  // TODO move this into ak-icon
  // eslint-disable-next-line max-len, react/self-closing-comp
  location: () => (<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g fill="currentColor"><path d="M18,9 C18,5.6862915 15.3137085,3 12,3 C8.6862915,3 6,5.6862915 6,9 C6,9 5.50203689,12.9837024 11.9603214,20.9511073 C11.9721164,21.0004543 11.9854233,21.0182953 12.0003762,21.0004559 C12.0153291,21.0182953 12.028636,21.0004543 12.0404311,20.9511073 C18.4987155,12.9837024 18.0007524,9 18.0007524,9 L18,9 Z M12,12 C13.6568542,12 15,10.6568542 15,9 C15,7.34314575 13.6568542,6 12,6 C10.3431458,6 9,7.34314575 9,9 C9,10.6568542 10.3431458,12 12,12 Z"></path></g></g></svg>),

  // TODO move this into ak-icon
  // eslint-disable-next-line max-len, react/self-closing-comp
  time: () => (<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g fill="currentColor"><path d="M11.7460317,12.8888889 L11.5555556,12.8888889 L11.5555556,12.4938272 L11.5555556,6.17283951 L11.5555556,5.77777778 L12.4444444,5.77777778 L12.4444444,6.17283951 L12.4444444,12 L16.5079365,12 L16.8888889,12 L16.8888889,12.8888889 L16.5079365,12.8888889 L11.9365079,12.8888889 L11.7460317,12.8888889 Z M12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 Z" ></path></g></g></svg>),

  // TODO move this into ak-icon
  // eslint-disable-next-line max-len, react/self-closing-comp
  mention: () => (<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g fill="currentColor"><path d="M12.0012385,18.8592797 C9.55129441,18.8592797 7.37485517,17.6882661 6.00110342,15.8754216 C6.87387856,14.4584831 8.44104898,13.5135575 10.2254676,13.5135575 L13.7770094,13.5135575 C15.5633917,13.5135575 17.1290208,14.4599135 18.0011034,15.8757782 C16.6273365,17.6884197 14.451022,18.8592797 12.0012385,18.8592797 L12.0012385,18.8592797 Z M11.9397024,5 C13.6894035,5 15.1075378,6.41919024 15.1075378,8.16783536 C15.1075378,9.91753643 13.6894035,11.3356707 11.9397024,11.3356707 C10.1900013,11.3356707 8.77186703,9.91753643 8.77186703,8.16783536 C8.77186703,6.41919024 10.1900013,5 11.9397024,5 L11.9397024,5 Z" ></path></g></g></svg>),

  // TODO move this into ak-icon
  // eslint-disable-next-line max-len, react/self-closing-comp
  warning: () => (<svg width="100px" height="100px" viewBox="0 0 100 100"><path fill="#6D7A8F" d="M98.495,81.938l0.006-0.01L60.475,6.58L60.459,6.57c-2.061-3.616-5.938-6.06-10.396-6.07h-0.059 c-4.458,0.011-8.336,2.455-10.396,6.07L1.565,81.928l0.006,0.01c-0.839,1.639-1.321,3.49-1.321,5.457 c0,6.628,5.371,12.001,11.999,12.001h75.568c6.628,0,11.999-5.373,11.999-12.001C99.816,85.428,99.334,83.576,98.495,81.938z" /><circle fill="#FFFFFF" cx="50.033" cy="83.223" r="5.5" /><path fill="#FFFFFF" d="M50.033,28.677c-3.037,0-5.5,2.462-5.5,5.5v33.864c0,3.037,2.463,5.5,5.5,5.5s5.5-2.463,5.5-5.5V34.177 C55.533,31.139,53.07,28.677,50.033,28.677z" /></svg>),
};
