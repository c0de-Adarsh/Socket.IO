import mongoose, { Schema } from "mongoose";


const messageSchema = new mongoose.Schema({
    

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      content: {
        type: String,
        required: true,
        trim: true
      },
      room: {
        type: String,
        required: true
      },
      readBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }]
    }, {
      timestamps: true
})


const Message = mongoose.model('Message',messageSchema)

module.exports = Message