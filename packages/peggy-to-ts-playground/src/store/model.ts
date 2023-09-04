import { Action, Thunk } from "easy-peasy";
import { TypeExtractor } from "peggy-to-ts";
import { ParseError } from "../worker/errors";

export type Options = TypeExtractor["options"] & {
    useTsPegjs: boolean;
    generateFullParser: boolean;
};

export interface StoreModel {
    editorText: string;
    setEditorText: Action<StoreModel, string>;
    editorChange: Thunk<StoreModel, string>;
    error: ParseError | string | null;
    setError: Action<StoreModel, ParseError | string | null>;
    generatedTypes: string;
    setGeneratedTypes: Action<StoreModel, string>;
    options: Options;
    _setOptions: Action<StoreModel, Partial<Options>>;
    setOptions: Thunk<StoreModel, Partial<Options>>;
}
