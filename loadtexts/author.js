var mongoose = require('mongoose')
var authorSchema = new mongoose.Schema({ 
	name: String, 
	texts: Object
});
mongoose.model('Author', authorSchema)