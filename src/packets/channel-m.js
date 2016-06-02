var ChannelM = function(userName, messageText) {
  this.userName = userName || "undefined"
  this.messageText = messageText || "a blank message"
}

ChannelM.prototype.deserialize = function(data) {
  this.serverbound = true
  var split = JSON.parse('[' + data + ']')
  this.userName = split[7]
  this.messageText = split[8]
}

ChannelM.prototype.respond = function(socket) {
  if (this.serverbound) {
    // Packet was sent from MUD, we should proxy to Slack.
    socket.emit('slack', this.userName, this.messageText)
  } else {
    var Message = Buffer.from('({"channel-m",5,"nodejs","slackbot",0,0,"slack","' + this.userName + '","' + this.messageText + '",})\0', 'ascii')
    var MessageLength = Buffer.alloc(4)
    MessageLength.writeInt32BE(Message.length)
    socket.write(Buffer.concat([MessageLength, Message]))
  }
}

module.exports = ChannelM
