import {JWT_SECRET} from "@repo/backend-common/config"

import {WebSocketServer} from 'ws';
import jwt, { JwtPayload } from "jsonwebtoken";

const wss= new WebSocketServer({port:8000});

wss.on('connection',function connection(ws,req){

    const url=req.url;

    if(!url){
        return;
    }
    const queryparams= new URLSearchParams(url.split('?')[1]);

    const token = queryparams.get('token');
 
    const decoded = jwt.verify(token,JWT_SECRET);

    if(!decoded || !(decoded as JwtPayload).userid){
        ws.close();
        return;
    }

    ws.on('message', function mess(data){
        ws.send("pong");
    })
});
