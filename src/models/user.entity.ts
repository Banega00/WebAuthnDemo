import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column({unique: true})
    username: string

    @Column()
    password: boolean;

    constructor(obj?:Partial<User>) {
        if(!obj) return;

        obj.username && (this.username = obj.username)
        obj.name && (this.name = obj.name)
        obj.id && (this.id = obj.id)
        obj.password && (this.password = obj.password)


    }
}