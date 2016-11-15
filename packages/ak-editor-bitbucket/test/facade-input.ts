import { expect } from 'chai'
import * as chai from 'chai'
import { fixtures, chaiPlugin } from 'ak-editor-test';
import FacadeInput from '../src/hacks/facade-input';

chai.use(chaiPlugin);

const target = fixtures();
const makeFacadeInput = ():FacadeInput => {
  return new FacadeInput(target(), {
    initialValue: 'foo',
    classList: ['facade-input']
  });  
};

// describe('Facade Input', () => {
//   afterEach(() => {
//     const elements = document.querySelectorAll('.facade-input');
//     for(let i = 0; i < elements.length; i++) {
//       const el = elements[i];
//       el.parentNode.removeChild(el);
//     }
//   });

//   it('should be initialized with given values', () => {
//     makeFacadeInput();

//     const elem = document.querySelector('.facade-input');
//     expect(elem).to.have.property('value', 'foo');
//   });

//   it('should call the sync function when there is a user input', () => {
//     const fInput = makeFacadeInput();

//     const promise = new Promise((resolve) => {
//       fInput.onSync = (val) => resolve(val);
//     });

//     const elem = document.querySelector('.facade-input');
//     (elem as HTMLInputElement).value = 'barbaz';

//     return promise.then((val) => {
//       expect(val).to.equal('barbaz');
//     });
//   });

//   it('should be removed when marked for removal', () => {
//     const fInput = makeFacadeInput();

//     const promise = new Promise((resolve) => {
//       fInput.onSync = (val, willRemove) => {
//         resolve(willRemove);
//       };
//     });

//     fInput.markForRemoval();
//     return promise.then((willRemove) => {
//       expect(willRemove).to.be.true;
//       expect(fInput.removed).to.be.true;
//       expect(document.querySelector('.facade-input')).to.be.null;
//     });
//   });

//   it('should be possible to attach multiple sync functions', () => {
//     const fInput = makeFacadeInput();

//     const promise = new Promise((resolve) => {
//       let callCount = 0;

//       fInput.onSync = () => {
//         callCount++;
//       }

//       fInput.onSync = () => {
//         callCount++;
//         resolve(callCount);
//       }
//     });

//     const elem = document.querySelector('.facade-input');
//     (elem as HTMLInputElement).value = 'barbaz';

//     return promise.then((callCount) => {
//       expect(callCount).to.equal(2);
//     });
//   });
// });
