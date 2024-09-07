const mongoose = require('mongoose');

const {Schema} = mongoose;


const SlotSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    start:{
        type:String,
        required:true
    },
    end:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true,
        default:30
    },
    scheduleSlots:{
        type:[Schema.Types.Mixed],
        default:[]
    }
})


let Slots = mongoose.model("Slots",SlotSchema);


module.exports=mongoose.model("Slot",SlotSchema);