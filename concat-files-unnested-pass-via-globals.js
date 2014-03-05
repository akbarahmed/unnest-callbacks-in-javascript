#!/usr/bin/env node

// In this example we've unnested the callbacks. Information is passed using
// file globals (file1Contents, file2Contents, file3Contents);

var fs = require('fs');

var file1Contents, 
	file2Contents, 
	file3Contents;

fs.readFile('./file1.txt', readFile1);

function readFile1(err, data) {
	if (err) throw err;

	file1Contents = data;
	fs.readFile('./file2.txt', readFile2);
}

function readFile2(err, data) {
	if (err) throw err;
	
	file2Contents = data;
	file3Contents = [file1Contents, file2Contents].join('');
	fs.writeFile('file3.txt', file3Contents, writeFile3); 
}

function writeFile3(err) {
	if (err) throw err;
	console.log('Concatenated file1.txt and file2.txt into file3.txt.');
}
