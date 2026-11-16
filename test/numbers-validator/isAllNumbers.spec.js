const { expect } = require('chai');
const { describe, it, beforeEach, afterEach } = require('mocha');
const NumbersValidator = require('../../app/numbers_validator');

describe('isAllNumbers', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });

  afterEach(() => {
    validator = null;
  });
  describe('positive tests', () => {
    it('should return true if all elements are numbers', () => {
      const validationResults = validator.isAllNumbers([1, 2, -5, 0, 3.14]);
      expect(validationResults).to.be.equal(true);
    });

    it('should return false if at least one element is not a number', () => {
      const validationResults = validator.isAllNumbers([1, '2', 3]);
      expect(validationResults).to.be.equal(false);
    });
  });
  describe('negative tests', () => {
    const invalidInputs = [123, 'string', null, undefined, { a: 1 }];

    invalidInputs.forEach((invalidInput) => {
      it(`should throw an error when input is ${JSON.stringify(invalidInput)}`, () => {
        expect(() => validator.isAllNumbers(invalidInput)).to.throw(
          `[${invalidInput}] is not an array`,
        );
      });
    });
  });
});
