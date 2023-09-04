import * as peggy from "peggy";

export const PeggyParser = {
    parse: (source: string) => peggy.generate(source, { output: "ast" }),
};
