import { XFLOW_PROD_URL, XFLOW_STAG_URL, getXFlowEndPoint } from '../../../../src/common/services/xflowService';

describe('xflowService', () => {
  describe('getXFlowEndPoint', () => {
    it('should return the staging xflow URL if the hostname ends with jira.dev.com', () => {
      const mockWindow = {
        location: {
          hostname: 'xflow.jira-dev.com',
        },
      };
      expect(getXFlowEndPoint(mockWindow)).toEqual(XFLOW_STAG_URL);
    });

    it('should return the staging xflow URL if the hostname is localhost', () => {
      const mockWindow = {
        location: {
          hostname: 'localhost',
        },
      };
      expect(getXFlowEndPoint(mockWindow)).toEqual(XFLOW_STAG_URL);
    });

    it('should return the production xflow URL if the hostname ends with jira.com', () => {
      const mockWindow = {
        location: {
          hostname: 'xflow.jira.com',
        },
      };
      expect(getXFlowEndPoint(mockWindow)).toEqual(XFLOW_PROD_URL);
    });

    it('should return the production xflow URL if the hostname ends with atlassian.net', () => {
      const mockWindow = {
        location: {
          hostname: 'xflow.atlassian.net',
        },
      };
      expect(getXFlowEndPoint(mockWindow)).toEqual(XFLOW_PROD_URL);
    });
  });
});
