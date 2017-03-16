import * as sinon from 'sinon';
import { Observable } from 'rxjs';

export const fakeContextFrom = methods => {
  const fakeContext = Object.keys(methods).reduce((context, methodName) => {
    context[methodName] = sinon.stub().returns({
      observable() {
        return Observable.of(methods[methodName]);
      }
    });

    return context;
  }, {});

  return fakeContext;
};
