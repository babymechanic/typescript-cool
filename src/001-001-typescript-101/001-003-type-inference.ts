// typeof allows you get the type that can be inferred from the data
let myString = 'my string';

type MyString = typeof myString;

const anotherString: MyString = 'my other string';


// you can constrain the type inferred from your data
const onlyAllowHelloWorld = 'Hello world!' as const;

type OnlyAllowHelloWorld = typeof onlyAllowHelloWorld;

const valid: OnlyAllowHelloWorld = 'Hello world!';
const inValid: OnlyAllowHelloWorld = 'Not Hello world!';


// you can apply this on more complex data
const apple = { name: 'apple', color: 'red' };

type Fruit = typeof apple;

const orange: Fruit = { color: 'orange', name: 'orange' };


// keyof allows you to get the keys/properties on a type

type FruitKeys = keyof Fruit;

const keys: FruitKeys[] = ['color', 'name'];
