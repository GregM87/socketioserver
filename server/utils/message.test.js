var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {

    it('should generate the correct message object', () => {
        var from = 'Gregor'
        var text = 'Mangelsdorf'
        var message = generateMessage(from, text);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({
            from: from,
            text: text
        });
    });

});