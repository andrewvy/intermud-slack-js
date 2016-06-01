var ChannelM = function(data) {
  this.data = data
}

ChannelM.prototype.deserialize = function() {
}

ChannelM.prototype.respond = function(socket) {
  var Message = Buffer.from('({"channel-m",5,"nodejs","slackbot",0,0,"slack","slackbot","hello world!",})\0', 'ascii')
  var MessageLength = Buffer.alloc(4)
  MessageLength.writeInt32BE(Message.length)
  socket.write(Buffer.concat([MessageLength, Message]))
}

module.exports = ChannelM
