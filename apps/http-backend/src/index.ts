import {JWT_SECRET} from "@repo/backend-common/config"
import express from 'express'
import {CreateUserSchema,createSigninSchema} from "@repo/common/types"
import jwt from 'jsonwebtoken';

import { middleware } from "./middleware";

const app= express();

app.listen(3000);

app.post("/signup",(req,res)=>{

    const data=CreateUserSchema.safeParse(req.body);
    if(!data.success){
        return res.json({
            message:"incorrect"
        })
        
    }
})
app.post("/signin",(req,res)=>{

    const data=createSigninSchema.safeParse(req.body);

    if(!data.success){
return res.json({
    message:"incorrect"
})
    }
    const token=jwt.sign({userId},JWT_SECRET);

    res.json(token)

})


app.post("/room", middleware,(req,res)=>{


    const data=CreateRoomSchema.safeParse(req.body);

    if(!data.success){
        return res.json({
            message:"incorrect"
        })
    }

    res.json({
        roomId:123
    })
})