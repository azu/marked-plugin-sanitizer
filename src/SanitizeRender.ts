const { Renderer } = require("marked");

export const createSanitizeRenderer = (sanitize: (html: string) => string) => {
    const defaultRenderer: any = new Renderer();
    console.log("defaultRenderer", defaultRenderer);
    const rendererKeys = [
        "code",
        "blockquote",
        "html",
        "heading",
        "hr",
        "list",
        "listitem",
        "checkbox",
        "paragraph",
        "table",
        "tablerow",
        "tablecell",
        "strong",
        "em",
        "codespan",
        "br",
        "del",
        "link",
        "image",
        "text",
    ] as const;
    type KeyTypes = typeof rendererKeys[number];
    type RendererHandlers = { [index in KeyTypes]: (...args: any[]) => string };
    const renderer: Partial<RendererHandlers> = {};
    rendererKeys.forEach((key) => {
        renderer[key] = (...args: any[]) => {
            const renderFn: any = defaultRenderer[key];
            return sanitize(renderFn.apply(defaultRenderer, args));
        };
    });
    return renderer;
};
