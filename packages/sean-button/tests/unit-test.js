import seanButton, {subtract} from '../src/index.js';

describe('sean-button', function () {

 	describe('passing test', function () {
		it('should pass', function () {
			expect(true).to.be.true;
		});	
	});

});

describe('subract helper function', function () {
	it('should calculate 2 - 1', function () {
		let result = subtract(2, 1);
		expect(result).to.be.equal(1);
	});	
});