import mongoose from "mongoose";

export const dbConnection= async ()=>{
    await mongoose.connect(process.env.DATABASE_URL).then(()=>{
        console.log("database connected 🫡");
        
    }).catch((err)=>{
        console.log(" database error 😕",err);
    })
}
