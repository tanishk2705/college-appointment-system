import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET || 'secret';

export const authenticate = (role : string) => {
        return (req:Request, res:Response, next:NextFunction) => {
                console.log(req.headers);
                const token = req.headers.authorization?.split(' ')[1];
                if(!token){
                        return res.status(401).json({
                                error : "Unauthorized"
                        })
                }

                try {
                        const decoded = jwt.verify(token,SECRET) as {id:number; role: string };
                        if(decoded.role !== role){
                                return res.status(403).json({
                                        error: 'Forbiden'
                                })
                                        }
                        (req as any).user = decoded;
                        next();
                        }
                 catch (err){
                        res.status(401).json({
                                error: 'Invalid Token'
                        })
                }

        };
};