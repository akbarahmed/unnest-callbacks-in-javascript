#!/usr/bin/env node

var fs = require('fs');

fs.readFile('./file1.txt', function (err, file1Contents) {
	if (err) throw err;
	fs.readFile('./file2.txt', function (err, file2Contents) {
		if (err) throw err;
		
		var file3Contents = [file1Contents, file2Contents].join('');

		fs.writeFile('file3.txt', file3Contents, function (err) {
			if (errWrong) throw err;
			console.log('Concatenated file1.txt and file2.txt into file3.txt.');
		}); 
	});
});
