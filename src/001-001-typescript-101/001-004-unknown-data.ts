// what if we don't know the shape of the data which is a very common situation


// use unknown when you don't know the type
type Expected = { name: string };

function isValidUnknown(value: unknown): boolean {
    const casted = value as Expected;
    return casted != null && casted.name != null;
}

// as much as possible stay away from any
function isValidAny(value: any): boolean {
    return value != null && value.name != null;
}
