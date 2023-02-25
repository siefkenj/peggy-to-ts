import { Action, Thunk } from "easy-peasy";
import { ParseError } from "../worker/errors";

export interface StoreModel {
    editorText: string;
    setEditorText: Action<StoreModel, string>;
    editorChange: Thunk<StoreModel, string>;
    error: ParseError | string | null;
    setError: Action<StoreModel, ParseError | string | null>;
    generatedTypes: string;
    setGeneratedTypes: Action<StoreModel, Partial<string>>;
}
