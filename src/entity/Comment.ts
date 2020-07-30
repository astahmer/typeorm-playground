import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { AbstractEntity, Article, Upvote } from "@/entity/index";

@Entity()
export class Comment extends AbstractEntity {
    @Column()
    message: string;

    @ManyToOne(() => Article, (article) => article.comments)
    article: Article;

    @OneToMany(() => Upvote, (upvote) => upvote.comment)
    upvotes: Upvote[];
}
