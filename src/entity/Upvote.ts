import { Entity, ManyToOne } from "typeorm";
import { Comment, AbstractEntity } from "@/entity/index";

@Entity()
export class Upvote extends AbstractEntity {
    @ManyToOne(() => Comment, (comment) => comment.upvotes)
    comment: Comment;
}
