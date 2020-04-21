# marked-plugin-sanitizer

[marked](https://github.com/markedjs/marked) plugin to sanitize HTML

## Install

Install with [npm](https://www.npmjs.com/):

    npm install marked-plugin-sanitizer

## Usage

```js
const marked = require("marked");
const { createSanitizer } = require("marked-plugin-sanitizer");
marked.use(createSanitizer());
const html = marked(`<script>alert(1)</script>
<iframe src="https://example.com"></iframe>

This is [XSS](javascript:alert)`);

console.log(html)
/*

<p>This is <a>XSS</a></p>

*/
```

### Options: 

- `dompurify`: See [DOMPurify](https://github.com/cure53/DOMPurify)'s options

An example for options:

```js
const marked = require("marked");
const { createSanitizer } = require("marked-plugin-sanitizer");
marked.setOptions({
    headerIds: false,
});
marked.use(
    createSanitizer({
        dompurify: {
            ADD_TAGS: ["iframe"],
        },
    })
);
const html = marked(`# Header

<iframe src="https://example.com"></iframe>
This is [CommonMark](https://commonmark.org/) text.
`);
assert.strictEqual(
    html,
    `<h1>Header</h1>
<iframe src="https://example.com"></iframe>
This is [CommonMark](https://commonmark.org/) text.
`
);
```

## Changelog

See [Releases page](https://github.com/azu/marked-plugin-sanitizer/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/marked-plugin-sanitizer/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
