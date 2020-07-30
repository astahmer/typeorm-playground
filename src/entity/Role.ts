import { Entity, Column, ManyToOne } from "typeorm";
import { AbstractEntity, Image } from "@/entity/index";

@Entity()
export class Role extends AbstractEntity {
    @Column()
    label: string;

    @ManyToOne(() => Image)
    logo: Image;
}
