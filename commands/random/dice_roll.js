const commando = require('discord.js-commando');

class DiceRollCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'roll',
            group: 'random',
            memberName: 'roll',
            description: 'Рулетка'
        });
    }

    async run(message, args) {
        var roll = Math.floor(Math.random() * 1000) + 1;
        message.reply("Тебе выпало число " + roll);
    }
}

module.exports = DiceRollCommand;