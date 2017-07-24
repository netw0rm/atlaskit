import { RequestServiceOptions, ServiceConfig, utils } from '@atlaskit/util-service-support';
import { DecisionQuery, DecisionResponse, ServiceDecisionResponse, TaskDecisionProvider } from '../types';
import { convertServiceDecisionResponseToDecisionResponse } from './TaskDecisionUtils';

export default class TaskDecisionResource implements TaskDecisionProvider {
  private serviceConfig: ServiceConfig;

  constructor(serviceConfig: ServiceConfig) {
    this.serviceConfig = serviceConfig;
  }

  getDecisions(query: DecisionQuery): Promise<DecisionResponse> {
    const options: RequestServiceOptions = {
      path: 'decision',
      requestInit: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(query),
      }
    };
    return utils.requestService<ServiceDecisionResponse>(this.serviceConfig, options).then(serviceDecisionResponse => {
      return convertServiceDecisionResponseToDecisionResponse(serviceDecisionResponse, query);
    });
  }
}
