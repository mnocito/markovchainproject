var should = require('chai').should(),
    quote = require('../index'),
    getSentenceFromText = quote.getSentenceFromText
describe('#getSentenceFromText', function() {
	it('gets no sentence', function() {
    	getSentenceFromText('').should.equal(null);
  	});
  	it('gets a sentence from text', function() {
    	getSentenceFromText('Continuing on, let’s create a test directory to hold our tests. As our primary module file is called index.js, within the test directory I will create a file by the same name – a simple convention. Mocha will by default run all tests in this directory. Our test should look something like the following. Note that I am using the should syntax provided by the Chai framework. Also note the use of require to pull in our module code into the test.').should.not.equal(null);
  	});
})