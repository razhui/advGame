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

//PLAYER SCHEMA//

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  discordID:Number,
  stat1:Number, 
  stat2:Number, 
  stat3:Number 
})

const Player = mongoose.model("Player", playerSchema);

//CLIENT LISTENING FOR PLAYER MESSAGE//

client.on('message', msg => {

  const discordID = msg.member.id;

  const reactYousoro = msg.guild.emojis.cache.find(emoji => emoji.name === "Yousoro7")


  function Create() {
    const newPlayer = new Player ({
      discordID: discordID,
      stat1: 5, 
      stat2: 5, 
      stat3: 5
    });
  
      newPlayer.save().then(() => msg.reply('new adventurer added'));
  }

  switch (msg.content.toLowerCase()) {
    case config.prefix + "create":
      Create();
      break;

    case config.prefix + "adventure":
      console.log("ON AN ADVENTURE")
      break;
    
    case "yousoro":
      msg.react(reactYousoro);
  }

});

client.login(config.token);