'use strict';
const { describe, it, beforeEach, afterEach } = require('mocha');
const assert = require('power-assert');

const {
    mockAws
} = require('../../lib/mock');

const { ErrorsPostHandler } = require('./../errorsPost.js');
const handler = new ErrorsPostHandler(mockAws);

describe('errorsPost.handler', () => {
    beforeEach((done) => {
        mockAws.createResources(done);
    });

    afterEach((done) => {
        mockAws.deleteResources(done);
    });

    it ('Valid error POST, response.statusCode should be 201', (done) => {
        const event = {
            headers: {
                'X-Api-Key': process.env.FAULTLINE_CLIENT_API_KEY
            },
            pathParameters: {
                project: 'sample-project'
            },
            body: JSON.stringify({
                errors: [
                    {
                        type: 'notice',
                        message: 'Undefined index: faultline',
                        backtrace: [
                            {
                                file: '/var/www/test/test.php',
                                line: 15,
                                function: 'SomeClass->__construct()'
                            },
                            {
                                file: '/var/www/test/SomeClass.class.php',
                                line: 36,
                                function: 'SomeClass->callSomething()'
                            }
                        ],
                        timestamp: '2016-11-02T00:01:00+00:00'
                    },
                ],
                notifications: []
            })
        };
        const context = {};

        const cb = (error, response) => {
            return Promise.resolve().then(() => {
                assert(error === null);
                assert(response.statusCode === 201);
            }).then(done, done);
        };
        handler(event, context, cb);
    });
});