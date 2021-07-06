const helpers = require("../client/assets/helpers")

describe("helper functions", () => {
    test('returns 4', () => {
        expect(helpers.test()).toBe(4)
    });
    test('returns 4', () => {
        expect(helpers.testTwo()).toBe(4)
    });

})