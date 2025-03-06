const Message = require('../Models/messageModel');



const getMessage = async (req , res) =>{

    try {
       
        const {room} = req.params;
        const message = await Message.find({room})
        .populate('sender','username avatar')
        .sort({createdAt: 1})

        res.json(message)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const createMessage = async (req , res) =>{

    try {
       
        const {content , room} = req.params;

        if(!content || !room){
            return res.status(400).json({
                message:'All fields are required',
                success:false
            })
        }


        const message = await Message.create({
            sender: req.user._id,
            content,
            room,
            readBy: [req.user._id]
        })

        const populatedMessage = await Message.findById(message._id)
        .populate('sender','username avatar')

        res.json({
            populatedMessage,
            success:true
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
 

const markMessageAsRead = async (req , res) => {

    try {
       
        const {messageId} = req.body;

        if(!messageId || !Array.isArray(messageId)){
            return res.status(400).json({ message: 'Please provide message IDs' });
        }

        await Message.updateMany(
            {_id: { $in: messageId}},
            { $addToSet: {readBy: req.user._id}}
        )

        res.json({ message: 'Messages marked as read' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = {getMessage,createMessage,markMessageAsRead}