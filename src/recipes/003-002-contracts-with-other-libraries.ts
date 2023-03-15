export {};

// some library which exported only the function but not any of the types

type UnExportedParam = { someProp: string };
type UnExportedReturn = { message: string };

export async function doEverything(param: UnExportedParam): Promise<UnExportedReturn> {
    // ...
    return { message: 'hello world' };
}


// Usage of the above library in our code

type DoEverything = typeof doEverything;
type DoEverythingParams = Parameters<DoEverything>;
type DoEverythingReturn = Awaited<ReturnType<DoEverything>>;

function createParam(): DoEverythingParams[0] {
    return { someProp: 'test value' };
}

function handleReturn(value: DoEverythingReturn): void {
    console.log(value.message);
}

doEverything(createParam()).then(handleReturn);

/*
now we can refer to the types even if they were not exposed

we have type checking at every point instead writing a large piece of code and then failing at the time of invocation
*/
