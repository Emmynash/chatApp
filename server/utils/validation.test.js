const expect = require('expect');
const { isValidString } = require('./validator');

describe("isValid String", () => {
    it("Should reject non-string values", () => {
        var obj = 23467
        var invalidStr = isValidString(obj);
        expect(invalidStr).toBe(false);
    })
    it("Should reject string with only spaces", () => {
        var obj = "      "
        var invalidStr = isValidString(obj);
        expect(invalidStr).toBe(false);
    })
    it("Should allow strings with non-space characters", () => {
        var obj = "  Hallowwing  "
        var invalidStr = isValidString(obj);
        expect(invalidStr).toBe(true);
    })
})