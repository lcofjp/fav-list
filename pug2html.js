#!/usr/bin/env node
const pug = require('pug');
const fs = require('fs');
const path = require('path');

function pug2html(infile, outfile) {
	console.log(infile, outfile);
	// Compile the source code
  const compiledFunction = pug.compileFile(infile);

  // Render a set of data
  const out = compiledFunction({});
  
  fs.writeFileSync(outfile, out, 'utf8');
}

if (require.main === module) {
  // code to be executed while current file is the entry point 
	//process.argv[0] is node, argv[1] is this file, argv[2] is the first parameter
  if (process.argv.length === 3) {
		const infilename = process.argv[2];
		const outfilename = path.basename(infilename, path.extname(infilename)) + '.html';
		try{
			const stat = fs.statSync(infilename);
		}
		catch(e) {
			console.log(`file ${infilename} no found!`);
		  return;
		}
		pug2html(infilename, outfilename);
	}
}

