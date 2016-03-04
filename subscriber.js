var mqtt = require('mqtt');
var colour = require('colour');

// connect to the message server
var client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', function (packet) {
  console.log('CONECTOU CLIENTE: ', packet);
  client.subscribe('test', {qos: 1});
});
 
client.on('message', function (topic, message, packet) {
  // message is Buffer
//   var msg = {'topic': topic, 'message': message.toString(), 'packet': packet};
//   console.log(colour.green(JSON.stringify(msg)));
  console.log('TOPIC: ', topic); 
  console.log('MESSAGE: ', message.toString());
  console.log('PACKET: ', packet); 
});

client.on('error', function (err) {
  console.log('ERROR: ', err); 
});

client.on('outgoingEmpty', function () {
  console.log('outgoingEmpty'); 
});

client.on('offline', function () {
  console.log('offline'); 
});

client.on('close', function () {
  console.log('close'); 
});

client.on('reconnect', function () {
  console.log('reconnect'); 
});

process.on('SIGINT', () => {
   client.end();
   process.exit(0); 
});
