import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { AbstractEntity, Comment, User } from "@/entity/index";

@Entity()
export class Article extends AbstractEntity {
    @Column()
    title: string;

    @ManyToOne(() => User, (user) => user.articles)
    author: User;

    @OneToMany(() => Comment, (comment) => comment.article)
    comments: Comment[];
}
