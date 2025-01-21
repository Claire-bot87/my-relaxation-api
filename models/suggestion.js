import mongoose from "mongoose"

const suggestionSchema = new mongoose.Schema({


name: {type: String, required:true},
description: {type: String, required:true},
// id: ObjectId,
// user: ObjectId,
category: {type: String, required:true},
image: {type: String, required:false}

})
//the first argument to the model method MUST be a string pascalecase, singular
//the below line of code registers it with monoose so that the schema/model is ready to use. (it turns the schema into a model, making it ready to use)
export default mongoose.model('Suggestion', suggestionSchema)

// const Comment = mongoose.model('Comment', commentSchema); // Defining the model
// export { Comment }; 