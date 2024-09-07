
const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const session = require("express-session");

const sessionOption = {
    secret:"mysupersectecodefordevelopment",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()*7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }

};

app.use(session(sessionOption))

const User = require("./MODELS/user")
const Slot = require("./MODELS/SlotSchema");
const mongoose = require('mongoose');


main().then((res)=>{
    console.log("connection is succusfull");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/intership');

  
}

app.listen(8080,()=>{
    console.log("app  is listening carefully");
});

app.get("/login",(req,res)=>{
    console.log("ehool");
   
    res.send("rhaul lodhi succssfull")
   
});

app.post("/user/login",async(req,res)=>{
    console.log(req.body);

    try{

        const {email} = req.body;

    let availableUser = await User.findOne({ email: email });  
    console.log(availableUser);  

    if(availableUser){
       console.log("user exist and loggedin sucu")
       req.session.user=availableUser.email;
       console.log(req.session)
       res.send({currentUser:req.session.user,id:availableUser.id});

        return;
    }

        const user1 = new User({ email:email });
           await user1.save().then((result)=>{
            req.session.user= email;
            console.log(result);
            console.log(req.session)
            res.send({currentUser:req.session.user,id:result.id})
           });
          
    }catch(e){
       
        res.status(404,"something eror").send("there is something error");
    }
})


app.get("/:id/availability",async(req,res)=>{
    const {id} = req.params;
    console.log(id);
    console.log("availablity scuu");
    let data = await Slot.find({user:id});
    res.send({userId:id,data:data});
})

app.post("/user/:id/availability",async(req,res)=>{
    const {id} = req.params;
    const currUser = await User.findById(id);
    const {startTime,endTime} = req.body;
    console.log(startTime,endTime);
    console.log(currUser);

    const slot = new Slot({
        user:currUser.id,
        start:startTime,
        end:endTime,
        
    })

    await slot.save();

    await Slot.find({user:currUser.id}).then((response)=>{
        console.log(response);

        res.send({
            msg : "you scheduled has been scheduled Thankyou !",
            data:response,
            user:currUser.email
        })
    });
    

   
});

app.get("/user/edit",(req,res)=>{
    res.send("user upation rendersd");
})
app.patch("/user/:id",(req,res)=>{
    console.log("patch request detected");
    res.send("successfully");
    console.log(req.params);

});

app.delete("/user/:id",(req,res)=>{
    console.log("teri majjhgf")
    console.log("delete request detected");
})