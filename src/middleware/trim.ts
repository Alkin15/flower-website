import { NextFunction, Response, Request } from "express";

export default (req: Request, _:Response, next: NextFunction) => {
    const excepstions = ['password']
    Object.keys(req.body).forEach( key => {
        if (!excepstions.includes(key) && typeof req.body[key] === 'string') {
            req.body[key] = req.body[key].trim()
        }
    })
    next()
}