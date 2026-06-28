import {JWT_SECRET} from "@repo/backend-common/config"
import express from 'express'
import {CreateUserSchema,createSigninSchema} from "@repo/common/types"
import jwt from 'jsonwebtoken';

import { middleware } from "./middleware";

import { prisma} from "@repo/db/dbr"

const app= express();

app.listen(3000);

app.post("/signup",(req,res)=>{

    const parseddata=CreateUserSchema.safeParse(req.body);
    if(!parseddata.success){
        return res.json({
            message:"incorrect"
        })
        
    }

    const user=prisma.user.create({
        data:{
            email:parseddata.data,
            password:parseddata.data,
            name:parseddata.data
        }
    })

    res.json({
        userId:user.id
    })
})
app.post("/signin",(req,res)=>{

    const data=createSigninSchema.safeParse(req.body);

    if(!data.success){
return res.json({
    message:"incorrect"
})
    }
    const token=jwt.sign({data.id},JWT_SECRET);

    res.json(token)

})


app.post("/room",  middleware, async(req,res)=>{


    const parseddata=CreateUserSchema.safeParse(req.body);


    if(!parseddata.success){
        return res.json({
            message:"incorrect"
        })
    }
    const usrId=req.userId;

    await prisma.room.create({
        data:{
            slug:parseddata.data.name,
            adminId:userId 
        } 
    })

    res.json({
        roomId:123
    })
})