const { expect } = require("chai");
const { describe, it, beforeEach, afterEach } = require("mocha");
const NumbersValidator = require("../../app/numbers_validator");

describe("isNumberEven", () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });

  afterEach(() => {
    validator = null;
  });

  describe("positive tests", () => {
    it("should return true when provided an even number", () => {
      const validationResults = validator.isNumberEven(4);
      expect(validationResults).to.be.equal(true);
    });
  });
  describe("negative tests", () => {
    it("should return false when provided a not even number", () => {
      const validationResults = validator.isNumberEven(5);
      expect(validationResults).to.be.equal(false);
    });

    const invalidInputs = [[], "string", null, undefined, " ", { a: 1 }];

    invalidInputs.forEach((invalidInput) => {
      it(`should throw an error when input is ${JSON.stringify(invalidInput)}`, () => {
        expect(() => validator.isNumberEven(invalidInput)).to.throw(
          `[${invalidInput}] is not of type "Number" it is of type "${typeof invalidInput}"`,
        );
      });
    });
  });
});
