import Entity from "./Entity";
import {BeforeInsert, Column, Entity as TOEntity, Index, JoinColumn, OneToMany, OneToOne} from "typeorm";
import User from "./User";
import { Flower } from "./Flower";

import {string_to_slug} from "../utils/helper";

@TOEntity('shops')
export class Shop extends Entity{

    constructor(shop: Partial<Shop>){
        super()
        Object.assign(this, shop)
    }

    @Index()
    @Column({unique:true})
    name: string

    @Column()
    state: string

    @Column()
    city: string

    @Column({nullable: true})
    shopImageUrn: string

    @OneToOne (() => User)
    @JoinColumn({name: 'username', referencedColumnName: 'username'})
    user: User

    @OneToMany(() => Flower, flower => flower.shop)
    @JoinColumn()
    flower: Flower[]

    @Column()
    slug: string

    @BeforeInsert()
    makeSlug(){
        this.slug = string_to_slug(this.name)
    }

}
