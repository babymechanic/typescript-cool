// type is used to define types
type MyString = string;

const str: MyString = 'hello';

// types can be constrained to be very specific
type Hello = 'hello';

const hello: Hello = 'hello';
const invalidHello: Hello = 'not hello';

// types can be used for multiple purposes

// object
type Fruit = { name: string; colour: string };

// function
type FruitFactory = (name: string, colour: string) => Fruit;

// intersection
type Colour = { name: 'red' } | { name: 'blue' } | { name: 'green' };

// union
type FlyingDuck = { quack: () => void } & { fly: () => void };


export {};
