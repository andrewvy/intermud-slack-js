var Packets = require('./packets')
var net = require('net')

var getPacket = function(socket, type, data) {
  var packetType = type.slice(1, type.length - 1)
  var packetConstructor = Packets[packetType]

  if (!packetConstructor) {
    return
  }

  var packet = new packetConstructor(data)
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

var server = net.createServer(function(socket) {
  console.log('Socket connected')

  socket.on('end', function() {
    console.log('Socket disconnected')
  })

  socket.on('data', function(data) {
    parsePacket(socket, data)
  })
})

server.on('err', function(err) {
  throw err
})

server.listen(8787)
