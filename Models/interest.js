const mongoose=require('mongoose');
const interestschema=new mongoose.Schema({
    Sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    Receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    bothInterested:{
        type:Boolean,
        default:false
    },
    Time:{
        type:Date,
        default: Date.now()
    }
});
module.exports=mongoose.model("interest",interestschema);