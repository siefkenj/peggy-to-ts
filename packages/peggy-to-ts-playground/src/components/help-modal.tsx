import React from "react";
import { Modal } from "react-bootstrap";

export function HelpModal({
    show,
    setShow,
}: {
    show: boolean;
    setShow: (state: boolean) => void;
}) {
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Help</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    PEGjs/<a href="https://peggyjs.org/">Peggy</a> defines a
                    syntax for generating parsers with Javascript.{" "}
                    <code>peggy-to-ts</code> is a library that can autogenerate
                    Typescript types from PEGjs/Peggy grammars.
                </p>
                <p>
                    By default, generated types are converted to CamelCase
                    names, with one type corresponding to each rule in the
                    grammar. The types of <i>Action Statements</i> (rules ending
                    with <code>{"{...}"}</code> code blocks) are guessed by the
                    Typescript runtime.
                </p>
                <h4>Tips</h4>
                <ul>
                    <li>
                        You can include typescript types in action statements to
                        help Typescript guess the type. For example, the type of{" "}
                        <code>{`rule = x:. { return processesWithMyFunction(x) }`}</code>{" "}
                        may not be guessable, but you can help Typescript by
                        writing{" "}
                        <code>{`rule = x:. { return processesWithMyFunction(x) as number[] }`}</code>
                    </li>
                </ul>
            </Modal.Body>
        </Modal>
    );
}
