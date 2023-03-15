export {};

type FruitName = 'apple' | 'orange';
type FruitColor = 'orange' | 'red';

/*
    what if you had to iterate through all the value?
*/

const allNames: FruitName[] = ['apple', 'orange'];
const allColours: FruitColor[] = ['red', 'orange'];

allNames.forEach((name) => console.log(name));
allColours.forEach((colour) => console.log(colour));

/*
there is duplication here where you are defining the data type and value again.

every time you want to add a new colour or name you end up updating both

this way we are using typescript like any other language where we are defining types upfront
*/

