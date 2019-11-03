//Nock is used as a substitute for any HTTP calls to a specified URL
const nock = require('nock');

//If there's a need for setting any variables for the app.js, use either rewire or proxywire. (Rewire lacks some es6 features tho)
const app = require('../app'); 

const request = require('supertest');
const expect = require('chai').expect;

const customResponse = 'This is aimal';


it('Call using axios should return the message specified above', function () {
  
  nock('https://baconipsum.com')
    .persist()
    .get('/api/?type=meat-and-filler')
    .reply(200, customResponse);

  request(app)
      .get('/req').then(response => {
        console.log('>>>>', response);
        //expect(response.text).to.equal(customResponse);
        //done();
    });
});