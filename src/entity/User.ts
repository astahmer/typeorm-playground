import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { AbstractEntity, Article, Role } from "@/entity/index";

@Entity()
export class User extends AbstractEntity {
    @Column()
    name: string;

    @OneToMany(() => Article, (article) => article.author)
    articles: Article[];

    @ManyToOne(() => Role)
    mainRole: Role;
}
