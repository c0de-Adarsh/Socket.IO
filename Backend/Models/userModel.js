import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['online', 'offline', 'away'],
    default: 'offline'
  }
}, {
  timestamps: true
});


//hash the password before saving 

userSchema.pre('save', async function (next) {
     
    if(!this.isModified('password')) return next()

        try {
           const salt = await bcrypt.genSalt(10);

           this.password = await bcrypt.hash(this.password , salt)
           next()
        } catch (error) {
            next(error)
        }
})


//compare password

userSchema.methods.matchPassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword,this.password)
}

const User = mongoose.model('User', userSchema);

module.exports = User