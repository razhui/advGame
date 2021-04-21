const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
const mongo = require('./mongo');
const mongoose = require('mongoose');

//CLIENT ON//

client.on('ready', async () => {
  console.log('raz bot ready')
  
  await mongo().then(mongoose => {
    try {
      console.log('Connected to Mongo')
    } catch(e) {
      console.log(err)
    } finally {
      mongoose.connection.close
    }
  })
});

//WEBHOOK//

const webhook = new Discord.WebhookClient(config.webhook_id, config.webhook_token);

const embedClass = new Discord.MessageEmbed()
.setTitle("Choose your class")
.setDescription("Lancer\nAlchemist\nSpellblade\nCorsair")

//PLAYER SCHEMA//

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  discordID:Number,
  Health:Number, 
  Mana:Number, 
  stat3:Number 
})

const Player = mongoose.model("Player", playerSchema);

function Create(discordID) {
  const newPlayer = new Player ({
    discordID: discordID,
    Health: 25, 
    Mana: 25, 
    stat3: 25
  })
  return newPlayer
}

//CLIENT LISTENING FOR PLAYER MESSAGE//

client.on('message', msg => {

  // const discordID = msg.member.id;
  const reactYousoro = msg.guild.emojis.cache.find(emoji => emoji.name === "Yousoro7")



  
      // newPlayer.save().then(() => msg.reply('new adventurer added'));

  switch (msg.content.toLowerCase()) {
    case config.prefix + "create":
      webhook.send(null, {
        embeds: [embedClass]
      })
      // newPlayer = Create(discordID);
      // newPlayer.save().then(() => msg.reply('new adventurer added'));
      break;

    case config.prefix + "adventure":
      console.log("ON AN ADVENTURE")
      break;
    
    case "yousoro":
      msg.react(reactYousoro);
  }

});

client.login(config.token);