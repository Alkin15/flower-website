import { Request, Response, Router } from "express";
import { Flower } from "../entities/Flower";
import { Shop } from "../entities/Shop";

import auth from '../middleware/auth'

const createFlower = async (req:Request, res:Response) => {
    const {title, amount, category, shop} = req.body

    const user = res.locals.user

    if(title.trim() === '') {
        return res.status(400).json({title : 'Title must not be empty'})
    }

    if (amount < 0) {
        return res.status(400).json({amount : 'Amount must not be lower then 0'})        
    }

    try {

        const shopRecord = await Shop.findOneOrFail({name : shop})

        const flower = new Flower({title, amount, category, shop: shopRecord, user})

        await flower.save()

        return res.json(flower)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error : 'Something went wrong'})
    }

}

const getFlowers = async (_:Request, res:Response) => {
    try {
        const flowers = await Flower.find({relations:['shop','user'],order:{ createdAt: 'DESC'}})

        return res.json(flowers)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
}

const getFlower = async (req:Request, res:Response) => {
    const id: number = +req.params.id
    try {
        const flower = await Flower.findOneOrFail({id},{
            relations:['shop']
        })

        return res.json(flower)
    } catch (error) {
        console.log(error)
        return res.status(404).json({error: 'Flower not found'})
    }
}



const router = Router()
router.post('/', auth, createFlower)
router.get('/', getFlowers)
router.get('/:id', getFlower)


export default router