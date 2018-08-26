const lib = require('lib')({token: process.env.STDLIB_TOKEN});
const mongoose = require('mongoose');
const ChildBot = require('../../db/models/ChildBot');
/**
* /config
*
*  Get data to save in the database
*
* @param {string} user The user id of the user that invoked this command (name is usable as well)
* @param {string} channel The channel id the command was executed in (name is usable as well)
* @param {string} text The text contents of the command
* @param {object} command The full Slack command object
* @param {string} botToken The bot token for the Slack bot you have activated
* @returns {object}
*/
module.exports = (user, channel, text = '', command = {}, botToken = null, callback) => {
  let arrayOfWords = text.split(" ");
  let nameMainApp = text;

  if (arrayOfWords.length > 1) {
    nameMainApp = arrayOfWords[0];
    channel = arrayOfWords[1];
  } else {
    channel = 'general';
  }
  
  mongoose.connect(process.env.MONGO_URI, (err, db) => {
    const childBotToSave = new ChildBot({mainWorkspace: nameMainApp, channel: channel, token: botToken});
    
    childBotToSave.save((err) => {
      if (err) return console.log(err);

      callback(null, {
        text: `Great!, you have subscribed to ${nameMainApp} to receive messages.`
      });
    });
  });
};
