var Packets = require('./packets')
var net = require('net')
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var SlackClient = require('./slack_client')

var getPacket = function(socket, type, data) {
  var packetType = type.slice(1, type.length - 1)
  var packetConstructor = Packets[packetType]

  if (!packetConstructor) {
    return
  }

  var packet = new packetConstructor()
  packet.deserialize(data)
  packet.respond(socket)
}

var parsePacket = function(socket, data) {
  // Packet Length
  // console.log(data.readInt32BE())

  var rawPacket = data.slice(4)
  console.log(rawPacket.toString('ascii'))
  var slicedData = rawPacket.toString('ascii', 2, rawPacket.length - 4)
  var packetType = slicedData.split(',')[0]

  getPacket(socket, packetType, slicedData)
}

var sendMessage = function(socket, userName, messageText) {
  var messagePacket = new Packets['channel-m'](userName, messageText)
  messagePacket.respond(socket)
}

SlackClient.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function() {
  var sockets = []
  var CHANNEL = SlackClient.dataStore.getChannelByName('mud')
  var CHANNEL_ID = CHANNEL ? CHANNEL.id : ''

  if (CHANNEL_ID === '') {
    throw new Error("Could not find channel #mud")
  }

  SlackClient.on(RTM_EVENTS.MESSAGE, function(message) {
    var messageText = message.text
    var user = SlackClient.dataStore.getUserById(message.user)
    var userName = user.name

    for (var i = 0; i < sockets.length; i++) {
      sendMessage(sockets[i], userName, messageText)
    }
  })

  var server = net.createServer(function(socket) {
    sockets.push(socket)

    socket.on('end', function() {
      sockets.pop()
    })

    socket.on('data', function(data) {
      parsePacket(socket, data)
    })

    socket.on('slack', function(userName, messageText) {
      SlackClient.sendMessage('`' + userName + '@mud <slack> ' + messageText + '`', CHANNEL_ID)
    });
  })

  server.on('err', function(err) {
    throw err
  })

  server.listen(8787)
})

SlackClient.start();
