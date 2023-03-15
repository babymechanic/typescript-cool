export {};

const createGreeting = (name: string): string => {
    // using the base error just for this. ideally we should create a new type
    if (name === '') throw new Error('name cannot be an empty string');
    return `Hello ${name}!`;
}

// works fine

try {
    const greeting = createGreeting('world');
    console.log(greeting);
} catch (e) {
    if (e instanceof Error) {
        console.error(e.message);
    } else {
        throw e;
    }
}


/*
throwing exceptions puts an implicit contract which the whole stack is unaware of
a lot of times people forget to handle exceptions in the stack
this also add cognitive complexity where you have to remember this across the call stack

using exceptions for things which can be checked for is not a good idea.

ideally we should not be using exceptions for just flow control
*/
