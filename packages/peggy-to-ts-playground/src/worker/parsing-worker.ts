import * as Comlink from "comlink";
import { TypeExtractor } from "peggy-to-ts";

const exposed = {
    parse: (s: string, options?: TypeExtractor["options"]) => {
        try {
            const typeExtractor = new TypeExtractor(s, options);
            const ret = typeExtractor.getTypes();
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
    },
};

export type Exposed = typeof exposed;

// We are exporting `void`, but we have to export _something_ to get the module to work correctly
export default Comlink.expose(exposed);
