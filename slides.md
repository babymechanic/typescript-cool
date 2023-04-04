# Welcome to Typescript playbook

## What is this session about?

- Exploring how to use the `type system`
- `Patterns` that can be used to deal with types
- Some basic type system `101` to understand `higher level concepts`

## What is this session NOT about?

- Things `outside` the type system
- While it will cover `some basics` the intent is not to cover code flow

## Expectations

- Things which don't seem relevant will be put in a parking lot and talked about later if we have time

---

## 101 > Variable type inference

### Wide type inference

```typescript
let greeting = 'hello world';
let myGreeting = () => console.log('hello world');
let myObject = {greeting: 'hello world'};
// this is regular JS code but TS has already inferred and assigned a type to the variables.

greeting = 21321;
myGreeting = 'hello world';
myObject = () => console.log('hello world');
// here we are trying to reassign different types which would make compilation fail
```

### Narrow type inference

```typescript
const greeting = 'hello world' as const;
// when we apply as const as an assertion 
// typescript can make more restricted assestions from the data
// in this case the type of the varible is a subset of string which is 'hello world'
```

### Undefined and nulls

```typescript

greeting = null;
// this is not allowed as the variable is not nullable

const nullable: null | string | undefined = null;
// nulls or undefined have to be explicitly allowed
// this is also known as an intersection type where the variable can have one of these values

```

## Questions ?

---

## 101 > Defining types

### Interfaces

```typescript

// defines an object which should have a method
interface IPerson {
    greet(name: string): void;
}

// defines a function 
interface IGreet {
    (name: string): void;
}

```

### Types

```typescript

// defines an object which should have a method
type Person = {
    greet(name: string): void;
}

// defines a function 
type Greet = (name: string) => void;

```

### Classes can also be used as interfaces

```typescript
class WildDuck {

    fly() {
        console.log('fly');
    }

    swim() {
        console.log('swim');
    }
}

class WoodDuck implements WildDuck {
    swim(): void {
        console.log('swim');
    }

    fly(): void {
    }
}

```

For the purposes of our session we will be using just `type`.

## Questions ?

---

## 101 > Combining types

### Intersection

```typescript

type Colour = 'Red' | 'Orange' | 'Yellow';

const colour: Colour = 'Red';

const invalidColour: Colour = 'Blue'; // this would be invalid

```

### Union

```typescript
type Fly = { fly(): void };
type Quack = { quack(): void };

type FlyingDuck = Fly & Quack;

```

### Mapped

```typescript
type Fruit = 'Apple' | 'Orange';
type Colour = 'Red' | 'Orange';

type Fruits = { [K in Fruit]: { colour: Colour; } }

const fruits: Fruits = {
    Apple: {colour: 'Red'},
    Orange: {colour: 'Orange'}
}
```

### Free style ?

```typescript

type IsHelloWorld<T> = T extends 'Hello World' ? true : false;

type True = IsHelloWorld<'Hello World'>;
type False = IsHelloWorld<'Not Hello World'>;

```

## Questions ?

---

## 101 > Type inference tools

### Primitive types with typeof

```typescript
let myString = 'my string';
type MyString = typeof myString; // string because no const assertion

const helloWorld = 'Hello world!' as const;
type HelloWorld = typeof helloWorld; // 'Hello world!' because const assertion

const helloWorldStr: string = 'Hello world!' as const;
type HelloWorldStr = typeof helloWorldStr; // string because of directtly assigning string type to variable
```

### Complex types with typeof

```typescript
const apple = {name: 'apple', color: 'red'};
type Fruit = typeof apple; // the type is not an apple as name, color props are string becuase of no const assert

const orange = {name: 'orange', color: 'orange'} as const;
type Orange = typeof orange; // the type is exactly and orange because of const assert

type OrangeColour = Orange['color']; // will be 'orange' and not string
```

### Object props with keyof

```typescript
const apple = {name: 'apple', color: 'red'};
type Fruit = typeof apple;

type FruitKey = keyof Fruit;
const keys: FruitKey[] = ['name', 'color'];

```

### Conditional Types

```typescript
const apple = {name: 'apple', quantity: 1} as const;
type Apple = typeof apple;

type IsNumeric<T extends object, K extends keyof T> = T[K] extends number ? true : false;

type True = IsNumeric<Apple, 'quantity'>

```

### Questions ?

---

## 101 > Special mentions

### any

```typescript
let anything: any;

anything = {color: 'red'};
anything.color;

anything.invalidProp
```

### unknown

```typescript
let anything: unknown;

anything = {color: 'red'};
(anything as ({ color: 'red' })).color;
```

### never

```typescript
type DontAllowName = { name: never; }
```

### Questions before moving onto patterns ?

---

## Patterns > Dealing with constants > Defining types upfront

```typescript
type FruitName = 'apple' | 'orange';
type FruitColor = 'orange' | 'red';

type Fruit = { name: FruitName; color: FruitColor; }

const fruits: Fruit[] = [
    {name: 'apple', color: 'red'},
    {name: 'orange', color: 'orange'}
]

fruits.forEach((fruit) => {
    console.log(`The color of ${fruit.name} is ${fruit.color}`);
});
```

### Issues

- there is duplication here where you are defining the data type and value again.
- every time you want to add a new colour or name you end up updating the type and the value
- this way we are using typescript like any other language where we are defining types upfront

### Questions

- What's a better way to deal with this?

---

## Patterns > Dealing with constants > Inferring the type from the data

```typescript
const fruitNames = ['apple', 'orange'] as const;
const fruitColours = ['orange', 'red'] as const;

type FruitName = typeof fruitNames[number];
type FruitColor = typeof fruitColours[number];

type Fruit = { name: FruitName; color: FruitColor; }

const fruits: Fruit[] = [
    {name: 'apple', color: 'red'},
    {name: 'orange', color: 'orange'}
]

fruits.forEach((fruit) => {
    console.log(`The color of ${fruit.name} is ${fruit.color}`);
});

```

### Benefits

- a const assertion tells typescript that the data is restricted to these instead of string
- the types are derived from the data instead
- we only ever need to update the array and the type is automatically updated

### Drawbacks

- you can create data with incorrect types such as an apple with the colour orange
```typescript
const fruits: Fruit[] = [
    {name: 'apple', color: 'orange'},
    {name: 'orange', color: 'red'}
]
```

### Questions

- so how can we restrict the data while being able to iterate through all the data

---

## Patterns > Dealing with constants > Inferring the type from the final data

```typescript
const fruits = [
    {
        name: 'apple',
        colour: 'red'
    },
    {
        name: 'orange',
        colour: 'orange'
    }
] as const;

fruits.forEach((fruit) => {
    console.log(`The color of ${fruit.name} is ${fruit.color}`);
});

type Fruit = typeof fruits[number];
const apple: Fruit = { colour: 'red', name: 'apple' };

const invalidApple: Fruit = { colour: 'orange', name: 'apple' }; // this would not compile

```

### Benefits

- Fruit can be either of the objects that we have defined
- The colour orange against the fruit apple is not a valid type
- you can further access a sub property as a type
