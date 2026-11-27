const { expect } = require('chai');
const { describe, it, beforeEach } = require('mocha');
const NumbersValidator = require('../../app/numbers_validator');

describe('isInteger', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });

  describe('positive test', () => {
    it('should return true if n is an integer', () => {
      const validationResults = validator.isInteger(2);
      expect(validationResults).to.be.equal(true);
    });
    it('should return false when  n is not an integer', () => {
      const validationResults = validator.isInteger(2.5);
      expect(validationResults).to.be.equal(false);
    });
  });
  describe('negative tests', () => {
    const invalidInputs = [[], 'string', null, undefined, ' ', { a: 1 }];

    invalidInputs.forEach((invalidInput) => {
      it(`should throw an error when input is ${JSON.stringify(invalidInput)}`, () => {
        expect(() => validator.isInteger(invalidInput)).to.throw(
          `[${invalidInput}] is not a number`,
        );
      });
    });
  });
});
