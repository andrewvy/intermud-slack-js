var StartupReq3 = function(data) {
  this.data = data
}

StartupReq3.prototype.deserialize = function() {
}

StartupReq3.prototype.respond = function(socket) {
  var Packet = Buffer.from('({"startup-reply",5,"*nodejs",0,"DeadSoulsNew",0,({({"*nodejs","127.0.0.1 8787",}),}),1234567890,})\0', 'ascii')
  var PacketLength = Buffer.alloc(4)
  PacketLength.writeInt32BE(Packet.length)
  socket.write(Buffer.concat([PacketLength, Packet]))
}

module.exports = StartupReq3
