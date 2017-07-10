import 'es6-promise/auto';
import 'whatwg-fetch';

const SITE_ADMINS_GROUP_NAME = 'site-admins';
export default username =>
  fetch(`/rest/api/latest/user?expand=groups&username=${encodeURIComponent(username)}`, {
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(
          `Unable to determine if the user was a site administrator. Status: ${response.status}`
        );
      } else {
        return response.json();
      }
    })
    .then((data) => {
      let isSiteAdmin;
      try {
        isSiteAdmin = data.groups.items.some(group => group.name === SITE_ADMINS_GROUP_NAME);
      } catch (e) {
        isSiteAdmin = false;
      }
      return isSiteAdmin;
    });
