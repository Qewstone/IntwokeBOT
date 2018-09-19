const Discord = require('discord.js');
const util = require("util");
const request = require("request");
const config = require('./config.json');
const rgbcolor = require('rgbcolor');
const getImageColors = require('get-image-colors');
const client = new Discord.Client({ autofetch: [
        'MESSAGE_CREATE',
        'MESSAGE_UPDATE',
        'MESSAGE_REACTION_ADD',
        'MESSAGE_REACTION_REMOVE',
    ] });

const size = config.colors;
const rainbow = new Array(size);

const PREFIX = "i!"

function generateHex() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

for (var i=0; i<size; i++) {
  var red   = sin_to_hex(i, 0 * Math.PI * 2/3); // 0   deg
  var blue  = sin_to_hex(i, 1 * Math.PI * 2/3); // 120 deg
  var green = sin_to_hex(i, 2 * Math.PI * 2/3); // 240 deg

  rainbow[i] = '#'+ red + green + blue;
}

function sin_to_hex(i, phase) {
  var sin = Math.sin(Math.PI / size * 2 * i + phase);
  var int = Math.floor(sin * 127) + 128;
  var hex = int.toString(16);

  return hex.length === 1 ? '0'+hex : hex;
}

let place = 0;
const servers = config.servers;

function changeColor() {
  for (let index = 0; index < servers.length; ++index) {		
    client.guilds.get(servers[index]).roles.find('name', config.roleName).setColor(rainbow[place])
		.catch(console.error);
		
    if(config.logging){
      console.log(`[ColorChanger] Changed color to ${rainbow[place]} in server: ${servers[index]}`);
    }
    if(place == (size - 1)){
      place = 0;
    }else{
      place++;
    }
  }
}

client.on("ready", function() {
  console.log("Ready");
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  
  let prefix = "i!";
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}привет`){
    return message.channel.send("Привет! Добро пожаловать, если ты тут впервые!");
  }

});

client.on('ready', () => {
  console.log('Bot loaded');
  client.user.setPresence({ game: { name: `на доброго ззигера`, type: 3 } }).catch();
  client.channels.get('429080010041589760');
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
  if(config.speed < 500){console.log("The minimum speed is 60.000, if this gets abused your bot might get IP-banned"); process.exit(1);}
  setInterval(changeColor, config.speed);
});

client.on('message', function(message) {
   if (message.author.equals(bot.user)) return;

   if (!message.content.startsWith(PREFIX)) return;

   var args = message.content.substring(PREFIX.lenght).trim().split(/ +/g);

   switch (args[0].toLowerCase()) {
       case "ping":
           message.channel.sendMessage("Pong!");
           break;
       case "info":
           message.channel.sendMessage("Я ботяра куста");
           break;
       case "8ball":
           if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.lenght)]);
           else message.channel.sendMessage("Невозможно прочесть это");
           break;
       case "embed":
           var embed = new Discord.RichEmbed()
               .setDescription("Hello, this is embed");
           message.channel.sendEmbed(embed);
           break;
       default:
           message.channel.sendMessage("Неверная команда!");
   }
});

client.login("NDI5ODM3Mjk3OTAzNDY4NTQ0.DaHcwA.PdypKo02YvLGoFrz1deD4VZTKOk");
