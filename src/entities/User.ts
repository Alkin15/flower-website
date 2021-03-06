import { IsEmail, Length } from "class-validator";
import {Entity as TOEntity, Column, Index, BeforeInsert, OneToMany} from "typeorm";
import bcrypt from "bcrypt";
import { Exclude } from "class-transformer";

import Entity from './Entity'
import { Flower } from "./Flower";

@TOEntity('users')
export default class User extends Entity{

    constructor(user: Partial<User>){
        super()
        Object.assign(this, user)
    }

    @Index()
    @IsEmail(undefined, { message: "Must be a valid email address"})
    @Length(1, 255, {message: "Email is empty"})
    @Column({unique: true})
    email: string;

    @Index()
    @Length(3, 255, {message: "Must be at least 3 chracters long"})
    @Column({unique: true})
    username: string;

    @Exclude()
    @Column()
    @Length(6,255, {message: 'Must be at least 6 chracters long'})
    password: string;

    @OneToMany(()=> Flower, flowers => flowers.user)
    flowers: Flower[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 6)
    }
}
