var mqtt = require('mqtt');

// connect to the message server
var client = mqtt.connect('mqtt://localhost:1883');

// publish 'Hello mqtt' to 'test'
var opts  = {
    qos: 1,
    retain: true
}

setInterval(() => {
    client.publish('test', 'Hello mqtt', opts, (err, data) => {
        console.log('ERR: ', err);
        console.log('DATA: ', data);
    });
    
}, 20);

// terminate the client
//client.end();
 
client.on('connect', function (packet) {
  console.log('PUBLISHER CONNECTED: ', packet);
//   client.subscribe('test', {qos: 1});
});

//  
// client.on('message', function (topic, message, packet) {
//   // message is Buffer
//   console.log('TOPIC: ', topic); 
//   console.log('MESSAGE: ', message.toString());
//   console.log('PACKET: ', packet); 
// });
 
 
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
