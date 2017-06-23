import getTopLinks from '../src/items/top-links';
import { name } from '../package.json';

describe(name, () => {
  it('should return null if the user is anonymous', () => {
    const result = getTopLinks({}, true, true, true);

    expect(result).to.equal(null);
  });

  it('should return null if neither home link nor site admin link is enabled', () => {
    const result = getTopLinks({}, false, false, false);

    expect(result).to.equal(null);
  });

  it('should return Home link item when it is enabled', () => {
    const result = getTopLinks({}, false, true, false);

    expect(result).not.to.equal(null);
    expect(result.items).not.to.equal(null);
    expect(result.items.length).to.equal(1);
    expect(result.items[0].href).to.equal('/home');
  });

  it('should return Site Admin link item when it is enabled', () => {
    const result = getTopLinks({}, false, false, true);

    expect(result).not.to.equal(null);
    expect(result.items).not.to.equal(null);
    expect(result.items.length).to.equal(1);
    expect(result.items[0].href).to.equal('/admin');
  });

  it('should return both Home and Site Admin links item when they are enabled', () => {
    const result = getTopLinks({}, false, true, true);

    expect(result).not.to.equal(null);
    expect(result.items).not.to.equal(null);
    expect(result.items.length).to.equal(2);
    expect(result.items[0].href).to.equal('/home');
    expect(result.items[1].href).to.equal('/admin');
  });
});
