import Entity from "./Entity";
import {BeforeInsert, Column, Entity as TOEntity, JoinColumn, ManyToOne} from "typeorm";
import User from "./User";
import {string_to_slug} from "../utils/helper";
import { Shop } from "./Shop";
import { Expose } from "class-transformer";


@TOEntity('flowers')
export class Flower extends Entity{

    constructor(flower: Partial<Flower>){
        super()
        Object.assign(this, flower)
    }

    @Column({type:'float'})
    amount: number // money

    @Column()
    title: string // name of the flower

    @Column()
    category: string // category

    @ManyToOne(() => Shop, shop => shop.flower)
    @JoinColumn([{name: 'shopName', referencedColumnName: 'name'}])
    shop: Shop // name of the shop that put this flower

    @Column({nullable: true})
    imageUrn: string // store the cloudinary img url here after uploading

    @Column()
    slug: string

    @ManyToOne(() => User, user => user.flowers)
    @JoinColumn({name: 'username', referencedColumnName: 'username'})
    user: User

    @Expose()
    get shopState(): string {
        return (this.shop as Shop).state;
    }

    @BeforeInsert()
    makeSlug(){
        this.slug = string_to_slug(this.title)
    }
}
