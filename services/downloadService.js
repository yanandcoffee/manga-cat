'use strict';

const Xray = require('x-ray');
const x = new Xray();
const fs = require('fs');
const download = require('download');

/**
 * Represents the download service.
 */

const DownloadService = {
  downloadChapters(chapterList) {
    console.log(chapterList.title);
    console.log('--------------');

    chapterList.chapters.forEach((chapter, i) => {
      // remove last digit from http://readms.com/r/platinum_end/001/3013/1
      const slicedUrl = chapter.url.slice(0, -1);

      x(slicedUrl + i, 'img#manga-page@src')((err, image) => {
        console.log(err);
        console.log(image);
        console.log(chapter.length);

        for (let j = 0; j <= chapter.length; j++) {
          download(image, 'downloads');
        }

        //   if (err) reject(Error(err));
        //
        //   let filename = `${i}.png`;
        //   if (i < 10) {
        //     filename = '0'.concat(i, '.png');
        //   }
        //
        //   console.log(image);
        //
        //   download(image, 'downloads');
      });
    });

    // Promise.all();
  },
};

module.exports = DownloadService;
