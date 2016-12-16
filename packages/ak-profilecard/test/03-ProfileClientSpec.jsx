import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiEnzyme from 'chai-enzyme';

import { modifyResponse } from '../src/api/profile-client';

const { expect } = chai;
chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('ak-profilecard', () => {
  describe('profile-client', () => {
    describe('#modifyResponse', () => {
      it('should remove certain properties from the data object', () => {
        const data = {
          User: {
            remoteWeekdayIndex: 'shouldberemoved',
            remoteWeekdayString: 'shouldberemoved',
            remoteTimeString: 'shouldberemoved',
            id: 'shouldberemoved',
          },
        };

        const result = modifyResponse(data);

        expect(result.remoteWeekdayIndex).to.be.undefined;
        expect(result.remoteWeekdayString).to.be.undefined;
        expect(result.remoteTimeString).to.be.undefined;
        expect(result.id).to.be.undefined;
      });

      it('should rename "remoteTimeString" property to "timestring"', () => {
        const data = {
          User: {
            remoteTimeString: '10:23am',
          },
        };

        const result = modifyResponse(data);

        expect(result.timestring).to.equal('10:23am');
      });

      it('should not modify "timestring" property if remote and local date share the same weekday index', () => {
        const data = {
          User: {
            remoteTimeString: '0:00pm',
            remoteWeekdayString: 'Mon',
            remoteWeekdayIndex: new Date().getDay().toString(),
          },
        };

        const result = modifyResponse(data);

        expect(result.timestring).to.equal('0:00pm');
      });

      it('should prefix "timestring" property with weekday if local dates weekday index is different', () => {
        const data = {
          User: {
            remoteTimeString: '0:00pm',
            remoteWeekdayString: 'Mon',
            remoteWeekdayIndex: 12,
          },
        };

        const result = modifyResponse(data);

        expect(result.timestring).to.equal('Mon 0:00pm');
      });
    });
  });
});
