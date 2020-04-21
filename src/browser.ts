// Browser version
// It is referred by "browser" field
// https://github.com/defunctzombie/package-browser-field-spec
import DOMPurify from "dompurify";
import { markedPluginSanitizerOptions } from "./options";
import { createSanitizeRenderer } from "./SanitizeRender";

/**
 * Create Markdown processor
 * @param options
 */
export const createSanitizer = (options: markedPluginSanitizerOptions = {}) => {
    // DOMWindow vs. Window @types/DOMPurify is mismatch
    const dompurifyOptions = options.dompurify ? options.dompurify : {};
    const sanitize = (html: string): string => {
        return DOMPurify.sanitize(html, dompurifyOptions) as string;
    };
    const renderer = createSanitizeRenderer({
        markedOptions: options.marked,
        sanitize,
    });
    return {
        renderer,
    };
};
