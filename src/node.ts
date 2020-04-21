// Node.js version
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";
import { markedPluginSanitizerOptions } from "./options";
import { createSanitizeRenderer } from "./SanitizeRender";

/**
 * Create Markdown processor
 * @param options
 */
export const createSanitizer = (options: markedPluginSanitizerOptions = {}) => {
    const window = new JSDOM("").window;
    // DOMWindow vs. Window @types/DOMPurify is mismatch
    // @ts-ignore
    const DOMPurify = createDOMPurify(window);
    const dompurifyOptions = options.dompurify ? options.dompurify : {};
    const sanitize = (html: string) => {
        return DOMPurify.sanitize(html, dompurifyOptions);
    };
    const renderer = createSanitizeRenderer(sanitize);
    return {
        renderer,
    };
};
