Quotefind
=========

A small module that gets a random sentence from a given text. If no sentence is found, it returns `null`.

## Installation

  npm install quotefind --save

## Usage

```javascript
  var quote = require('quotefind')
  
  // getting a sentence from a one-off block of text
  var oneOffTextSentence = quote.getSentenceFromText("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.")
  
  // getting a sentence from a set block of text
  quote.setText("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.")
  var sentenceFromSetText = quote.getSentence()
  console.log(oneOffTextSentence, sentenceFromSetText); 
 ```

## Tests

  npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release