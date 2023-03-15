export {};

type Failure = { status: 'failure'; reason: string; }
type Created = { status: 'created'; greeting: string; }

const createGreeting = (name: string): Failure | Created => {
    if (name === '') return { status: 'failure', reason: 'name cannot be an empty string' };
    return { status: 'created', greeting: `Hello ${name}!` };
}

const result = createGreeting('world');
if (result.status === 'created') {
    console.log(result.greeting);
} else {
    console.error(result.reason);
}

/*
now there is no hidden throw which we have to remember

any caller is aware of the return types and has to handle them

without asserting on the type the caller would not be able to access the relevant props
*/

