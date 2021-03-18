import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import User from '../entities/User'

export default  async (req:Request, res:Response, next: NextFunction) => {
    try {
        //get the token
        const token = req.cookies.token
        //if token doesnt exist throw an error
        if(!token) throw new Error('Unauthenticated')
        //verify the token with enviroment variable secret
        const { username }: any = jwt.verify(token, process.env.JWT_SECRET!)
        //if exist find the user and add it to local variables else throw an error
        const user = await User.findOne({username})

        if(!user) throw new Error('Unauthenticated')
         
        //
        res.locals.user = user

        return next()
    } catch (error) {

        return res.status(401).json({error: 'Unauthenticated'})
        
    }

}
