import { javascript } from "@codemirror/lang-javascript";
import { basicSetup, useCodeMirror } from "@uiw/react-codemirror";
import React from "react";
import { Card } from "react-bootstrap";
import { useStoreState } from "../store/hooks";

export function ResultsDisplay() {
    const parsed = useStoreState((state) => state.generatedTypes);
    const editorRef = React.useRef<HTMLDivElement>(null);
    const editor = useCodeMirror({
        container: editorRef.current,
        value: parsed,
        extensions: [basicSetup(), javascript({ typescript: true })],
        style: { height: "100%", overflow: "hidden" },
    });

    return (
        <Card>
            <Card.Header>Generated TypeScript Types</Card.Header>
            <Card.Body className="p-0">
                <div className="types-display">
                    <div className="types-display-inner" ref={editorRef} />
                </div>
            </Card.Body>
        </Card>
    );
}
