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

function parseQueryParams<
    TParams extends { [key: string]: ParamType<any> }
>(queryDefinition: TParams, input: Partial<{ [key in keyof TParams]: string }>) {
    type QueryDefinition = typeof queryDefinition;
    type Keys = keyof QueryDefinition;
    const keys = Object.keys(queryDefinition) as Keys[];
    return keys.reduce((acc, key) => {
        const rawValue = input[key];
        acc[key] = rawValue == null ? rawValue : queryDefinition[key].parse(rawValue);
        return acc;
    }, {} as Partial<Record<Keys, unknown>>)
}

// end common code

const searchFruitQueryParams = {
    query: stringType,
    colourId: numberType,
} satisfies { [key: string]: ParamType<unknown> };

type SearchFruitQueryParams = {
    query: string | undefined;
    colourId: string | undefined;
}

const params = parseQueryParams(searchFruitQueryParams, {}) as SearchFruitQueryParams;

/*
in here we lose type checking by using as for casting where we might potentially make a mistake

we end up creating a type which might not be in sync with the actual configuration of param

this type needs to be updated every time we make changes to `searchFruitQueryParams`
*/


