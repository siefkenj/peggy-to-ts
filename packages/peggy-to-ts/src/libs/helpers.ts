import {
    ArrowFunction,
    FunctionDeclaration,
    FunctionExpression,
    Node,
    ts,
    TypeNode,
} from "ts-morph";

/**
 * Wraps an expression in a `as const` declaration. E.g., `{foo: 1}` -> `{foo: 1} as const`
 */
export function wrapNodeInAsConstDeclaration(node: Node<ts.Expression>) {
    node.transform((t) =>
        t.factory.createAsExpression(
            node.compilerNode,
            t.factory.createTypeReferenceNode(
                t.factory.createIdentifier("const")
            )
        )
    );
}

/**
 * Returns the nearest enclosing function-like node. (E.g., a function declaration or arrow function, etc.)
 */
export function getEnclosingFunction(node: Node) {
    return node.getParentWhile((n) => !isFunctionLike(n))?.getParent() as
        | FunctionDeclaration
        | FunctionExpression
        | ArrowFunction
        | undefined;
}

/** Returns whether a node is function-like */
function isFunctionLike(
    node: Node
): node is FunctionDeclaration | FunctionExpression | ArrowFunction {
    return (
        node.isKind(ts.SyntaxKind.FunctionDeclaration) ||
        node.isKind(ts.SyntaxKind.FunctionExpression) ||
        node.isKind(ts.SyntaxKind.ArrowFunction)
    );
}

/**
 * Replace `typeNode` with an array of the same type.
 *
 * **Warning**: this function invalidates previous references to the type.
 * (E.g., if you obtained a reference via `typeDeclaration.getType()`, you must do so again,
 * because the old reference will be stale.)
 */
export function makeTypeAnArray(typeNode: TypeNode) {
    return typeNode.transform((traversal) =>
        traversal.factory.createArrayTypeNode(typeNode.compilerNode)
    );
}

/**
 * Replace `typeNode` with an union type including undefined.
 *
 * **Warning**: this function invalidates previous references to the type.
 * (E.g., if you obtained a reference via `typeDeclaration.getType()`, you must do so again,
 * because the old reference will be stale.)
 */
export function unionWithUndefined(typeNode: TypeNode) {
    return typeNode.transform((traversal) =>
        traversal.factory.createUnionTypeNode([
            typeNode.compilerNode,
            traversal.factory.createKeywordTypeNode(
                ts.SyntaxKind.UndefinedKeyword
            ),
        ])
    );
}
