var mongoose = require('mongoose')
var authorSchema = new mongoose.Schema({ 
	name: String, 
	texts: {type: Array, default: []}
});
mongoose.model('Author', authorSchema)