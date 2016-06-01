var ChanlistReq = function(data) {
  this.data = data
}

ChanlistReq.prototype.deserialize = function() {
}

ChanlistReq.prototype.respond = function(socket) {
  var chanlist_id = floor(Math.random() * 500);
  var Packet = Buffer.from('({"chanlist-reply",5,"*nodejs",0,"DeadSoulsNew",0,' + chanlist_id +  ',(["slack":({"nodejs","1",}),]),})\0', 'ascii')
  var PacketLength = Buffer.alloc(4)
  PacketLength.writeInt32BE(Packet.length)
  socket.write(Buffer.concat([PacketLength, Packet]))
}

module.exports = ChanlistReq