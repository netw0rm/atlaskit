import getTopLinks from '../../src/items/top-links';
import { name } from '../../package.json';

const homeLink = {
  name: 'Home',
  icon: null,
  url: '/home',
};

const marketplaceLink = {
  name: 'Marketplace apps',
  icon: null,
  url: '/marketplace',
};

const peopleProfileLink = {
  name: 'People Profile',
  icon: null,
  url: '/people',
};

const inviteUsersLink = {
  name: 'Invite Users',
  icon: null,
  url: '/trusted-admin/users/invite',
};

describe(name, () => {
  it('should return null if the user is anonymous', () => {
    const result = getTopLinks({}, true, true, true, true, true, true);

    expect(result).toBe(null);
  });

  it('should return null if none of the three links are enabled', () => {
    const result = getTopLinks({}, false, false, false, false, false, false);

    expect(result).toBe(null);
  });

  it('should return Home link item when it is enabled', () => {
    const result = getTopLinks({}, false, true, false, false, false, false, homeLink);

    expect(result).not.toBe(null);
    expect(result.items).not.toBe(null);
    expect(result.items.length).toBe(1);
    expect(result.items[0].href).toBe('/home');
  });

  it('should return Marketplace link item when it is enabled', () => {
    const result = getTopLinks({}, false, false, true, false, false, false, null, marketplaceLink);

    expect(result).not.toBe(null);
    expect(result.items).not.toBe(null);
    expect(result.items.length).toBe(1);
    expect(result.items[0].href).toBe('/marketplace');
  });

  it('should return Site Admin link item when it is enabled', () => {
    const result = getTopLinks({}, false, false, false, true, false);

    expect(result).not.toBe(null);
    expect(result.items).not.toBe(null);
    expect(result.items.length).toBe(1);
    expect(result.items[0].href).toBe('/admin');
  });

  it('should return People Profile Link Admin link item when it is enabled', () => {
    const result = getTopLinks(
      {}, false, false, false, false, true, false, null, null, peopleProfileLink
    );

    expect(result).not.toBe(null);
    expect(result.items).not.toBe(null);
    expect(result.items.length).toBe(1);
    expect(result.items[0].href).toBe('/people');
  });

  it('should return Invite Users Link item when it is enabled', () => {
    const result = getTopLinks(
      {}, false, false, false, false, false, true, null, null, null, inviteUsersLink
    );

    expect(result).not.toBe(null);
    expect(result.items).not.toBe(null);
    expect(result.items.length).toBe(1);
    expect(result.items[0].href).toBe('/trusted-admin/users/invite');
  });

  it('should return the Home, Site Admin, People Profile and Marketplace links item when they are enabled', () => {
    const result = getTopLinks(
      {},
      false,
      true,
      true,
      true,
      true,
      true,
      homeLink,
      marketplaceLink,
      peopleProfileLink,
      inviteUsersLink
    );

    expect(result).not.toBe(null);
    expect(result.items).not.toBe(null);
    expect(result.items.length).toBe(5);
    expect(result.items[0].href).toBe('/home');
    expect(result.items[1].href).toBe('/people');
    expect(result.items[2].href).toBe('/trusted-admin/users/invite');
    expect(result.items[3].href).toBe('/admin');
    expect(result.items[4].href).toBe('/marketplace');
  });
});
