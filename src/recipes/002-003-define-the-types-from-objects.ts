export {};

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


type Fruit = typeof fruits[number];

/*
Fruit can be either of the objects that we have defined
*/

const apple: Fruit = { colour: 'red', name: 'apple' };


/*
The colour orange against the fruit apple is not a valid type
*/

const invalidApple: Fruit = { colour: 'orange', name: 'apple' };

/*
you can further access a sub property as a type
*/

type FruitName = Fruit['name'];

const name: FruitName = 'orange';

type FruitColour = Fruit['colour'];

const colour: FruitColour = 'orange';


