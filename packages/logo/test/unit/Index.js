import DefaultLogo, * as logos from '../../src';
import { name } from '../../package.json';

describe(name, () => {
  describe('Product logos', () => {
    it('are properly defined', () => {
      expect(Object.keys(logos)).toEqual([
        'AtlassianLogo',
        'BitbucketLogo',
        'ConfluenceLogo',
        'HipchatLogo',
        'JiraLogo',
        'JiraCoreLogo',
        'JiraServiceDeskLogo',
        'JiraSoftwareLogo',
        'StatuspageLogo',
        'StrideLogo',
        'default',
      ]);
    });
    it('has the Atlassian logo exported as default', () => {
      expect(DefaultLogo).toBe(logos.AtlassianLogo);
    });
  });
});
