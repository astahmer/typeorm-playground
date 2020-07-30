import { Entity, Column } from "typeorm";
import { AbstractEntity } from "@/entity/AbstractEntity";

@Entity()
export class Image extends AbstractEntity {
    @Column()
    url: string;
}
