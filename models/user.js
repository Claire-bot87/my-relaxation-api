import mongoose from "mongoose"
import bcrypt from "bcrypt";
import validator from 'validator';

const userSchema = new mongoose.Schema({
username: {type:String,required:true},
email:
{
    type: String ,
    required: true, 
    unique: true,
    validate:{
    validator: validator.isEmail,
    message:"please enter a valid email"
    }
},
password: {type:String, required:true}

})

userSchema.pre('save', function(next){
    //"this" refers to the doc you're about to save
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
        next() //this tells mongoose we're done
    })
    

userSchema.methods.isPasswordValid = function(plaintextPassword){

    return bcrypt.compareSync(plaintextPassword, this.password)
}

export default mongoose.model('User', userSchema)