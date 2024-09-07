
const mongoose= require("mongoose");

let Schema = mongoose.Schema;

main().then((res)=>{
    console.log("connection is succusfull");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/intership');

  
}



const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    }
});


let User = mongoose.model("USER",userSchema);



module.exports=mongoose.model("User",userSchema);