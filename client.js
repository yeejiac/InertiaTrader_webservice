var net = require('net');

var client = new net.Socket();
var nidSerialNum;
client.setTimeout(10000);
client.connect(1203, '192.168.56.105', function() {
	console.log('Connected');
	// client.write('1234|0324027|123|&'); //login
});

function dataHandler(data)
{
	info = data.toString().split('\n')[0]
	console.log('info: ' + info);
	if(info.split('|')[0] == "login")
	{
		nidSerialNum = info.split('|')[1];
		console.log("Get nidSerialNum " + nidSerialNum)
	}
	
}

function testwrite()
{
	client.write('test&');
}

function getnidSerialNum()
{
	return nidSerialNum;
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
	},
	getnidSerialNum: function () {
	  return nidSerialNum;
	}
  };
