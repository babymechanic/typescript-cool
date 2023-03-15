import { jest, it, expect, describe } from '@jest/globals';

export {};

// let's assume we have an object which we want to mock

class Logger {

    notAFunction = 'not a function';

    warn(message: string) {
    }

    error(message: string) {
    }

    info(message: string) {
    }
}

function logSomething(logger: Logger, message: string) {
    logger.info(message);
}


// let's say we are writing a test

describe('Logger', () => {

    // we are creating the jest mock equivalent for all the methods
    type MockLogger = {
        warn: jest.MockedFunction<Logger['warn']>;
        error: jest.MockedFunction<Logger['error']>;
        info: jest.MockedFunction<Logger['info']>;
        notAFunction: Logger['notAFunction'];
    };

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
here we are having to completely redefine all the functions
if the object has a lot more methods it could get pretty painful
*/



