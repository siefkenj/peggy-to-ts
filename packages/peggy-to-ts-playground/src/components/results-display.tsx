import { javascript } from "@codemirror/lang-javascript";
import { basicSetup, useCodeMirror } from "@uiw/react-codemirror";
import React from "react";
import { Card, Form, Row } from "react-bootstrap";
import { useStoreActions, useStoreState } from "../store/hooks";
import { EditorView } from "@codemirror/view";

export function ResultsDisplay() {
    const parsed = useStoreState((state) => state.generatedTypes);
    const editorRef = React.useRef<HTMLDivElement>(null);
    useCodeMirror({
        container: editorRef.current,
        value: parsed,
        extensions: [basicSetup(), javascript({ typescript: true })],
        style: { height: "100%", overflow: "hidden" },
        theme: { extension: EditorView.theme({ "&": { fontSize: "10pt" } }) },
    });
    const camelCaseNames = useStoreState((s) => s.options.camelCaseTypeNames);
    const useTsPegjs = useStoreState((s) => s.options.useTsPegjs);
    const setOptions = useStoreActions((a) => a.setOptions);
    const setCamelCaseNames = React.useCallback(
        (value: boolean) => {
            setOptions({ camelCaseTypeNames: value });
        },
        [setOptions]
    );
    const setUseTsPegjs = React.useCallback(
        (value: boolean) => {
            setOptions({ useTsPegjs: value });
        },
        [setOptions]
    );

    return (
        <Card>
            <Card.Header>
                Generated TypeScript Types
                <Row>
                    <Form>
                        <Form.Group controlId="camelCaseTypeNames">
                            <Form.Check
                                checked={camelCaseNames}
                                onChange={(e) => {
                                    setCamelCaseNames(e.target.checked);
                                }}
                                type="checkbox"
                                label="Convert types to CamelCase"
                            ></Form.Check>
                        </Form.Group>
                        <Form.Group controlId="useTsPegjs">
                            <Form.Check
                                checked={useTsPegjs}
                                onChange={(e) => {
                                    setUseTsPegjs(e.target.checked);
                                }}
                                type="checkbox"
                                label="Use ts-pegjs"
                                title="ts-pegjs is another library for converting PEG grammars to TypeScript. All functionality from this project has been merged into ts-pegjs, so there should be no downside to using it."
                            ></Form.Check>
                        </Form.Group>
                    </Form>
                </Row>
            </Card.Header>
            <Card.Body className="p-0">
                <div className="types-display">
                    <div className="types-display-inner" ref={editorRef} />
                </div>
            </Card.Body>
        </Card>
    );
}
