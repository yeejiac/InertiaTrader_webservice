var net = require('net');

var client = new net.Socket();
client.setTimeout(10000);
client.connect(1203, '192.168.56.104', function() {
	console.log('Connected');
	client.write('1234|0324027|123|&'); //login
});

function dataHandler(data)
{
	info = data.toString().split('\n')[0]
	console.log('info: ' + info);
}

function testwrite()
{
	client.write('test&');
}

client.on('data', function(data) {
	console.log('Received: ' + data.length);
	dataHandler(data);
	// client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});

module.exports = {
	getObject: function() {
	  return client;
	}
  };
