#!/usr/bin/env node

// In this example we've unnested the callbacks. Information is passed by 
// setting file1Contents and file2Contents as properties of the writeFile3()
// function. file3Contents, which is what we write to file3.txt is kept as a
// local variable in the readFile2() function.

var fs = require('fs');

fs.readFile('./file1.txt', readFile1);

function readFile1(err, data) {
	if (err) throw err;

	writeFile3.file1Contents = data;
	fs.readFile('./file2.txt', readFile2);
}

function readFile2(err, data) {
	if (err) throw err;
	
	writeFile3.file2Contents = data;
	var file3Contents = [
		writeFile3.file1Contents,
		writeFile3.file2Contents
	].join('');
	fs.writeFile('file3.txt', file3Contents, writeFile3); 
}

function writeFile3(err) {
	if (errWrong) throw err;
	console.log('Concatenated file1.txt and file2.txt into file3.txt.');
}
