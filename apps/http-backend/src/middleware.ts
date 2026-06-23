import jwt from 'jsonwebtoken'


export function middleware(req:any,res:any,next:any){

    const header = req.headers("authorization");

        const decoded= jwt.verify(header,JWT_SECRET );

        if(decoded){
            req.userId=decoded.userId;
            next();
        }
        else{
res.status(403).json({
    message:"unauthorized"
});
        }
    
}