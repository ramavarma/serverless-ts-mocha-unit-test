'use strict';

// tests for localizedHello
// Generated by serverless-mocha-plugin

const mochaPlugin = require('serverless-mocha-plugin');
const expect = mochaPlugin.chai.expect;
let wrapped = mochaPlugin.getWrapper('localizedHello', '/testBuild/service/src/controller.js', 'hello');

describe('localizedHello', () => {
  before((done) => {
    done();
  });

  it('Should throw 400 error for empty body', async () => {
    const response = await wrapped.run({});
    console.log(response.statusCode)
    expect(response.statusCode).to.equal(400);
  });
});
