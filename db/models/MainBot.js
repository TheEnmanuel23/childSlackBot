const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MainBotSchema = new Schema({
  workspace: String,
  token: String
})

const MainBot = mongoose.model('MainBot', MainBotSchema)

module.exports = MainBot
