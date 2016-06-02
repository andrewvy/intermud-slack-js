var RtmClient = require('@slack/client').RtmClient
var MemoryDataStore = require('@slack/client').MemoryDataStore;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

var token = process.env.SLACK_API_TOKEN || ''

var rtm = new RtmClient(token, {
  logLevel: 'info',
  dataStore: new MemoryDataStore(),
  autoReconnect: true,
  autoMark: true
});

module.exports = rtm
