import * as Comlink from "comlink";
import { TypeExtractor } from "peggy-to-ts";
import { Options } from "../store/model";
import tsPegjs, { TsPegjsOptions } from "ts-pegjs";
import peggy from "peggy";

const exposed = {
    parse: async (s: string, options?: Options) => {
        if (options?.useTsPegjs) {
            return await typesWithTsPegjs(s, options);
        }
        return await typesWithPeggyToTs(s, options);
    },
};

async function typesWithPeggyToTs(s: string, options?: Options) {
    try {
        const typeExtractor = new TypeExtractor(s, options);
        const ret = await typeExtractor.getTypes();
        return ret;
    } catch (e: any) {
        if (e.format) {
            throw Object.assign(
                { desc: String(e), terminalDesc: e.format([{ text: s }]) },
                e
            );
        }
        throw e;
    }
}

async function typesWithTsPegjs(s: string, options?: Options) {
    const tspegjs: TsPegjsOptions = {
        onlyGenerateGrammarTypes: true,
        doNotCamelCaseTypes: options?.camelCaseTypeNames === false,
    };
    try {
        const ret = peggy.generate(s, {
            // @ts-ignore
            output: "source",
            format: "commonjs",
            plugins: [tsPegjs],
            tspegjs,
        });
        return ret.trimStart();
    } catch (e: any) {
        if (e.format) {
            throw Object.assign(
                { desc: String(e), terminalDesc: e.format([{ text: s }]) },
                e
            );
        }
        throw e;
    }
}

export type Exposed = typeof exposed;

// We are exporting `void`, but we have to export _something_ to get the module to work correctly
export default Comlink.expose(exposed);
