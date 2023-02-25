/* eslint-env node */

/*
 * This preprocessor allows .pegjs to be imported into Jest
 * tests.
 */

import peg from "peggy";

export default {
    process: (src) => {
        const parser = peg.generate(src, {
            output: "source",
            format: "umd",
        });
        return { code: parser };
    },
};
