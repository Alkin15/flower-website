import { Request, Response, Router } from "express"
import User from "../entities/User"
import { validate, isEmpty } from "class-validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookie from "cookie";
import auth from '../middleware/auth'

const mapErrors = (errors: Object[]) => {
    //maps the typeorm error messages, takes property of the field from err and takes the error message from constraints
    return errors.reduce((prev: any, err: any) => {
        prev[err.property] = Object.entries(err.constraints)[0][1]
        return prev
    }, {})
}

const register = async (req:Request, res: Response ) => {

    const {email, username, password} = req.body;
    
    try {

        //validate data 
        let errors: any = {};
        const emailUser = await User.findOne({email})
        const usernameUser = await User.findOne({username})
        
        if(emailUser) errors.email = 'Email is alreay taken'
        if(usernameUser) errors.username = 'Username is already taken'

        if(Object.keys(errors).length > 0){
            return res.status(400).json(errors)
        }
        
        //Create New User
        const user = new User({email, username, password})

        errors = await validate(user);

        if (errors.length > 0) {

            return res.status(400).json(mapErrors(errors))
        }

        await user.save()

        return res.json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const login = async (req:Request, res:Response) => {

    const {username, password} = req.body
    let errors: any = {}

    if(isEmpty(username)) errors.username = 'Username must not be empty'
    if(isEmpty(password)) errors.password = 'Password must not be empty'

    if((Object.keys(errors)).length > 0) return res.status(400).json(errors)


    try {
        const user = await User.findOne({ username })

        if(!user) return res.status(404).json({username: 'User not found'})

        const passwordMatches = await bcrypt.compare(password, user.password)

        if(!passwordMatches) return res.status(401).json({error: 'Password is not correct'})

        const token = jwt.sign({ username }, process.env.JWT_SECRET!)

        res.set('Set-Cookie', cookie.serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600,
            path: '/'
        }))

        return res.json(user)

    } catch (error) {
        return res.status(500).json(error)
    } 
    
}

const me =  (_: Request, res: Response) => {
    
    return res.json(res.locals.user)

}

const logout = (_:Request, res:Response) => {
    res.set('Set-Cookie', cookie.serialize('token', '',{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0),
        path: '/'
    }))

    return res.status(200).json({ success : true })
}



const router = Router()

router.post('/register' , register) 
router.post('/login' , login) 
router.get('/me' , auth, me) 
router.get('/logout', auth, logout) 




export default router;
