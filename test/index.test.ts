import assert = require("assert");
import { createSanitizer } from "../src/node";

const marked = require("marked");

describe("marked-plugin-sanitizer", function () {
    it("should convert Markdown to HTML", () => {
        let sanitizer = createSanitizer();
        marked.use(sanitizer);
        const html = marked(`# Header

This is [CommonMark](https://commonmark.org/) text.
`);
        assert.strictEqual(
            html,
            `<h1 id="header">Header</h1>
<p>This is <a href="https://commonmark.org/">CommonMark</a> text.</p>
`
        );
    });
    it("should sanitize by default", () => {
        marked.use(createSanitizer());
        const html = marked(`<script>alert(1)</script>
<iframe src="https://example.com"></iframe>

This is [XSS](javascript:alert)`);
        assert.strictEqual(
            html,
            `

<p>This is <a>XSS</a></p>
`
        );
    });
    it("should accept marked option", () => {
        marked.use(
            createSanitizer({
                marked: {
                    headerIds: false,
                },
            })
        );
        const html = marked(`# Header

This is [CommonMark](https://commonmark.org/) text.
`);
        assert.strictEqual(
            html,
            `<h1>Header</h1>
<p>This is <a href="https://commonmark.org/">CommonMark</a> text.</p>
`
        );
    });
    it("should accept DOMPurify option", () => {
        marked.use(
            createSanitizer({
                marked: {
                    headerIds: false,
                },
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
    });
});
