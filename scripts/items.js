export const paths = [
    { name: "diamond", path: "texture/items/diamond.png" },
];

export function getPathByName(name) {
    for (const entry of paths) {
        if (entry.name === name) {
            return entry.path;
        }
    }
    return null;
}
