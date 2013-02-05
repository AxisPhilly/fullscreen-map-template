#!/usr/bin/env node

fs = require('fs');

console.log(__dirname);

// Copy JS Files
fs.mkdir(__dirname + '/js');

fs.readdir('../js', function(err, files){
  files.forEach(function(file){
    fs.createReadStream('../js/' + file).pipe(fs.createWriteStream(__dirname + '/js/' + file));
  });
});