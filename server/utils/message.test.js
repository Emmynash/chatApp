const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

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

describe("generateLocationMessage", () => {
    it("Should generate correct location object", () => {
        var from = "fake User";
        var lat = 15;
        var lon = 15;
        var url = "https://www.google.com/maps?q=15,15";

        var message = generateLocationMessage(from, lat, lon);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({ from, url });
    })
})