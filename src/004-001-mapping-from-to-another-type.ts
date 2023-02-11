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
}

function logSomething(logger: Logger, message: string) {
    logger.info(message);
}


// let's say we are writing a test

describe('Logger', () => {

    type MockLogger = {
        warn: jest.MockedFunction<Logger['warn']>
        error: jest.MockedFunction<Logger['error']>
        info: jest.MockedFunction<Logger['info']>
    };

    const mockLogger: MockLogger = {
        warn: jest.fn(),
        error: jest.fn(),
        info: jest.fn()
    };

    it('should log the message using info', () => {
        logSomething(mockLogger, 'hello');

        expect(mockLogger.error.mock.calls.length).toBe(1);
    });
})





