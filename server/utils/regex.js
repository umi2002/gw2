function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function createSearchRegex(input) {
    const escapedInput = escapeRegExp(input);
    return new RegExp(escapeRegExp(input), "i");
}

export default createSearchRegex;
