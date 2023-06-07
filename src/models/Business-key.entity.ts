import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class BusinessKey {
    @PrimaryColumn()
    businessId: number

    @Column()
    businessKeyId: string;

    @Column()
    encryptedBusinessKeyToken: string

    @Column()
    useDefaultKey: boolean;

    constructor(obj?:Partial<BusinessKey>) {
        if(!obj) return;

        obj.businessId && (this.businessId = obj.businessId)
        obj.businessKeyId && (this.businessKeyId = obj.businessKeyId)
        obj.encryptedBusinessKeyToken && (this.encryptedBusinessKeyToken = obj.encryptedBusinessKeyToken)
        obj.useDefaultKey && (this.useDefaultKey = obj.useDefaultKey)
    }
}