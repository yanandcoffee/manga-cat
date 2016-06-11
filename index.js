#!/usr/bin/env node

'use strict';

const program = require('commander');
const ListService = require('./services/listService.js');
const DownloadService = require('./services/downloadService.js');

program
  .version('0.2.0')
  .option('-l, --list', 'output full manga list (title, url)', ListService.getFullMangaList)
  .option('-r, --releases', 'output latest releases list (title, latest chapter, url)', ListService.getLatestReleaseList)
  .option('-d, --download <url>', 'download all available chapters from given url (e.g. http://mangastream.com/manga/toriko)')
  .parse(process.argv);

if (program.download) {
  ListService.getChaptersList(program.download)
    .then(startingList => {
      console.log('Constructing Download List...');
      return ListService.constructDownloadList(startingList);
    })
    .then(list => {
      console.log('Downloading...');
      console.log(list);
      DownloadService.downloadChapters(list);
    });
}

process.on('uncaughtException', err => {
  console.error(err);
});
