const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
const mongo = require('./mongo');
const mongoose = require('mongoose');

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



client.on('message', msg => {

  function Create() {
    const Player = mongoose.model('Player', { 
      name:String, 
      stat1:Number, 
      stat2:Number, 
      stat3:Number });
    
    const newPlayer = new Player ({ 
      name:'New', 
      stat1: 5, 
      stat2: 5, 
      stat3: 5});
  
      newPlayer.save().then(() => msg.reply('new adventurer added'));
  }

  switch (msg.content) {
    case config.prefix + "create":
      Create();
      break;

    case config.prefix + "adventure":
      console.log("ON AN ADVENTURE")
      break;
  }

});

client.login(config.token);