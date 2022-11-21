# Manga Cat ヽ(^‥^=ゞ)
Manga Cat is a Node.js CLI (command line interface) that scrapes and downloads manga from [MangaStream](http://mangastream.com/), like a cat, Javascript-style. This project is purely educational purposes and serve as a pet project for me to learn more about Javascript and Node.

**Please support MangaStream for bringing high-quality manga and the authors who wrote the manga you're reading.**

## Requirements
- Node.js **v4.0+** - http://nodejs.org/
- npm **v2.0+** - https://www.npmjs.org/

## Installation
`npm install manga-cat -g`

## Usage
```
Usage: manga-cat [options]

Options:

  -h, --help            output usage information
  -V, --version         output the version number
  -l, --list            output full manga list information
  -r, --releases        output latest releases information
  -d, --download <url>  download all available chapters from given url (e.g. http://mangastream.com/manga/toriko)
```

Downloads will appear in a `downloads` directory within `manga-cat`.

You can also combine `-l` and `-r` commands with `grep` to search for certain titles in the manga or releases list. By default, they return the full list.

For example: `manga-cat -r | grep -A 2 -i 'air gear'` will narrow down your search to returning the title, 'Air Gear' and displaying the next 2 lines after the match.

## Development
1. `git clone https://github.com/yanandcoffee/manga-cat.git`
2. `cd manga-cat && npm install`
3. `npm link` and you can use start using `manga-cat` in terminal

Now you can develop locally by changing the `index.js` script and run all manga-cat commands in your terminal.

##Issues
If you find any bugs, please report them in the [Issues](https://github.com/yanandcoffee/manga-cat/issues) section.



