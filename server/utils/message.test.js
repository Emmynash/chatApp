const expect = require('expect');

const { generateMessage } = require('./message');

describe("generate Message", () => {
    it("Should generate correct message object", () => {
        var from = "fireside";
        var text = "Non nobis tatum";
        var message = generateMessage(from, text);
        console.log(message);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({ from, text });
    })
})