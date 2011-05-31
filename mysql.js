var sys = require('sys');
http = require('http');

var Client = require('mysql').Client;
var	client = new Client();
client.port = 'localhost';  // change this to a hostname if you don't want to use sockets
client.user = 'root';       // change this
client.password = '';       // change this
client.connect();
// use the correct database
client.query('USE test'); // change this

http.createServer(
		function(req, res)
		{
			res.writeHead(200, {'Content-Type': 'text/plain'});
// Basic Select query
			client.query('SELECT * FROM test', // change this
				function selectCb(err, results, fields)
				{
					if (err)
						throw err;

//    console.log(results);
//    console.log(fields);
//    console.log(JSON.stringify(results)); // left these in so you can do some console debugging

//For each item do something with the result
					var i;
					var result;
					for (i in results)
					{
						result = results[i];
						res.write(result.test + ":"); // Writes to the web browser the value of test then a : to seperate values
					}
					res.end(); // end the request.
				}
			);
		}).listen(3000, "127.0.0.1");
sys.puts("Server running on port 3000");