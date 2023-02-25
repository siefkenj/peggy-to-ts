import { Action, Thunk } from "easy-peasy";
import { TypeExtractor } from "peggy-to-ts";
import { ParseError } from "../worker/errors";

export interface StoreModel {
    editorText: string;
    setEditorText: Action<StoreModel, string>;
    editorChange: Thunk<StoreModel, string>;
    error: ParseError | string | null;
    setError: Action<StoreModel, ParseError | string | null>;
    generatedTypes: string;
    setGeneratedTypes: Action<StoreModel, string>;
    options: TypeExtractor["options"];
    _setOptions: Action<StoreModel, Partial<TypeExtractor["options"]>>;
    setOptions: Thunk<StoreModel, Partial<TypeExtractor["options"]>>;
}
