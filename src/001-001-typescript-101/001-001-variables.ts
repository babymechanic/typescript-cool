// can infer the type of the variable if it's been initialized
const stringValue = 'hello world';

// functions are first class citizens and can be the value of a variable
const myFunctions = () => console.log('hello');

// variables are not nullable
const notNullable: string = null;

// have to explicitly allow nulls or undefined
const nullable: null | string = null;
const undefinable: undefined | string = undefined;

// intersection type where a variable can have one of the types

const colour: { name: 'red' } | { name: 'blue' } | { name: 'green' } = { name: 'blue' };


export {};
