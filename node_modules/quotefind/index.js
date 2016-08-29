const punc = ".!?"
function getSentenceIndexes(string, index) {
  if (string.indexOf(".") === -1 && string.indexOf("!") == -1) {
    return null
  }
  var backIndex = index
  var frontIndex = index
  var retArray = []
  var charArray = string.split('')
  // figure out what happens when it reaches beginning of string
  while(!punc.includes(charArray[backIndex])) {
    backIndex--
    if (backIndex <= 0) {
    	backIndex = 0
    	break
    }
  }
  retArray.push(backIndex)
  while(!punc.includes(charArray[frontIndex])) {
    frontIndex++
  }
  frontIndex++
  retArray.push(frontIndex)
  return retArray
}
module.exports = {
  string: "",
  setText: function(text) {
    this.string = text
  },
  getSentence: function() {
    var sentence = getSentenceIndexes(this.string, ~~(Math.random()*this.string.length))
    if (sentence != null) {
    	if (this.string.substring(sentence[0], sentence[0] + 1) === "." || this.string.substring(sentence[0], sentence[0] + 1) === "!") {
    		if (this.string.substring(sentence[0] + 1, sentence[0] + 2) === " ") {
    			return this.string.substring(sentence[0] + 2, sentence[1])
    		} else {
    			return this.string.substring(sentence[0] + 1, sentence[1])
    		}
    	} else {
    		return this.string.substring(sentence[0], sentence[1])
    	}
    } else {
      return null
    }
  },
  getSentenceFromText: function(text) {
  	var sentence = getSentenceIndexes(text, ~~(Math.random()*text.length))
    if (sentence != null || sentence != undefined) {
    	if (punc.includes(text.substring(sentence[0], sentence[0] + 1))) {
    		if (text.substring(sentence[0] + 1, sentence[0] + 2) === " ") {
    			return text.substring(sentence[0] + 2, sentence[1])
    		} else {
    			return text.substring(sentence[0] + 1, sentence[1])
    		}
    	} else {
    		return text.substring(sentence[0], sentence[1])
    	}
    } else {
      return null
    }
  }
};