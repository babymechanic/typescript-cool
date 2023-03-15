export {};

// common code
interface ParamType<T> {
    parse(value: string): T;
}

const stringType: ParamType<string> = {
    parse(value: string): string {
        return value;
    }
};

const numberType: ParamType<number> = {
    parse(value: string): number {
        return parseInt(value, 10);
    }
};

// we define a utility type which can be used to infer the final type
type InferFromParams<TConfig extends { [key: string]: ParamType<unknown> }> = Partial<{
    [key in keyof TConfig]: TConfig[key] extends ParamType<infer ValueType> ? (ValueType | undefined) : never;
}>

function parseQueryParams<
    TParams extends { [key: string]: ParamType<any> }
>(queryDefinition: TParams, input: Partial<{ [key in keyof TParams]: string }>): InferFromParams<typeof queryDefinition> {
    type QueryDefinition = typeof queryDefinition;
    type Keys = keyof QueryDefinition;
    const keys = Object.keys(queryDefinition) as Keys[];
    return keys.reduce((acc, key) => {
        const rawValue = input[key];
        const parser = queryDefinition[key];
        acc[key] = rawValue == null ? undefined : parser.parse(rawValue);
        return acc;
    }, {} as InferFromParams<typeof queryDefinition>)
}

// end common code

const searchFruitQueryParams = {
    query: stringType,
    colourId: numberType,
} satisfies { [key: string]: ParamType<unknown> };

const params = parseQueryParams(searchFruitQueryParams, {});

// example to show all the values that the type allows
type SearchFruitQueryParams = InferFromParams<typeof searchFruitQueryParams>;

const p: SearchFruitQueryParams = {
    colourId: 12312,
    query: 'hello',
}

/*
now we have a helper type which can give us the type derived from our configuration

this derived type can now be referred in other places

any changes would automatically be reflected
*/
