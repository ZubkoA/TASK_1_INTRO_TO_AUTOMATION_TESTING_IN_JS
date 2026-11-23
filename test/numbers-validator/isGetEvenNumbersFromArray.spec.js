const { expect } = require('chai');
const { describe, it, beforeEach } = require('mocha');
const NumbersValidator = require('../../app/numbers_validator');

describe('isgetEvenNumbersFromArray', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });

  describe('positive tests', () => {
    it('should return an array of even numbers', () => {
      const validationResults = validator.getEvenNumbersFromArray([1, 2, 3, 4]);
      expect(validationResults).to.deep.equal([2, 4]);
    });
  });

  describe('negative tests', () => {
    const invalidInputs = [
      123,
      'string',
      null,
      undefined,
      { a: 1 },
      [1, '2', 4],
    ];

    invalidInputs.forEach((invalidInput) => {
      it(`should throw an error when input is ${JSON.stringify(invalidInput)}`, () => {
        expect(() => validator.getEvenNumbersFromArray(invalidInput)).to.throw(
          `[${invalidInput}] is not an array of "Numbers"`,
        );
      });
    });
  });
});
