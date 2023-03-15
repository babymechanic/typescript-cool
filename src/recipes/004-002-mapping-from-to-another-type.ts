import { jest, it, expect, describe } from '@jest/globals';

export {};

// let's assume we have an object which we want to mock

class Logger {
    warn(message: string) {
    }

    error(message: string) {
    }

    info(message: string) {
    }

    notAFunction = 'not a function'
}

function logSomething(logger: Logger, message: string) {
    logger.info(message);
}


// let's say we are writing a test
// lets define a helper type

type MockedObject<T extends object> = {
    [key in keyof T]: T[key] extends ((...args: any[]) => any) ? jest.MockedFunction<T[key]> : T[key]
}

describe('Logger', () => {

    // we are creating the jest mock equivalent for all the methods
    type MockLogger = MockedObject<Logger>;

    const mockLogger: MockLogger = {
        warn: jest.fn(),
        error: jest.fn(),
        info: jest.fn(),
        notAFunction: 'not a function'
    };

    it('should log the message using info', () => {
        logSomething(mockLogger, 'hello');

        expect(mockLogger.error.mock.calls.length).toBe(1);
    });
})

/*
now here we just have a helper type which can redefine the types
we don't need to keep repeating this for every type which needs to be mocked
we are also able to selectively apply the jest mocked function to only methods
*/



