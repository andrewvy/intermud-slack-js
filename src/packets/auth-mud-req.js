var AuthMudReq = function(data) {
  this.data = data
}

AuthMudReq.prototype.deserialize = function() {
}

AuthMudReq.prototype.respond = function(socket) {
  var Packet = Buffer.from('({"auth-mud-reply",5,"*nodejs",0,"DeadSoulsNew",0,12,})\0', 'ascii')
  var PacketLength = Buffer.alloc(4)
  PacketLength.writeInt32BE(Packet.length)
  socket.write(Buffer.concat([PacketLength, Packet]))
}

module.exports = AuthMudReq
