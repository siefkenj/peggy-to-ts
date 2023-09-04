import { Plugin } from "vite";
import path from "path";
import * as fs from "node:fs/promises";
import peg from "peggy";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    plugins: [pegjsLoader()],
    // XXX Asking vite to build sourcemaps causes it to use too much ram, so builds fail
    //build: { sourcemap: true, minify: true },
});

/**
 * Plugin to allow importing peggy/pegjs files directly.
 */
function pegjsLoader(options = {}) {
    const svgRegex = /\.peg(js|gy)$/;

    const ret: Plugin = {
        name: "pegjs-loader",
        enforce: "pre",

        async load(filePath) {
            if (!filePath.match(svgRegex)) {
                return;
            }
            const source = await fs.readFile(filePath, "utf-8");
            const filename = path.relative(process.cwd(), filePath);

            const defaultOptions: Record<string, any> = {
                output: "source",
                format: "bare",
                ...options,
            };
            if (filename.match(/latex\.(pegjs|peggy)$/)) {
                defaultOptions.allowedStartRules = ["document", "math"];
            }
            if (filename.match(/tikz\.(pegjs|peggy)$/)) {
                defaultOptions.allowedStartRules = [
                    "path_spec",
                    "foreach_body",
                ];
            }

            const contents = peg.generate(source, defaultOptions);
            return { code: `export default ${contents}` };
        },
    };
    return ret;
}
