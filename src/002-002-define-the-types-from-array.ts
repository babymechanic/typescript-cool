export {};

const fruitNames = ['apple', 'orange'] as const;
const fruitColours = ['orange', 'red'] as const;

/*
a const assertion tells typescript that the data is restricted to these instead of string
*/

type FruitName = typeof fruitNames[number];
type FruitColor = typeof fruitColours[number];

/*
the types are derived from the data instead
we only ever need to update the array and the type is automatically updated
*/

fruitNames.forEach((name) => console.log(name));
fruitColours.forEach((colour) => console.log(colour));

const apple: FruitName = 'apple';
const red: FruitColor = 'red';

/*
you still can create data with incorrect types such as an apple with the colour orange
so how can we restrict the data while being able to iterate through all the data
 */
