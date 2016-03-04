var mosca = require('mosca');
var colour = require('colour');
var util = require('util');

var ascoltatore = {
  //using ascoltatore
  type: 'mongo',
  url: 'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

var settings = {
  port: 1883,
  backend: ascoltatore
};

var server = new mosca.Server(settings);

server.on('clientConnected', function(client) {
    console.log('client connected'.green, client.id.green);
});

// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published Payload:', packet.payload.toString());
  
  if (client) {
    console.log('Published Client ID:', client.id);      
  }
  else{
    console.log('Published:'.magenta, packet.magenta);
  }
});

server.on('delivered', function(packet, client) {
    // console.log('delivered', packet);
    util.log('delivered Client', client.id);
});
 
server.on('subscribed', function(topic, client) {
    console.log('subscribed topic:'.yellow, topic.yellow);
    console.log('subscribed Client:'.yellow, client.id.yellow);
});
server.on('unsubscribed', function(topic, client) {
    console.log('unsubscribed  topic:', topic);
    console.log('unsubscribed  ClientID:', client.id);
});

// fired when a client disconnects
server.on('clientDisconnected', function(client) {
    console.log('Client Disconnected:'.red, client.id.red);
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running');
}
