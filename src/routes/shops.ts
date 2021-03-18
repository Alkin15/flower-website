import { Request, Response, Router } from "express";
import { isEmpty } from "class-validator";
import User from "../entities/User";
import auth from "../middleware/auth";
import { getRepository } from "typeorm";
import { Shop } from "../entities/Shop";

const createShop = async (req:Request, res: Response) => {
    const {name, state, city,} = req.body

    const user: User = res.locals.user


    try {
        let errors: any = {}

        if(isEmpty(name)) errors.name = 'Name must not be empty'
        if(isEmpty(state)) errors.name = 'State must not be empty'
        if(isEmpty(city)) errors.name = 'City must not be empty'

        const  shop = await getRepository(Shop)
                    .createQueryBuilder('shop')
                    .where('lower(shop.name) = :name', { name : name.toLowerCase() } )
                    .getOne()


        if(shop) errors.name = 'Shop Already exist'

        if(Object.keys(errors).length > 0) throw errors


    } catch (error) {
        return res.status(400).json(error)
    }

    try {
        const shop = new Shop({name, state, city, user })
        await shop.save()

        return res.json(shop)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : 'Something went wrong'})
    }
}

const router = Router()

router.post('/', auth, createShop)

export default router;
