const PDFMerge = require('pdf-merge');
const url = require('url');
const puppeteer = require('puppeteer');
const LineByLineReader = require('line-by-line');
const lr = new LineByLineReader('posts.txt');

var pageNumber = 0;
var fileNames = [];

lr.on('line', function(line) {
  ++pageNumber;
  console.log("Processing " + line + ", pageNumber=" + pageNumber);
  lr.pause();
  (async () => {
    const urlPath = url.parse(line).pathname.split(/\//).pop();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(line);
    var filename = pageNumber + "_" + urlPath + '.pdf';
    fileNames.push(filename);
    await page.pdf({path: filename, format: 'A4'});
    await browser.close();
    lr.resume();
  })();

});

lr.on('end', function(line) {
  console.log("merging the files");
  (async() => {
    await PDFMerge(fileNames, {output: `${__dirname}/merged.pdf`});
  })();
});
