/**
 * Produces a name based off `nameProposal` that is guaranteed to not be a key in `nameMap`.
 */
export function getUniqueName(
    nameProposal: string,
    nameMap: Map<string, string>
): string {
    const origProposal = nameProposal;
    let i = 1;
    while (nameMap.has(nameProposal)) {
        nameProposal = `${origProposal}_${i}`;
        i++;
    }
    return nameProposal;
}
