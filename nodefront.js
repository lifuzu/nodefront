#!/usr/bin/env node
var program = require('commander');
var packageConf = require('nconf');

// access package.json for version number
packageConf.file({ file: __dirname + '/package.json' });

// nodefront program
program
  .version(packageConf.get('version'))
  .usage('[command]');

// compile files
program
  .command('compile')
  .description('Compiles *.jade and *.styl(us) files.')
  .option('-r, --recursive', 'Recurse through directories.')
  .option('-w, --watch', 'Recompile files upon modification. Intelligently' +
    ' recompile dependencies.')
  .option('-s, --serve [port]', 'Serve files on localhost at the given port' +
    ' number, which defaults to 3000.', Number)
  .option('-l, --live [port]', 'Implies -w/--watch and -s/--serve [port].' +
    ' Serves files on localhost and automatically refreshes browser upon' +
    ' modification of HTML/CSS/JS files.', Number)
  .action(require('./commands/compile'));

// fetch libraries
program
  .command('fetch <library>')
  .description('Fetches <library> for immediate use.')
  .option('-u, --url <url>', 'The URL to fetch the library from.')
  .option('-p, --path <path>', 'Provides the path to the library in the' +
          ' zip archive specified by the -u/--url <url> parameter. Note' +
          ' that <path> should be a regular expression.')
  .option('-v, --version <version>', 'Specify the version of the library to' +
          ' fetch.', String, '')
  .option('-o, --output <directory>', 'If provided, the library will be' +
          ' stored as a file in the given directory. Otherwise, it will be' +
          ' added to the current directory.', String, '.')
  .option('-t, --type <type>', 'The type of this library, which should also' +
          'be its extension. This defaults to js.', String, 'js')
  .action(require('./commands/fetch'));

// insert CSS/JS libraries into HTML/Jade documents
program
  .command('insert <library> <file>')
  .description('Inserts <library> into <file>. <library> should be a path to' +
               'a CSS/JavaScript library and <file> should be a path to an' +
               'HTML/Jade document.')
  .option('-h, --head', 'Insert the given JS file into the head of the' +
          'document. By default, JS is inserted into the footer.')
  .option('-a, --absolute', 'Use an absolute path for the inserted' +
          'link/script tag instead of a relative one.')
  .option('-t, --tab-length <length>', 'The number of spaces that constitute' +
          ' each tab in the document for insertion purposes. If hard tabs' +
          ' are used, specify -1 for this option. Otherwise, if this is not' +
          ' given, the tab length is assumed to be 4.', Number, 4)
  .action(require('./commands/insert'));

program.parse(process.argv);
