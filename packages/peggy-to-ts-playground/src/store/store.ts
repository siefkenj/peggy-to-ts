import { action, createStore, thunk } from "easy-peasy";
import { isParseError } from "../worker/errors";
import { debounceRender } from "./debounce-render";
import { StoreModel } from "./model";


export const store = createStore<StoreModel>({
    editorText: `a = "a" b:b? { return ['a', b]; }
b = "b" a:a? { return ['b', a]; }
`,
    error: null,
    setEditorText: action((state, payload) => {
        state.editorText = payload;
    }),
    editorChange: thunk(async (actions, payload) => {
        actions.setEditorText(payload);
        try {
            await debounceRender(actions, payload);
            //   const generatedTypes = await parsingWorker.parse(payload);
            //   actions.setError(null);
            //   actions.setGeneratedTypes(generatedTypes);
        } catch (e) {
            if (isParseError(e)) {
                actions.setError(e);
            } else {
                console.log(e);
                actions.setError(String(e));
            }
        }
    }),
    setError: action((state, payload) => {
        state.error = payload;
    }),
    generatedTypes: "",
    setGeneratedTypes: action((state, payload) => {
        state.generatedTypes = payload;
    }),
});
