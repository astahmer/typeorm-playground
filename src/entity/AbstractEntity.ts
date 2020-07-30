import { CreateDateColumn, ObjectType, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

export abstract class AbstractEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    dateCreated: Date;

    @UpdateDateColumn()
    dateUpdated: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}

export type EntityReference = <Entity extends AbstractEntity>(type?: Entity) => ObjectType<Entity>;
