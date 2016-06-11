'use strict';

const Xray = require('x-ray');
const x = new Xray();
const mangaListUrl = 'http://mangastream.com/manga';

/**
 * Represents the list service.
 */

const ListService = {
  getChaptersList(url) {
    return new Promise((resolve, reject) => {
      x(url, '.main-body', {
        title: 'h1',
        chapters: x('.table a', [{
          name: '',
          url: '@href',
        }]),
      })((err, result) => {
        if (err) {
          reject(Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },

  getFullMangaList() {
    x(mangaListUrl, '.main-body .table strong a',
      [{
        title: '',
        url: '@href',
      }]
    )((err, results) => {
      if (err) throw new Error(`There was an error in getting the full manga list, ${err}`);
      console.log(results);
    });
  },

  getLatestReleaseList() {
    x(mangaListUrl, '.main-body .table tr',
      [{
        title: 'strong a',
        latest: 'a.chapter-link',
        url: '.chapter-link@href',
      }]
    )((err, results) => {
      if (err) throw new Error(`There was an error in getting the latest release list, ${err}`);
      console.log(results);
    });
  },

  constructDownloadList(chapterList) {
    function getChapterLength(url) {
      return new Promise((resolve, reject) => {
        x(url, '.main-body .btn-group:last-child .dropdown-menu li:last-child a')((err, result) => {
          if (err) {
            reject(Error(err));
          } else {
            const regExp = /\(([^)]+)\)/g;
            const matches = regExp.exec(result);
            resolve(matches[1]);
          }
        });
      });
    }

    return chapterList.chapters.reduce((sequence, chapter, i) =>
      sequence.then(() =>
        getChapterLength(chapter.url))
          .then((length) => {
            const newChapterList = Object.assign({}, chapterList);
            newChapterList.chapters[i].length = length;
            return newChapterList;
          })
          .catch(err => Error(`${err} when trying to find length for ${chapter}`))
    , Promise.resolve());
  },
};

module.exports = ListService;
