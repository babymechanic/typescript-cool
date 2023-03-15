export {};

// some library which exported only the function but not any of the types

type UnExportedParam = { someProp: string };
type UnExportedReturn = { someProp: string };

export async function doEverything(param: UnExportedParam): Promise<undefined | UnExportedReturn> {
    // ...
    return undefined;
}


// Usage of the above library in our code

const param = { someProp: 'test value' };
doEverything(param).then(x => console.log(x));

/*
Issues:

the param variable is typed by the value
another developer coming in would not know what's the expected shape of the param
it's hard to build around the function as there types are checked only at the time of call
 */
