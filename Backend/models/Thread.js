import mongoose from "mongoose";
import { Content } from "openai/resources/containers/files/content.js";
const Schema = mongoose.Schema;


const MessageSchema = new Schema({
    role:{
        type:String,
        enum:["user","assistant"],
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    
});


const ThreadSchema = new Schema({
    threadid:{
        type:String,
        required:true,
        unique:true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title:{
        type:String,
        default:"Untitled Thread",
    },
    messages: [MessageSchema],
    createdat:{
        type:Date,
        default:Date.now,
    },
    updatedat:{
        type:Date,
        default:Date.now,
    },
});

const Thread = mongoose.model("Thread", ThreadSchema);
export default Thread;