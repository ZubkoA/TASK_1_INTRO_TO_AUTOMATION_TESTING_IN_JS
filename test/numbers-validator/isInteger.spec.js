const { expect } = require('chai');
const { describe, it, beforeEach, afterEach } = require('mocha');
const NumbersValidator = require('../../app/numbers_validator');

describe('isInteger', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });
  afterEach(() => {
    validator = null;
  });
  describe('positive test', () => {
    it('should return true if n is an integer', () => {
      const validationResults = validator.isInteger(2);
      expect(validationResults).to.be.equal(true);
    });
  });
  describe('negative tests', () => {
    it('should return false when  n is not an integer', () => {
      const validationResults = validator.isInteger(2.5);
      expect(validationResults).to.be.equal(false);
    });
    it('should throw an error when provided not a number value', () => {
      const input = 'four';
      expect(() => {
        validator.isInteger(input);
      }).to.throw(`[${input}] is not a number`);
    });
  });
});
