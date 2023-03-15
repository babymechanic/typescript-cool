export {};
// types are optional on the right hand side if they can be inferred

const value: string = 'hello world';

// Interfaces and Types are interchangeable for objects but types for functions

interface DoSomething {
    doSomething(): Promise<void>;
}

type AlsoDoSomething = {
    doSomething(): Promise<void>;
}

type Callable = () => Promise<void>;

// typeof allows typescript to get meta information

const apple = { name: 'apple', color: 'red' };
type Fruit = typeof apple;
const orange: Fruit = { color: 'orange', name: 'orange' };

// keyof allows you to get all the keys of an object

type FruitProp = keyof Fruit;

const props: FruitProp[] = ['color', 'name'];

// intersection type allows you to say that the type could be any one of the types

type Colour = 'red' | 'blue' | 'pink';

// Most typed languages expect you to create a type before you assign data.
// Typescripts real power comes from being able to compute types based on the data.

const b: unknown = { greeting: 'hello' };
